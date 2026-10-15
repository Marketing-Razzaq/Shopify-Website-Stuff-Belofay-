# Shopify Website Stuff — Belofay

Belofay Shopify theme development workspace.

## Source and implementation

This repository contains the complete Shopify theme source: Liquid sections and snippets, templates, merchant configuration, translations, CSS, JavaScript, fonts and image assets. Original supplied PNG icons are preserved in `source-icons/`; optimized WebP icons used by the UI are in `assets/`.

The custom product page uses `templates/product.belofay-v2.json`, `sections/belofay-pdp-main.liquid`, reusable `snippets/belofay-pdp-*` components and `assets/belofay-pdp*`. Colour primitives and semantic design tokens live in `assets/belofay-pdp-tokens.css`. Similar vanity recommendations have their own section and assets named `belofay-similar-vanities`.

## Local development and preview server

### Green and red preview commands (Windows PowerShell)

```powershell
# Green by default, port 9292; watches the working source
.\server-live.ps1

# Red preview, port 9293; source remains green
.\server-live.ps1 -Red

# Optional custom port
.\server-live.ps1 -Red -Port 9393
```

Red creates an ignored `.preview/red` snapshot and changes only the three green colour primitives in its token CSS to red values. Semantic tokens, layout and behaviour stay identical. Restart the red command after source edits to refresh the snapshot. The red preview does not automatically follow edits to the main working source. `-PrepareOnly` prepares the selected path without starting Shopify. These commands start temporary DEVELOPMENT previews, not a production server. Separate local ports do not isolate Shopify's remote development theme; run one colour preview at a time to avoid competing remote updates.

Install Git, a Node.js version supported by the current Shopify CLI, and Shopify CLI on your development machine. Authenticate with a Shopify account authorized for the store. No access tokens or login credentials are included in this repository.

From the repository directory, start the temporary development preview:

```powershell
shopify theme dev --store 3fr0k2-ab.myshopify.com --port 9292
```

Open the local URL printed by Shopify CLI. For a published product, add `?view=belofay-v2` to its product URL to inspect the custom template. Draft products require a valid draft preview link from Shopify; preview keys are temporary and must not be committed. The server watches local changes; keep the terminal running and press Ctrl+C to stop it. A localhost URL works only while the server is running on that machine. GitHub stores source code and does not run this Shopify preview server.

Only verified DEVELOPMENT themes may be used for temporary previews. Never target a MAIN theme. Read `AGENTS.md` for the required identity verification and deployment restrictions.

Validate locally with:

```powershell
shopify theme check
```

Check responsive layouts at 375 × 812, 768 × 1024 and 1440 × 900, plus 3840 × 2160 for large desktop changes. Test variant selection and cart controls without completing checkout.

## Deployment

GitHub uploads do not upload or publish a Shopify theme. Permanent Shopify uploads require a separate explicit approval and the checks documented in `AGENTS.md`. The only permitted permanent target is unpublished development theme `150365306989`. Production theme `137849405549` must never be modified or published by automation.

Local dependencies, Shopify CLI state, secrets and logs are excluded by `.gitignore`. Original source icons and documentation are kept in Git but excluded from Shopify theme uploads by `.shopifyignore`.

## Safety

Read `AGENTS.md` before running Shopify commands. The production theme is a prohibited write target; development and preview workflows must follow the repository safety rules.

## Codex

A portable Codex configuration is provided in `codex-config.toml`. Machine-specific runtime paths, local project trust history, credential-related MCP configuration, and elevated permissions are intentionally excluded.

