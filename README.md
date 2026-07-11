# Rhonda's Lil' Store — Custom Shopify Theme

A fully custom Shopify Online Store 2.0 theme built from scratch for **Rhonda's Lil' Store**.
Modern, professionally futuristic aesthetic (porcelain white / deep space navy / electric blue), conversion-focused layout, and
100% compatible with ZenDrop — any product or collection you import shows up automatically.

## Connecting to Shopify (GitHub integration)

1. In Shopify admin go to **Online Store → Themes**
2. Scroll to *Theme library* → **Add theme → Connect from GitHub**
3. Authorize GitHub (Eric-Tomchik) and pick this repo, branch `main`
4. Click **Publish** when ready (or *Customize* first to preview)

Shopify auto-syncs: every push to `main` updates the theme, and edits made in the
theme editor are committed back to this repo.

## Customizing

Everything is editable in **Online Store → Themes → Customize**:

- **Colors** — Theme settings → Colors (primary, accent, backgrounds, text)
- **Logo** — Header section
- **Homepage** — reorder/add/remove sections: Hero, Trust bar, Featured collection,
  Collection list, Value props, Image banner, Testimonials, Newsletter
- **Menus** — Shopify admin → Navigation (`main-menu` and `footer`)

## ZenDrop workflow

1. Import products in ZenDrop → they push to Shopify automatically
2. Create collections in Shopify (e.g. *Bestsellers*, *New Arrivals*, *Home & Cozy*)
3. In the theme editor, point the "Featured collection" and "Collection list"
   sections at those collections — done

## Structure

```
layout/      theme.liquid (global shell, fonts, CSS vars)
sections/    all homepage + page sections (each with editor schema)
snippets/    product-card, icon set
templates/   JSON templates (OS 2.0) + customer account pages
assets/      theme.css, theme.js (no frameworks, fast)
config/      theme settings (colors, favicon)
locales/     all storefront text (easy to reword)
```
