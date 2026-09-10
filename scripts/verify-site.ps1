$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $PSScriptRoot
$failures = [System.Collections.Generic.List[string]]::new()

function Add-Failure([string]$Message) {
    $failures.Add($Message)
}

$distIndex = Join-Path $repoRoot 'dist\index.html'
$caddyfile = Join-Path $repoRoot 'ops\Caddyfile'
$cloudflareExample = Join-Path $repoRoot 'ops\cloudflared\config.example.yml'

if (-not (Test-Path -LiteralPath $distIndex -PathType Leaf)) {
    Add-Failure 'dist/index.html is missing. Run npm run build first.'
}

if (-not (Test-Path -LiteralPath $caddyfile -PathType Leaf)) {
    Add-Failure 'ops/Caddyfile is missing.'
} else {
    $caddyConfig = Get-Content -LiteralPath $caddyfile -Raw
    if ($caddyConfig -match '(?im)(humanknow|knowledge|/kb|/api|:8000|localhost)') {
        Add-Failure 'Caddyfile contains a private knowledge-base or localhost route.'
    }
    if ($caddyConfig -notmatch '(?im)^\s*bind\s+127\.0\.0\.1\s*$') {
        Add-Failure 'Caddyfile must bind the origin to 127.0.0.1.'
    }
    if ($caddyConfig -notmatch '(?im)(file_server|respond\s+.*\s+404)') {
        Add-Failure 'Caddyfile must include a static file server and a 404 response boundary.'
    }
}

if (-not (Test-Path -LiteralPath $cloudflareExample -PathType Leaf)) {
    Add-Failure 'ops/cloudflared/config.example.yml is missing.'
} else {
    $cloudflareConfig = Get-Content -LiteralPath $cloudflareExample -Raw
    if ($cloudflareConfig -notmatch '(?im)^ingress\s*:') {
        Add-Failure 'Cloudflare example is missing its ingress section.'
    }
    if ($cloudflareConfig -notmatch '(?im)service\s*:\s*http_status:404\s*$') {
        Add-Failure 'Cloudflare example must end with service: http_status:404.'
    }

    $hostnames = [regex]::Matches($cloudflareConfig, '(?im)^\s*-\s*hostname\s*:\s*(\S+)') | ForEach-Object { $_.Groups[1].Value }
    foreach ($hostname in $hostnames) {
        if ($hostname -match '(?i)(kb|api|admin|localhost)') {
            Add-Failure "Cloudflare example contains a forbidden public hostname: $hostname."
        }
        if ($hostname -notin @('kaiseriii.me', 'www.kaiseriii.me', 'lab.kaiseriii.me')) {
            Add-Failure "Cloudflare example contains an unapproved hostname: $hostname."
        }
    }
    if ($hostnames.Count -ne 3) {
        Add-Failure "Cloudflare example must contain exactly three approved hostnames; found $($hostnames.Count)."
    }
    if ($cloudflareConfig -match '(?im)service\s*:\s*(?!(?:http://127\.0\.0\.1:8080|http_status:404)\s*$)\S+') {
        Add-Failure 'Cloudflare example contains a service outside the local Caddy origin.'
    }
}

$env:Path = [Environment]::GetEnvironmentVariable('Path', 'Machine') + ';' + [Environment]::GetEnvironmentVariable('Path', 'User')
$caddy = Get-Command caddy.exe -ErrorAction SilentlyContinue
if ($null -eq $caddy) {
    Add-Failure 'Caddy executable was not found on PATH.'
}

if ($failures.Count -eq 0) {
    try {
        $health = Invoke-WebRequest -Uri 'http://127.0.0.1:8080/healthz' -UseBasicParsing -TimeoutSec 5
        if ($health.StatusCode -ne 200) {
            Add-Failure "Health check returned HTTP $($health.StatusCode), expected 200."
        }
    } catch {
        Add-Failure 'The local site did not respond on http://127.0.0.1:8080/healthz.'
    }

    foreach ($blockedPath in @('/kb', '/api', '/not-a-real-kaiser-route')) {
        $statusCode = $null
        try {
            $response = Invoke-WebRequest -Uri ("http://127.0.0.1:8080$blockedPath") -UseBasicParsing -TimeoutSec 5
            $statusCode = [int]$response.StatusCode
        } catch [System.Net.WebException] {
            if ($null -ne $_.Exception.Response) {
                $statusCode = [int]$_.Exception.Response.StatusCode
            }
        }

        if ($statusCode -ne 404) {
            Add-Failure "Protected or unknown route $blockedPath returned HTTP $statusCode, expected 404."
        }
    }
}

if ($failures.Count -gt 0) {
    Write-Error (($failures | ForEach-Object { "- $_" }) -join [Environment]::NewLine)
    exit 1
}

Write-Output 'Local site verification passed.'
