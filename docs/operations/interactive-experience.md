# Interactive experience — /explore/

The standalone `public/explore/index.html` page is a dependency-free, progressively-enhanced Canvas-like SVG application. Astro copies it into the static `dist/explore/index.html` output; no external JS runtime, CDN, tracking pixel or private repository is used.

**Interactions:** animated evidence graph, SVG node dragging with pointer capture, domain filtering, connection/evidence mode switching, inspector state changes, keyboard shortcuts and reduced-motion support.

**Preview locally:** `npm ci && npm run dev`, then visit `http://localhost:4321/explore/`.

**Deployment:** This repository documents local Windows Caddy + Cloudflare Tunnel publication. A commit by itself does not refresh a manually deployed server; rebuild and republish using the site's existing procedures in `docs/operations/local-publishing.md`. The source may also be mirrored into GitHub Pages with Pages configured on the profile repository.

**Provenance:** `https://github.com/KaiserIIII/KaiserIIII/experience/index.html` is the original source. Do not claim a hosted production route is live without checking it.
