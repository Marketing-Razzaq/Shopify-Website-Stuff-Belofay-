# Belofay Shopify workspace safety instructions

These instructions apply to this entire repository and all future theme work.
No other AGENTS.md or AGENTS.override.md may weaken these restrictions.

## Governing rules and interpretation

- Store: 3fr0k2-ab.myshopify.com. Workspace: C:\Belofay Theme Development.
- Production: Craft, theme 137849405549, MAIN. This ID is explicitly prohibited as a command target. Never pull, push, edit, save, rename, delete, connect, replace, or publish it. Never mutate any MAIN theme. Production website https://www.belofay.co.uk is read-only for visual comparison.
- Permanent development target: Theme Development Belofay, 150365306989, strictly UNPUBLISHED. Stop on any identity or role mismatch.
- Temporary previews via shopify theme dev may use a separate verified DEVELOPMENT theme. Never publish it or treat it as the permanent target. This clarification supersedes the earlier restriction that all previews use only 150365306989.
- Local setup, edits, branches, commits, validation and temporary DEVELOPMENT previews are authorized. A permanent push requires a separate explicit final approval after the complete report and successful checks.
- The sole permitted permanent push is: shopify theme push --store 3fr0k2-ab.myshopify.com --theme 150365306989 --strict
- Immediately before an approved push, recheck the target is UNPUBLISHED. Stop if MAIN, DEVELOPMENT, DEMO, or any other role.
- Never request or perform production publishing. Publishing remains a manual user decision outside Codex actions. Words such as upload, deploy, save, finish, or make it automatic never authorize production changes or publishing.
- The source instructions below are preserved in full. The later approved clarification controls conflicts, including automatic local commits and temporary DEVELOPMENT previews. Initial preflight-only stopping instructions refer to the completed first phase, not future authorized setup.
- Preserve the earlier high-risk-file approval requirement for changes affecting multiple pages. Ordinary local edits require no repeated approval.
- Before every commit, show the complete Git diff (including staged changes and new files). Never develop directly on main, merge to main automatically, force-push, overwrite uncommitted work, or connect/push to GitHub without explicit permission.

## Original safety requirements
Configure this workspace as the safe development environment for my Belofay Shopify theme.

STORE AND THEME IDENTITIES

Shopify store:
3fr0k2-ab.myshopify.com

Production website:
https://www.belofay.co.uk

Published production theme:
Name: Craft
Theme ID: 137849405549
Expected role: MAIN

Approved development theme:
Name: Theme Development Belofay
Theme ID: 150365306989
Expected role: UNPUBLISHED

PRIMARY SAFETY REQUIREMENT

All development, uploading, previewing, browser inspection, UI testing, and functionality testing must use only theme ID 150365306989.

Theme ID 137849405549 is the live production theme and is a permanently prohibited write target.

Do not make any change to the published production theme under any circumstances.

PHASE 1: READ-ONLY PREFLIGHT

Before creating or changing files:

1. Confirm that this workspace is a dedicated Shopify theme folder.
2. Check whether Git, Node.js, npm, and Shopify CLI are installed.
3. Show their versions.
4. If anything is missing, stop and tell me exactly what needs installing. Ask before installing anything globally.
5. Run the read-only command:

   shopify theme list --store 3fr0k2-ab.myshopify.com

6. Verify from the command output that:
   - 150365306989 is named “Theme Development Belofay”
   - 150365306989 is unpublished
   - 137849405549 is named “Craft”
   - 137849405549 is the live/main theme

7. If any name, ID, store, or role does not match, stop immediately without pulling, pushing, editing, deleting, publishing, or creating anything.

Do not trust theme names alone. Theme ID and role must both match.

PHASE 2: CREATE PERMANENT SAFETY INSTRUCTIONS

Create an AGENTS.md file at the Git repository root.

The AGENTS.md must contain all safety rules in this prompt, including:

