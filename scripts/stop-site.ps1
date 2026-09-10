$ErrorActionPreference = 'Stop'

$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$pidFile = Join-Path $repoRoot '.local\caddy.pid'
$caddyfile = Join-Path $repoRoot 'ops\Caddyfile'

if (-not (Test-Path -LiteralPath $pidFile -PathType Leaf)) {
    Write-Output 'Kaiser site is not recorded as running.'
    exit 0
}

$sitePid = [int](Get-Content -LiteralPath $pidFile -Raw).Trim()
$siteProcess = Get-Process -Id $sitePid -ErrorAction SilentlyContinue
if ($null -eq $siteProcess) {
    Remove-Item -LiteralPath $pidFile -Force
    Write-Output 'Removed a stale Kaiser site PID file.'
    exit 0
}

$commandLine = (Get-CimInstance Win32_Process -Filter "ProcessId = $sitePid").CommandLine
if (-not $commandLine -or -not $commandLine.Contains($caddyfile)) {
    throw "PID file $pidFile does not belong to this site's Caddy process. Refusing to stop it."
}

Stop-Process -Id $sitePid -Force
Remove-Item -LiteralPath $pidFile -Force
Write-Output "Stopped Kaiser site process $sitePid."
