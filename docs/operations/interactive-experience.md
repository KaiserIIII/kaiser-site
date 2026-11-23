# Portfolio atelier — /explore/

The static site includes a synchronized copy of the publicly hosted [KAISER Atelier](https://kaiseriiii.github.io/KaiserIIII/) experience from the profile repository, including **the bilingual interactive system blueprints**, searchable project archive, draggable SVG graph and keyboard command palette.

All runtime HTML/CSS/JavaScript lives in `public/explore/` and is copied directly by Astro; no third-party CDN or analytics scripts are required. The source is maintained at [KaiserIIII/KaiserIIII](https://github.com/KaiserIIII/KaiserIIII/tree/main/experience). Keep this copy in sync when the public experience changes.

**Local preview:** `npm ci && npm run dev`, then visit `http://localhost:4321/explore/` (including deep links such as `?case=zhixu`).

**Deployment:** This personal website uses its existing local publishing procedure. Updating this GitHub source repository does **not** automatically update `kaiseriii.tech`; a separate local rebuild and publication is required. See `docs/operations/local-publishing.md`.

**Evidence:** Casebook diagrams are conceptual, sourced to public releases or repository records. They do not imply access to private CardCraft source or certify production deployments.
