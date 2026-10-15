[CmdletBinding()]
param([switch]$Red)
$ErrorActionPreference = 'Stop'
$keyFile = Join-Path $PSScriptRoot '.preview/draft-preview-key.txt'
$previewKey = $env:BELOFAY_DRAFT_PREVIEW_KEY
if (-not $previewKey -and (Test-Path -LiteralPath $keyFile)) {
    $previewKey = [IO.File]::ReadAllText($keyFile).Trim()
}
if (-not $previewKey) {
    $previewKey = Read-Host 'Paste the draft product preview key from Shopify (preview_key value)'
    if ($previewKey -notmatch '^[a-zA-Z0-9_-]+$') { throw 'Enter only the preview_key value.' }
    New-Item -ItemType Directory -Path (Split-Path $keyFile) -Force | Out-Null
    [IO.File]::WriteAllText($keyFile, $previewKey)
}
$port = if ($Red) { 9293 } else { 9292 }
$previewUrl = "http://127.0.0.1:$port/products_preview?preview_key=$([uri]::EscapeDataString($previewKey))&view=belofay-v2"
Start-Process $previewUrl
