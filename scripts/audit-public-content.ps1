$ErrorActionPreference = 'Stop'

$publicRoots = @('src', 'public', 'dist') | Where-Object { Test-Path -LiteralPath $_ }
$files = foreach ($root in $publicRoots) {
  Get-ChildItem -LiteralPath $root -File -Recurse -Force -ErrorAction SilentlyContinue
}

$rules = [ordered]@{
  'student-id' = '2024214925'
  'birth-date' = '2006-03-28'
  'direct-school-email' = 'kaiser@nefu\.edu\.cn'
  'private-frontmatter' = 'privacy\s*:\s*private'
  'api-key' = '(?i)(api[_-]?key|secret[_-]?key)\s*[:=]'
  'private-source-path' = '(?i)E:[\\/]+humanknow'
}

$violations = @()
foreach ($file in $files) {
  $content = Get-Content -LiteralPath $file.FullName -Raw -ErrorAction SilentlyContinue
  foreach ($rule in $rules.GetEnumerator()) {
    if ($content -match $rule.Value) {
      $violations += "$($rule.Key): $($file.FullName)"
    }
  }
}

if ($violations.Count -gt 0) {
  Write-Error ("Public content audit failed:`n" + ($violations -join "`n"))
  exit 1
}

Write-Output "Public content audit passed ($($files.Count) files scanned)."
