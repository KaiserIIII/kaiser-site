# Interactive portfolio /explore/

The standalone profile work is mirrored into `public/explore/` as an independently viewable Astro static route. The canonical version remains [KAISER Atelier on GitHub Pages](https://kaiseriiii.github.io/KaiserIIII/).

V7 features: bilingual HTML/CSS/JS, interactive project relationship SVG for desktop, touch-friendly native-button project explorer for small screens, source-linked system casebook, and **side-by-side comparison**. Comparisons work with ten curated public projects and honest category overlap, not proficiency scores. They can be shared via `/?compare=zhixu,migrationwitness#compare` while individual casebooks use `/?case=zhixu`.

The route remains self-hosted static code with no CDN runtime or telemetry. The interactive assets are synchronized from `KaiserIIII/KaiserIIII/experience/`.

**Local preview:** `npm ci && npm run dev`, then visit `http://localhost:4321/explore/`.

**Deployment:** This repository uses a manually published local server / Caddy / Cloudflare Tunnel for `kaiseriii.tech`. Merging the source does not update that separately hosted domain. Review `docs/operations/local-publishing.md` and redeploy explicitly before claiming the route is publicly available there.

The diagrams are conceptual explanations linked to public evidence, not captured runtime traces or guaranteed production certifications.
