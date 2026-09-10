$ErrorActionPreference = 'Stop'

$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$localDir = Join-Path $repoRoot '.local'
$pidFile = Join-Path $localDir 'caddy.pid'
$logFile = Join-Path $localDir 'caddy.log'
$errorLogFile = Join-Path $localDir 'caddy-error.log'
$caddyfile = Join-Path $repoRoot 'ops\Caddyfile'

New-Item -ItemType Directory -Path $localDir -Force | Out-Null

$env:Path = [Environment]::GetEnvironmentVariable('Path', 'Machine') + ';' + [Environment]::GetEnvironmentVariable('Path', 'User')
$caddy = Get-Command caddy.exe -ErrorAction SilentlyContinue
if ($null -eq $caddy) {
    throw 'Caddy was not found on PATH. Install Caddy, then run this script again.'
}

if (-not (Test-Path -LiteralPath (Join-Path $repoRoot 'dist\index.html') -PathType Leaf)) {
    & npm.cmd run build
    if ($LASTEXITCODE -ne 0) {
        throw 'The Astro build failed; Caddy was not started.'
    }
}

if (Test-Path -LiteralPath $pidFile) {
    $oldPid = [int](Get-Content -LiteralPath $pidFile -Raw).Trim()
    $oldProcess = Get-Process -Id $oldPid -ErrorAction SilentlyContinue
    if ($null -ne $oldProcess) {
        $oldCommandLine = (Get-CimInstance Win32_Process -Filter "ProcessId = $oldPid").CommandLine
        if ($oldCommandLine -and $oldCommandLine.Contains($caddyfile)) {
            Stop-Process -Id $oldPid -Force
            $oldProcess.WaitForExit()
        } else {
            throw "PID file $pidFile does not belong to this site's Caddy process. Refusing to stop it."
        }
    }
    Remove-Item -LiteralPath $pidFile -Force
}

$process = Start-Process `
    -FilePath $caddy.Source `
    -ArgumentList @('run', '--config', $caddyfile, '--adapter', 'caddyfile') `
    -WorkingDirectory $repoRoot `
    -RedirectStandardOutput $logFile `
    -RedirectStandardError $errorLogFile `
    -WindowStyle Hidden `
    -PassThru

Set-Content -LiteralPath $pidFile -Value $process.Id -NoNewline

$healthy = $false
for ($attempt = 0; $attempt -lt 20; $attempt++) {
    Start-Sleep -Milliseconds 250
    try {
        $response = Invoke-WebRequest -Uri 'http://127.0.0.1:8080/healthz' -UseBasicParsing -TimeoutSec 2
        if ($response.StatusCode -eq 200) {
            $healthy = $true
            break
        }
    } catch {
        # Caddy may still be starting; the next attempt will retry the health check.
    }
}

if (-not $healthy) {
    if (Get-Process -Id $process.Id -ErrorAction SilentlyContinue) {
        Stop-Process -Id $process.Id -Force
    }
    Remove-Item -LiteralPath $pidFile -Force -ErrorAction SilentlyContinue
    throw "Caddy did not become healthy. Inspect $errorLogFile."
}

Write-Output "Kaiser site is running at http://127.0.0.1:8080/ (PID $($process.Id))."
