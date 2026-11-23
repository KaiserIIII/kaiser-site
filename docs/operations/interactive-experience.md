# Interactive portfolio /explore/

The standalone profile work is mirrored into `public/explore/` as an independently viewable Astro static route. The canonical version remains [KAISER Atelier on GitHub Pages](https://kaiseriiii.github.io/KaiserIIII/).

V7 features: bilingual HTML/CSS/JS, interactive project relationship SVG for desktop, touch-friendly native-button project explorer for small screens, source-linked system casebook, and **side-by-side comparison**. Comparisons work with ten curated public projects and honest category overlap, not proficiency scores. They can be shared via `/?compare=zhixu,migrationwitness#compare` while individual casebooks use `/?case=zhixu`.

The route remains self-hosted static code with no CDN runtime or telemetry. The interactive assets are synchronized from `KaiserIIII/KaiserIIII/experience/`.

**Local preview:** `npm ci && npm run dev`, then visit `http://localhost:4321/explore/`.

**Deployment:** This repository uses a manually published local server / Caddy / Cloudflare Tunnel for `kaiseriii.tech`. Merging the source does not update that separately hosted domain. Review `docs/operations/local-publishing.md` and redeploy explicitly before claiming the route is publicly available there.

The diagrams are conceptual explanations linked to public evidence, not captured runtime traces or guaranteed production certifications.

## V8 — A hands-on reliability lab

The `/explore/#lab` section adds two deterministic synthetic experiments: (1) role grant preservation in a **toy** native-ALTER vs table-replacement model, and (2) tenant filtering before lexical search over **six invented documents**. Its `lab-engine.js` is pure JavaScript and `lab-ui.js` provides bilingual forms, trace output, source links and scenario JSON copying. The models are **not** real PostgreSQL, pg-osc, vector RAG or an LLM execution; the page links separately to [MigrationWitness](https://github.com/KaiserIIII/migrationwitness) and [Zhixu](https://github.com/KaiserIIII/zhixu) for genuine source and validation.

Static assets are synchronized from `KaiserIIII/KaiserIIII/experience/`. `kaiseriii.tech` is published separately on an independently managed local server and will not change until that server is rebuilt and published.

## V9 — Guided Field Notes / opt-in reader

The interactive portfolio includes three bilingual editorial reading paths that let new visitors follow **real public project evidence** rather than only browsing a large index: *Make it real*, *Follow the failure* and *Connect the disciplines*. Each step can open the existing casebook, toy-model reliability lab or comparison notebook, and evidence links are sourced from the same curated ten public repositories.

The native modal starts only when visitors request it, supports previous/next, keyboard operation, step progress and reduced motion, and provides direct URLs such as `/?trail=verify&note=2`. No analytics are recorded and no private-source materials are used. The reader is documentation/navigation, not a new scientific experiment or professional credential.

As with prior versions, `public/explore/` is a source-synchronized static route. **Merging this repository does not publish `kaiseriii.tech`**: the separate local-server deployment must be performed explicitly.

## V10 — Grounded, explainable portfolio search

Existing Cmd/Ctrl+K search has been upgraded **in place**, rather than adding a new section. The canonical local implementation is `search-engine.js` plus the original `app.js`: bilingual domain signals and keyword matching rank the ten curated public projects, while the visible evidence panel shows (a) why a record matches, (b) that project's published evidence, (c) its recorded limitations, and (d) direct public evidence links. Suggested prompts and zero-match explanations make the interaction usable to visitors unfamiliar with project names.

**The engine is intentionally not an LLM**. It does not browse GitHub, fabricate claims, measure skill or assert that a private repository is public. Search rank is only query relevance. No visitor query is sent to a server or logged by this page. Project facts still depend on dated, curated public records and are not automatically verified for freshness.

The canonical GitHub Pages source lives in `KaiserIIII/KaiserIIII/experience`. As before, merging this source mirror **does not deploy `kaiseriii.tech`**: the separately managed server must be rebuilt and published through the existing operations procedure.
