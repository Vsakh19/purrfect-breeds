# Purrfect Breeds

## Setup/run

Requires Node.js 22.23.4 or newer.

```sh
npm install
npm run dev       # dev server at http://localhost:4321
npm run build     # production build to dist/
npm run preview   # serve the production build
```

## What I've built

A single responsive landing page for Purrfect Breeds, built with Astro and TypeScript from the provided Figma design (desktop 1440px, mobile 670px). Static output, no UI framework; client logic is plain TypeScript in Astro `<script>` blocks.

**Design system**

- `src/styles/tokens.css`: colour, spacing, radius, typography, size, shadow and breakpoint tokens taken from Figma.
- Primitives in `src/components/ui`: `Button` (primary/brand, link or button), `Tag`, `Input` (outlined/filled, optional submit icon), `Select`, `NavLink`, `Container` (content grid with full-bleed columns).
- Blocks in `src/components/blocks`: `BreedCard` and `ReviewCard`, composed from the primitives.
- Texts in `src/i18n/en.ts`, all paths in `src/routes.ts`.

**Sections**

- Fixed header with navigation; below 992px it collapses to the logo and a burger button (the mobile menu itself is not implemented).
- Hero with the "Explore breeds" CTA that smoothly scrolls to the Breed Explorer.
- Breed Explorer:
    - the first 4 breeds are rendered at build time, then the full list is fetched from `catfact.ninja/breeds` on the client;
    - search by name (1s debounce) and coat filter, applied together;
    - "Load more" adds one row at a time; the column count follows the breakpoints (4/3/2/1);
    - error and empty-result states.
- Reviews: a scrollable list with prev/next buttons that are keyboard accessible and disabled at the ends.
- Footer with link columns and social links.

**Accessibility and performance**

- Semantic landmarks, labelled controls, `aria-current`, `aria-busy` and `prefers-reduced-motion` support.
- WebP images via `astro:assets` with an eager, high-priority hero; inline SVGs optimised with SVGO; decoratives are lazy-loaded.
- Lighthouse on the production build: 98–100 for Performance, 100 for Best Practices and SEO; Accessibility 96–100 (see the contrast note below).

## Time spent

About 16 hours of development, plus about 4 hours of testing and polishing: responsive layout, pixel-perfect checks, accessibility and Lighthouse.

## Tradeoffs

Styles not stated in Figma but required by the brief or accessibility guidelines (values kept inline, not as tokens):

- Interactive states are a minimal set because the design has none: buttons, links and arrows get `opacity` on hover, buttons also a `disabled` state and `cursor: pointer`.
- `:focus-visible` outline: keyboard accessibility.
- `scroll-behavior: smooth`, off under `prefers-reduced-motion`: "Explore breeds" scrolls to Breed Explorer.
- Fixed header (`position: fixed`, `z-index: 1`): keeps navigation reachable while scrolling and lets the hero background run under it. The design doesn't say whether the header should stick, so this needs to be confirmed with the design team.
- Reviews scroll smoothly and snap to cards; the scrollbar is hidden because the design has none, so the list is scrolled with the arrows, swipe or trackpad. The bottom padding (pulled back with a negative margin) keeps the card shadows from being clipped by the scroll area.
- Tags are cut with an ellipsis when they don't fit the card: some API values (e.g. "developed in the United States (founding stock from Thailand)") are longer than the design's short labels.
- `--line-height-md` is 1.32 instead of Figma's 1.283: with the Figma value the browser renders the footer text slightly off, while 1.32 lines it up with the design.
- Decorative absolute offsets (footer paws, hero blobs) stay inline instead of becoming tokens: they only place one-off artwork and aren't reused anywhere.

Screen reader labels (e.g. `searchLabel`, `searchSubmitLabel` in `src/i18n/en.ts`) are not in the design; they were written to keep controls accessible.

The breed loading error message (`explorer.loadError`) and the empty search result text (`explorer.emptyResult`) are not in the design either; they tell users why the list is empty instead of leaving the section blank.

The breeds API only offers pagination: it has no "return everything" option and no server-side filtering, so search and the coat filter need the full list in the browser. The client currently asks for an oversized `limit`. Cleaner alternatives:

- Read `total` from the build-time request and pass it to the client, assuming the list doesn't change until the next build.
- Make two requests on the client: a small one to get a fresh `total`, then one with `limit=total`.

Page titles and meta descriptions (`meta` in `src/i18n/en.ts`) are not in the design, they were written for SEO. The About and Contact pages are empty placeholders so the navigation links work.

The favourites logic is not specified: it's unclear what the counter is based on (an account, a backend, the current session). The assumption is that a client-side script is enough, e.g. storing favourite breeds in `localStorage`. For now the header counter is a hard-coded 0.

## Further improvements

- Clarify the requirements for the mobile menu and for the expanded state of the coat filter select: neither is in the design.
- Defer loading the full breed list until the user's first action (filtering or "Load more").
- Add a status element that announces filter results to screen readers.
- Review colour contrast with the designer: the orange accent text and the footer copyright are below WCAG AA.