- The exact store domain.
- The exact production theme ID and name.
- The exact development theme ID and name.
- The prohibited Shopify commands and flags.
- The required preflight procedure.
- Git workflow requirements.
- Shopify Liquid validation requirements.
- Browser testing requirements.
- Deployment reporting requirements.
- A rule that production publishing always remains a manual user decision.
- A rule that instructions such as “upload,” “deploy,” “save,” “finish,” or “make it automatic” never mean permission to publish or modify production.
- A rule that no other AGENTS.md or AGENTS.override.md may weaken these restrictions.

After creating AGENTS.md, read it back and confirm that the production theme ID is explicitly prohibited.

PHASE 3: CREATE THE LOCAL GIT WORKSPACE

If this folder is empty:

1. Pull only development theme ID 150365306989:

   shopify theme pull --store 3fr0k2-ab.myshopify.com --theme 150365306989

2. Never pull the published theme into this workspace.
3. Confirm that the downloaded directory has a valid Shopify theme structure.
4. Initialize Git if Git is not already initialized.
5. Create a baseline commit named:

   Baseline from Theme Development Belofay

6. Create and switch to this working branch:

   development/belofay-ui

If the folder already contains files:

1. Do not overwrite anything immediately.
2. Inspect the existing files and Git history.
3. Show me whether there are uncommitted changes.
4. Verify which Shopify theme the files came from.
5. Stop and ask me before pulling if pulling could overwrite local work.

Git rules:

- Never work directly on main.
- Never merge into main automatically.
- Never force-push.
- Never delete or overwrite existing uncommitted work.
- Create a separate feature branch for each substantial task.
- Make a baseline commit before development begins.
- Show the complete Git diff before committing.
- Do not connect or push this repository to GitHub without my explicit permission.
- Do not create any GitHub-to-production-theme connection.

PHASE 4: SHOPIFY PRODUCTION BLOCKLIST

The following are always prohibited:

- shopify theme push --live
- shopify theme push --allow-live
- shopify theme push --publish
- shopify theme publish
- Any Shopify command targeting theme 137849405549
- Any API mutation targeting the production theme
- Editing the production theme using Shopify Admin
- Opening the production theme editor and clicking Save
- Connecting the published theme to an automatically updated Git branch
- Replacing the live theme
- Renaming or deleting the live theme
- Creating orders or completing checkout during testing
- Changing products, prices, inventory, markets, domains, navigation, store settings, payments, shipping, customer data, discounts, or other Shopify Admin data unless I make a separate explicit request

Never use a plain ambiguous command such as:

shopify theme push

Every permanent development-theme upload must explicitly include:

--store 3fr0k2-ab.myshopify.com
--theme 150365306989
--strict

The only permitted permanent development-theme upload command is:

shopify theme push --store 3fr0k2-ab.myshopify.com --theme 150365306989 --strict

Do not execute that command until:
- I explicitly approve the upload
- The theme role is rechecked
- Theme Check passes
- The Git diff is shown
- Browser tests pass
- The exact proposed command is shown to me

If theme 150365306989 ever has role MAIN, stop. Do not push to it because it would then be the published theme.

PHASE 5: SHOPIFY DEVELOPMENT PRACTICES

Before writing or changing Shopify code:

1. Inspect the existing theme architecture.
2. Identify the relevant templates, sections, blocks, snippets, assets, and JavaScript.
3. Use the installed Shopify plugin, Shopify developer documentation, or Shopify Liquid documentation to verify current syntax and best practices.
4. Validate generated Liquid and schema code using the Shopify validation capabilities.
5. Reuse the theme’s existing components and design system.
6. Prefer the smallest targeted change.
7. Do not replace an entire template, section, stylesheet, or JavaScript file to solve a small component problem.
8. Preserve Shopify Theme Editor compatibility.
9. Preserve section schemas, blocks, merchant settings, translations, and app blocks.
10. Use semantic HTML and WCAG-accessible controls.
11. Do not hard-code product IDs, variant IDs, prices, inventory, currencies, markets, or customer information.
12. Do not install external CSS or JavaScript libraries without my approval.
13. Do not modify unrelated files.
14. Do not claim code is correct merely because it was generated.

