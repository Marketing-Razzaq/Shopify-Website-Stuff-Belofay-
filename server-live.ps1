[CmdletBinding()]
param(
    [switch]$Red,
    [ValidateRange(1, 65535)][int]$Port = 0,
    [switch]$PrepareOnly
)

$ErrorActionPreference = 'Stop'
$themeRoot = $PSScriptRoot
if ($Port -eq 0) { $Port = if ($Red) { 9293 } else { 9292 } }

if ($Red) {
    # A separate snapshot keeps the default green source untouched.
    $themeRoot = Join-Path $PSScriptRoot '.preview/red'
    New-Item -ItemType Directory -Path $themeRoot -Force | Out-Null
    foreach ($directory in @('assets', 'blocks', 'config', 'layout', 'locales', 'sections', 'snippets', 'templates')) {
        $sourcePath = Join-Path $PSScriptRoot $directory
        if (Test-Path -LiteralPath $sourcePath) {
            $destinationPath = Join-Path $themeRoot $directory
            $expectedRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '.preview/red')) + [IO.Path]::DirectorySeparatorChar
            if (-not [IO.Path]::GetFullPath($destinationPath).StartsWith($expectedRoot, [StringComparison]::OrdinalIgnoreCase)) {
                throw 'Preview destination is outside the isolated red directory.'
            }
            & robocopy $sourcePath $destinationPath /MIR /NFL /NDL /NJH /NJS /NP | Out-Null
            if ($LASTEXITCODE -ge 8) { throw "Unable to copy $directory into the red preview." }
        }
    }
    $tokensPath = Join-Path $themeRoot 'assets/belofay-pdp-tokens.css'
    $tokens = [IO.File]::ReadAllText($tokensPath)
    foreach ($entry in @{
        '--p-green-50' = '#fff1f0'
        '--p-green-500' = '#c62828'
        '--p-green-600' = '#9f1d1d'
    }.GetEnumerator()) {
        $pattern = [regex]::Escape($entry.Key) + ':\s*#[0-9a-fA-F]{6};'
        if ([regex]::Matches($tokens, $pattern).Count -ne 1) { throw "Expected one primitive $($entry.Key)." }
        $tokens = [regex]::Replace($tokens, $pattern, "$($entry.Key): $($entry.Value);")
    }
    [IO.File]::WriteAllText($tokensPath, $tokens, [Text.UTF8Encoding]::new($false))
}

Write-Host "Theme: $(if ($Red) { 'red snapshot' } else { 'green source' }); port: $Port; path: $themeRoot"
if ($PrepareOnly) { return }
# No permanent theme target or publishing flags: temporary DEVELOPMENT preview only.
& shopify theme dev --store 3fr0k2-ab.myshopify.com --path $themeRoot --port $Port
if ($LASTEXITCODE -ne 0) { throw "Shopify preview stopped with exit code $LASTEXITCODE." }
