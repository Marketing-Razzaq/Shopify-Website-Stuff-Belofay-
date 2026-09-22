# Belofay PDP v2 design system

This design system is scoped to the alternate `product.belofay-v2` template. It must not change the default product template or global Craft styling.

The current template contains the product hero only. Additional product-page sections must be designed and added as separate future tasks.

## Architecture

Primitive tokens define raw brand values. Semantic tokens map those values to interface purposes. Components consume semantic tokens only.

The scope root is `.belofay-pdp`; tokens must not be promoted to `:root` until a separate site-wide design-system project is approved.

## Brand foundations

- Primary action and positive state: green `#50b05d`
- Attention, savings and genuine warnings: orange `#ff8834`
- Primary ink: `#001b0a`
- Canvas: white or a restrained off-white
- Typeface: Gilroy when available, with Arial and sans-serif fallbacks
- Base type unit: `16px`
- Base spacing unit: `4px`

## Interaction rules

- Minimum touch target: 44 by 44 pixels.
- Focus must remain visible for keyboard users.
- Selected variants use more than colour alone: border, background and checked state.
- Secondary technical content uses progressive disclosure.
- Mobile layouts recompose; they do not simply shrink desktop cards.
- The mobile purchase bar reflects the selected variant, price, availability and image.

## Isolation rules

- Load PDP assets from the PDP main section only.
- Do not edit `layout/theme.liquid` for this system.
- Do not add app blocks to the PDP sections.
- Do not reference `shopify://apps` in the alternate template.
- Do not modify `templates/product.json`.
- Do not place PDP tokens on `:root`.

## Product option images

The hero renders only product options named `Color`, `Colour`, or `Size`. Color cards read Shopify's native `product_option_value.swatch.image` first and `product_option_value.swatch.color` second. Add transparent color images by connecting the product's Color option to a Shopify category metafield and assigning a swatch image to each option value in Shopify Admin.