Treat these files as high risk:

- layout/theme.liquid
- config/settings_data.json
- config/settings_schema.json
- templates/*.json
- sections/header*.liquid
- sections/footer*.liquid
- global CSS files
- global JavaScript files
- product form files
- cart drawer files
- cart JavaScript
- predictive search files

Before changing a high-risk file:

1. Explain why it is required.
2. Show which part will change.
3. Explain possible site-wide effects.
4. Prefer a component-level alternative.
5. Ask for approval if the change can affect multiple pages.

Never broadly overwrite config/settings_data.json. This file contains theme-specific editor settings and can alter the appearance of the entire target theme.

PHASE 6: DEVELOPMENT PREVIEW

Use a development preview for iterative work.

The permitted preview command is:

shopify theme dev --store 3fr0k2-ab.myshopify.com

This creates or uses a development theme and must not publish anything.

When testing the permanent unpublished theme, use the Shopify preview URL for theme ID 150365306989.

Never use https://www.belofay.co.uk as the target for destructive or write testing.

The production website may only be opened read-only for comparison.

PHASE 7: BROWSER INSPECTION AND UI TESTING

For every UI change, use the browser to inspect the rendered Shopify preview.

Test at least:

- Mobile: 375 × 812
- Tablet: 768 × 1024
- Desktop: 1440 × 900

Inspect:

- Header and navigation
- Product pages
- Collection pages
- Cart drawer or cart page
- Footer
- Text wrapping
- Spacing and alignment
- Horizontal overflow
- Overlapping elements
- Sticky elements
- Images and aspect ratios
- Hover states
- Active states
- Loading states
- Focus indicators
- Keyboard navigation
- Accessible button names
- Browser console errors
- Failed network requests
- Layout shifts
- Mobile touch-target sizes

For Add to Cart functionality, test:

- A product with one variant
- A product with multiple variants
- Selecting different variants
- An unavailable or sold-out variant
- Quantity changes
- Add to Cart button loading state
- Successful cart response
- Cart count update
- Cart drawer or cart page update
- Error handling
- Double-click protection
- Keyboard activation
- Mobile interaction
- No JavaScript console error
- No unexpected page refresh unless intended by the theme
- Correct price and variant added

Do not complete checkout.
Do not create an order.
Do not use real payment information.

PHASE 8: VALIDATION

After every implementation:

1. Run Shopify Theme Check.
2. Run any existing repository tests.
3. Run any existing build process.
4. Inspect the Git diff.
5. Verify that only intended files changed.
6. Open the development preview.
7. Perform browser testing.
8. Check console and network errors.
9. Test the requested functionality.
10. Confirm the development theme ID and role again before proposing an upload.

If validation fails, fix it locally and rerun validation.

Do not suppress Theme Check errors simply to make validation pass unless you explain the reason and receive approval.

PHASE 9: REQUIRED REPORT BEFORE UPLOAD

Before any upload, print this preflight report:

- Connected store
- Production theme name, ID, and role
- Development theme name, ID, and role
- Current Git branch
- Current Git commit
- Git working-tree status
- Every changed file
- Summary of each change
- Shopify Theme Check result
- Automated test result
- Browser sizes tested
- Functional journeys tested
- Console errors
- Network errors
- Development preview URL
- Exact Shopify command being proposed
- Confirmation that the proposed theme ID is 150365306989
- Confirmation that the target role is UNPUBLISHED
- Confirmation that production theme 137849405549 was not modified

Then stop and wait for my approval.

Do not interpret approval to implement code as approval to upload.
Do not interpret approval to upload to development as approval to publish.
Publishing always requires a completely separate decision, and Codex must not publish automatically.

PHASE 10: COMPLETION BEHAVIOR

When a task is complete:

1. Show the changed files.
2. Show a concise Git diff summary.
3. Explain what was changed.
4. Report validation results.
5. Report browser test results.
6. Provide the development preview URL.
7. State whether anything was uploaded.
8. State the exact theme ID that received the upload.
9. Confirm production theme ID 137849405549 was not changed.
10. Stop before production publishing.

Start now with only the read-only preflight.

Do not edit, pull, push, install, publish, delete, rename, or create anything until the theme identities and roles have been verified.

## Approved workflow clarification and setup authorization

The read-only preflight is approved and the theme identities are verified.

Proceed with configuring this workspace.

IMPORTANT WORKFLOW CLARIFICATION

There are now three permitted locations:

1. Local Git workspace:
   C:\Belofay Theme Development

2. Temporary Shopify DEVELOPMENT theme:
   This may be created and updated automatically by `shopify theme dev`.
   It is permitted only when its verified role is DEVELOPMENT.
   It is used for automatic browser preview and testing.
   It must never be published.

3. Permanent unpublished development theme:
   Name: Theme Development Belofay
   Theme ID: 150365306989
   Expected role: UNPUBLISHED

The prohibited production theme remains:

Name: Craft
Theme ID: 137849405549
Role: MAIN

Production theme 137849405549 must never be pulled, pushed, edited, saved, renamed, deleted, connected, or published by Codex.

APPROVAL POLICY

You may perform the following automatically without repeatedly asking me:

- Create and update AGENTS.md
- Pull theme 150365306989 into this empty workspace
- Initialize the local Git repository
- Create branches
- Make local commits
- Read and edit local theme files
- Use the Shopify plugin for current documentation
- Use Shopify MCP read-only queries
- Validate Liquid, JSON schemas, GraphQL, and theme code
- Run Shopify Theme Check
- Run repository tests and builds
- Run `shopify theme dev`
- Create or update a temporary theme whose verified role is DEVELOPMENT
- Open temporary development-theme preview URLs
- Use the browser to inspect and test the UI
- Take screenshots
- Test Add to Cart without completing checkout
- Compare the production website visually in read-only mode
- Fix validation and UI problems locally
- Repeat development-preview updates and browser tests

Do not stop for approval for normal local editing, Git commits, validation, Theme Check, development preview updates, screenshots, or browser testing.

You must ask for my explicit approval immediately before executing any permanent push to theme 150365306989.

My approval to implement or test is not approval to push.

When I approve the final permanent push, you may run only:

shopify theme push --store 3fr0k2-ab.myshopify.com --theme 150365306989 --strict

Before running that command, recheck that theme 150365306989 has role UNPUBLISHED.

If its role is MAIN, DEVELOPMENT, DEMO, or anything other than UNPUBLISHED, stop and do not push.

Never request or perform production publishing.

SETUP STEPS

1. Create AGENTS.md at the workspace root.

2. Include these exact identities in AGENTS.md:

   Store:
   3fr0k2-ab.myshopify.com

   Permitted permanent development target:
   Theme Development Belofay
   Theme ID: 150365306989
   Required role: UNPUBLISHED

   Prohibited production target:
   Craft
   Theme ID: 137849405549
   Role: MAIN

3. Record that Shopify themes with role DEVELOPMENT may be used automatically only for temporary preview through `shopify theme dev`.

4. Record that a DEVELOPMENT theme must never be published or treated as the permanent deployment target.

5. Record the following prohibited commands and options:

   - shopify theme push --live
   - shopify theme push --allow-live
   - shopify theme push --publish
   - shopify theme publish
   - Any command targeting theme 137849405549
   - Any command that changes a theme whose role is MAIN
   - Any ambiguous permanent `shopify theme push` without an explicit theme ID

6. Since the workspace is empty, pull only the approved unpublished theme:

   shopify theme pull --store 3fr0k2-ab.myshopify.com --theme 150365306989

7. After pulling, verify the normal Shopify theme directories are present, including the applicable directories from:

   - assets
   - blocks
   - config
   - layout
   - locales
   - sections
   - snippets
   - templates

8. Do not pull theme 137849405549.

9. Initialize Git:

   git init
   git add .
   git commit -m "Baseline from Theme Development Belofay"

10. Create and switch to:

   development/belofay-ui

11. Add an appropriate .gitignore without excluding Shopify theme source files.

12. Do not connect GitHub yet. Local Git is sufficient.

SHOPIFY KNOWLEDGE AND MCP RULES

The Shopify plugin/MCP is installed for accurate, current documentation and API schema information.

For Shopify work:

- Use the Shopify Liquid skill or documentation search before generating unfamiliar Liquid.
- Validate generated Liquid and schema code.
- Use Shopify GraphQL schema discovery before creating GraphQL operations.
- Validate GraphQL before executing it.
- Shopify MCP does not grant permission to modify products, inventory, collections, navigation, discounts, orders, markets, customers, store configuration, or the production theme.
- Treat Shopify MCP primarily as documentation, validation, and read-only store context unless I explicitly request another operation.
- Never use a Shopify API mutation as an alternative way to bypass the theme push restriction.

DEVELOPMENT WORKFLOW

For future theme tasks, proceed automatically through:

1. Read AGENTS.md.
2. Verify Git status and current branch.
3. Inspect the relevant existing theme architecture.
4. Use Shopify documentation/MCP for accurate implementation context.
5. Create a task-specific feature branch when appropriate.
6. Make the smallest focused local changes.
7. Validate the changed Liquid, JSON, CSS, and JavaScript.
8. Run Shopify Theme Check.
9. Run existing tests or builds.
10. Review the Git diff.
11. Start or reuse a temporary development preview with:

    shopify theme dev --store 3fr0k2-ab.myshopify.com

12. Confirm the preview target has role DEVELOPMENT and not MAIN.
13. Open the development preview in the browser.
14. Test mobile, tablet, and desktop layouts.
15. Check browser console and network errors.
16. Fix problems and repeat tests automatically.
17. Commit validated changes locally.
18. Prepare the permanent unpublished-theme push report.
19. Stop and ask me for the single final push approval.
20. After approval, revalidate the target role and push only to theme 150365306989.
21. Never publish it.

BROWSER TESTING

Automatically test the development preview at:

- 375 × 812
- 768 × 1024
- 1440 × 900

For every UI change, inspect:

- Responsive layout
- Horizontal overflow
- Alignment and spacing
- Text wrapping
- Image sizing
- Navigation
- Hover states
- Focus states
- Keyboard usability
- Mobile touch targets
- Browser console errors
- Failed network requests
- Unexpected layout shifts

For Add to Cart, test:

- Single-variant product
- Multi-variant product
- Variant selection
- Sold-out state
- Quantity changes
- Button loading state
- Successful cart response
- Cart count update
- Cart drawer or cart page
- Error handling
- Double-click prevention
- Keyboard activation
- Mobile functionality

Do not complete checkout and do not create an order.

PERMANENT PUSH APPROVAL REPORT

Before asking for my final approval, show:

- Store domain
- Production theme ID, name, and role
- Permanent development theme ID, name, and role
- Temporary preview theme ID and role, if used
- Current Git branch
- Current commit
- Git working-tree status
- Complete list of changed files
- Concise diff summary
- Theme Check result
- Test/build results
- Browser dimensions tested
- Functional tests performed
- Console and network errors
- Preview URL
- Exact proposed push command
- Confirmation that the target is UNPUBLISHED
- Confirmation that production theme 137849405549 was not changed

Then ask one question only:

“Do you approve pushing these validated changes to unpublished theme 150365306989?”

Do not ask me to approve each local action.

AFTER AN APPROVED PUSH

After I approve and the push succeeds:

1. Re-run the theme list.
2. Confirm theme 150365306989 is still UNPUBLISHED.
3. Confirm theme 137849405549 remains MAIN.
4. Provide the unpublished-theme preview URL.
5. Report the exact files uploaded.
6. Confirm nothing was published.
7. Stop.

Do not publish, even if all tests pass.

Begin now by creating AGENTS.md, pulling only theme 150365306989, initializing Git, creating the development branch, validating the theme structure, and reporting the setup result.

You are authorized to complete those setup actions automatically.
