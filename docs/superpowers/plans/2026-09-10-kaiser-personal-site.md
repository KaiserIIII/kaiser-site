# Kaiser Personal Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and publish a high-technology, cinematic personal portfolio for Kaiser / 于越, served by the user's Windows computer with a protected local knowledge base and domain email forwarding.

**Architecture:** Astro generates a static site from a manually reviewed public profile and project dataset. Caddy serves the built site on localhost, while Cloudflare Tunnel exposes only approved public routes; the LangBot/RAG knowledge base remains local or authenticated and is never queried by the public page. GitHub stores safe source code and runs CI; the home computer remains the production origin.

**Tech Stack:** Astro, TypeScript, semantic HTML, CSS/SVG/lightweight browser JavaScript, Node.js 24, Caddy, Cloudflare Tunnel, GitHub Actions, PowerShell, existing FastAPI/LangBot knowledge base.

## Global Constraints

- The public brand is `Kaiser`; the first domain to attempt is `kaiseriii.me`, with `yuyue.me` as the fallback if registration changes.
- The website must use the C visual direction: cinematic data story, high-contrast editorial typography, chapter numbers, timeline, and high-tech visual effects.
- The public site may contain only reviewed public identity, education direction, selected projects, verified achievements, and confirmed external links.
- Student ID, birth date, direct school email, family information, grades/rank, raw chats, mail exports, API keys, knowledge-base databases, and uploaded documents must not enter the repository, build output, or public routes.
- The home computer is the public origin; GitHub Pages is not the production origin.
- The local knowledge base must not have an anonymous public route.
- `hello@kaiseriii.me` is an inbound forwarding alias; local SMTP is not part of v1.
- External account creation, domain registration, tunnel creation, DNS changes, email-routing changes, repository publication, and public-content publication require an explicit confirmation immediately before the final external action.
- Every task ends with a verification command and a focused commit.

## File Map

- `package.json`, `package-lock.json`: pinned Node scripts and dependency graph.
- `astro.config.mjs`, `tsconfig.json`: Astro and strict TypeScript configuration.
- `src/layouts/SiteLayout.astro`: document shell, metadata, language and theme hooks.
- `src/pages/index.astro`: single-page chapter composition.
- `src/pages/projects/[slug].astro`: accessible detail pages generated from the project dataset.
- `src/components/`: `SiteHeader`, `HeroChapter`, `JourneyChapter`, `ProjectGrid`, `SignalsChapter`, `ContactChapter`, and small reusable UI pieces.
- `src/data/profile.ts`, `src/data/experience.ts`, `src/data/projects.ts`: typed, sanitized public content.
- `tests/smoke.test.ts`, `tests/public-content.test.ts`: build, route, accessibility-hook, and privacy contracts.
- `src/styles/global.css`: theme tokens, editorial layout, responsive rules, effects, focus states, reduced-motion behavior.
- `src/scripts/site.ts`: menu, theme, language, project filtering, scroll progress, and copy-email enhancement.
- `public/`: only approved static assets such as a reviewed resume PDF or favicon.
- `tests/public-content.test.ts`: public-data privacy and required-field checks.
- `ops/Caddyfile`: localhost static server and explicit health route.
- `ops/cloudflared/config.example.yml`: tracked route shape with no credentials; the real tunnel config stays ignored.
- `scripts/start-site.ps1`, `scripts/stop-site.ps1`, `scripts/verify-site.ps1`: repeatable local lifecycle commands.
- `.github/workflows/ci.yml`: install, content audit, Astro check, build, and link-safe checks.
- `docs/operations/local-publishing.md`: local startup, tunnel, domain, email, backup, and recovery instructions.

---

### Task 1: Bootstrap the Astro application and quality gates

**Files:**
- Create: `package.json`
- Create: `package-lock.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `src/layouts/SiteLayout.astro`
- Create: `src/pages/index.astro`
- Create: `src/styles/global.css`
- Create: `src/scripts/site.ts`
- Modify: `.gitignore`

**Interfaces:**
- Consumes: the empty repository and Node.js 24 already present on the computer.
- Produces: `npm run dev`, `npm run check`, `npm run build`, and a strict TypeScript Astro project that emits `dist/`.

- [ ] **Step 1: Write the failing smoke test**

Create `tests/smoke.test.ts` with the contract that the built output contains a `<main>` element and the title `KAISER` after the first page is implemented.

```ts
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('built homepage', () => {
  it('contains the public page shell', () => {
    const html = readFileSync('dist/index.html', 'utf8');
    expect(html).toContain('<main');
    expect(html).toContain('KAISER');
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- --run tests/smoke.test.ts`  
Expected: FAIL because the Astro project and `dist/index.html` do not exist yet.

- [ ] **Step 3: Create the minimal project**

Add scripts for `dev`, `build`, `preview`, `check`, `test`, and `audit:public`. Configure Astro to use strict TypeScript and preserve the site root at `/`. Add the minimum Vitest dependency needed by the test.

- [ ] **Step 4: Run the smoke test and static checks**

Run: `npm run check`  
Run: `npm run build`  
Run: `npm test -- --run tests/smoke.test.ts`  
Expected: Astro check, build, and the smoke test pass.

- [ ] **Step 5: Commit**

```powershell
git add package.json package-lock.json astro.config.mjs tsconfig.json src tests .gitignore
git commit -m "feat: bootstrap Astro personal site"
```

### Task 2: Create the reviewed public profile and project data layer

**Files:**
- Create: `src/data/profile.ts`
- Create: `src/data/experience.ts`
- Create: `src/data/projects.ts`
- Create: `tests/public-content.test.ts`
- Create: `scripts/audit-public-content.ps1`

**Interfaces:**
- Consumes: `E:\humanknow\me\主页.md`, `E:\humanknow\me\01-关于我\个人档案.md`, `E:\humanknow\me\08-日记与时间线\学业与经历时间线.md`, and `E:\humanknow\me\项目索引.md` as read-only sources.
- Produces: typed `profile`, `experience`, and `projects` exports containing only the public-safe subset defined in the design spec.

- [ ] **Step 1: Write privacy and shape tests**

```ts
import { describe, expect, it } from 'vitest';
import { profile } from '../src/data/profile';
import { projects } from '../src/data/projects';

describe('public profile', () => {
  it('contains only approved public identity fields', () => {
    expect(profile.name).toBe('于越');
    expect(profile.englishName).toBe('Yue Yu');
    expect(profile.github).toBe('KaiserIIII');
    expect(JSON.stringify(profile)).not.toMatch(/2024214925|2006-03-28|kaiser@nefu\.edu\.cn/);
  });

  it('has a linkable project record for every published project', () => {
    expect(projects.length).toBeGreaterThanOrEqual(4);
    for (const project of projects) {
      expect(project.slug).toMatch(/^[a-z0-9-]+$/);
      expect(project.title.length).toBeGreaterThan(2);
      expect(project.summary.length).toBeGreaterThan(20);
      expect(project.status).toMatch(/^(active|selected|exploratory|coursework)$/);
    }
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- --run tests/public-content.test.ts`  
Expected: FAIL because the typed data modules do not exist.

- [ ] **Step 3: Implement the typed, sanitized data**

Define explicit TypeScript types. Include only: public name/English name, broad education direction, software/AI/engineering-data interests, GitHub handle, selected project descriptions, and reviewed external URLs. Keep project roles and statuses conservative; do not turn medium-confidence or future-plan records into completed claims.

Implement `scripts/audit-public-content.ps1` to fail when tracked public files contain the student ID, direct school email, birth-date pattern, `privacy: private`, `.env`, API-key patterns, or paths under `E:\humanknow`.

- [ ] **Step 4: Run content tests and audit**

Run: `npm test -- --run tests/public-content.test.ts`  
Run: `powershell -ExecutionPolicy Bypass -File scripts/audit-public-content.ps1`  
Expected: both pass and no private source path is copied into `src/` or `public/`.

- [ ] **Step 5: Commit**

```powershell
git add src/data tests/public-content.test.ts scripts/audit-public-content.ps1
git commit -m "feat: add reviewed public profile data"
```

### Task 3: Build the cinematic visual system and responsive shell

**Files:**
- Modify: `src/layouts/SiteLayout.astro`
- Modify: `src/pages/index.astro`
- Modify: `src/styles/global.css`
- Modify: `src/scripts/site.ts`
- Create: `src/components/SiteHeader.astro`
- Create: `src/components/ChapterMarker.astro`

**Interfaces:**
- Consumes: typed profile data from Task 2 and the Astro document shell from Task 1.
- Produces: a responsive shell with skip link, chapter navigation, dark/light theme, Chinese/English hooks, scroll progress, and a CSS/SVG high-tech visual layer.

- [ ] **Step 1: Write the structural test**

Extend `tests/smoke.test.ts` to assert that the built page contains `#profile`, `#journey`, `#builds`, `#signals`, `#contact`, a skip link, and a `prefers-reduced-motion` rule in the emitted CSS.

- [ ] **Step 2: Run the structural test to verify it fails**

Run: `npm test -- --run tests/smoke.test.ts`  
Expected: FAIL because the chapters and accessibility hooks are not present.

- [ ] **Step 3: Implement the design system**

Add theme tokens, fluid typography, editorial chapter numbering, grid/scanning-line background, gradient light fields, focus styles, `:focus-visible`, responsive breakpoints down to 320px, and reduced-motion fallbacks. Keep content layers above decorative layers and never encode essential meaning only with color.

- [ ] **Step 4: Implement the shell**

Add semantic `<header>`, `<nav>`, skip link, `<main>`, and `<footer>`. Use `aria-current` for the active chapter, native buttons for theme/language/menu controls, and `data-section` attributes for scroll progress. Keep navigation usable when JavaScript is disabled.

- [ ] **Step 5: Run checks and inspect the emitted HTML**

Run: `npm run check`  
Run: `npm run build`  
Run: `npm test -- --run tests/smoke.test.ts`  
Expected: all pass; emitted HTML has one `<main>`, one `<h1>`, no duplicate IDs, and no horizontal overflow-causing fixed width.

- [ ] **Step 6: Commit**

```powershell
git add src/layouts src/pages src/styles src/scripts src/components tests/smoke.test.ts
git commit -m "feat: add cinematic responsive site shell"
```

### Task 4: Implement the portfolio chapters and project detail pages

**Files:**
- Create: `src/components/HeroChapter.astro`
- Create: `src/components/JourneyChapter.astro`
- Create: `src/components/ProjectGrid.astro`
- Create: `src/components/SignalsChapter.astro`
- Create: `src/components/ContactChapter.astro`
- Create: `src/pages/projects/[slug].astro`
- Modify: `src/pages/index.astro`
- Modify: `src/scripts/site.ts`
- Modify: `src/styles/global.css`
- Modify: `tests/smoke.test.ts`

**Interfaces:**
- Consumes: `profile`, `experience`, and `projects` from Task 2; layout and theme utilities from Task 3.
- Produces: complete one-page portfolio, project filtering, accessible project detail pages, copy-email enhancement, and safe links to GitHub or reviewed demos.

- [ ] **Step 1: Write the chapter and route tests**

```ts
it('renders every public chapter and every project route', () => {
  const html = readFileSync('dist/index.html', 'utf8');
  expect(html).toContain('01 / PROFILE');
  expect(html).toContain('03 / BUILDS');
  for (const slug of ['personal-agent-knowledge-base', 'qldevicecheck', 'construction-cost-analyzer', 'cardcraft']) {
    expect(existsSync(`dist/projects/${slug}/index.html`)).toBe(true);
  }
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- --run tests/smoke.test.ts`  
Expected: FAIL because the chapters and generated project pages are not implemented.

- [ ] **Step 3: Implement the chapters**

Build the hero around a strong editorial headline and a clear CTA. Render the journey as a dated timeline with conservative wording. Render projects as filterable cards with technology labels, status text, and links. Render signals as reviewed capability evidence. Render contact with `hello@kaiseriii.me`, GitHub, and only confirmed public links; never render the school email.

- [ ] **Step 4: Implement project detail generation**

Use `getStaticPaths()` from the typed project dataset. Each detail page must include a title, summary, role, technology list, status, source/demo links, breadcrumbs, canonical metadata, and a link back to the homepage. Do not include unsupported claims or private source paths.

- [ ] **Step 5: Implement local interactions**

Add filter buttons with `aria-pressed`, copy-email feedback in an `aria-live="polite"` region, language strings for all visible UI labels, theme persistence in `localStorage`, and a reduced-motion branch that disables scroll animation.

- [ ] **Step 6: Run automated and browser checks**

Run: `npm run check`  
Run: `npm run build`  
Run: `npm test -- --run tests/smoke.test.ts tests/public-content.test.ts`  
Inspect at 1440px, 768px, and 360px widths; verify no clipped text, broken project links, keyboard traps, or console errors.

- [ ] **Step 7: Commit**

```powershell
git add src tests
git commit -m "feat: build portfolio chapters and project pages"
```

### Task 5: Add the local Caddy origin and repeatable Windows lifecycle

**Files:**
- Create: `ops/Caddyfile`
- Create: `scripts/start-site.ps1`
- Create: `scripts/stop-site.ps1`
- Create: `scripts/verify-site.ps1`
- Create: `docs/operations/local-publishing.md`
- Modify: `.gitignore`

**Interfaces:**
- Consumes: `dist/` from `npm run build`; local ports selected after read-only availability checks; the existing LangBot service remains outside this repository.
- Produces: `http://127.0.0.1:8080` for the public site and a documented local startup/stop/health workflow.

- [ ] **Step 1: Write the lifecycle test**

Create `scripts/verify-site.ps1` with checks for `dist/index.html`, Caddy availability, HTTP 200 from `http://127.0.0.1:8080/`, and absence of public knowledge-base routes in the Caddy configuration.

- [ ] **Step 2: Run the test to verify it fails**

Run: `powershell -ExecutionPolicy Bypass -File scripts/verify-site.ps1`  
Expected: FAIL because Caddy configuration and lifecycle scripts do not exist.

- [ ] **Step 3: Implement Caddy and lifecycle scripts**

Configure Caddy to serve only `dist/`, return `200` on `/healthz`, set safe static caching headers, and return `404` for unknown paths. `start-site.ps1` must build first, stop a previous process owned by this project, start Caddy with `ops/Caddyfile`, and print the local URL. `stop-site.ps1` must stop only the recorded project-owned process. Store PID and local state under an ignored `.local/` directory.

- [ ] **Step 4: Run local verification**

Run: `npm run build`  
Run: `powershell -ExecutionPolicy Bypass -File scripts/start-site.ps1`  
Run: `powershell -ExecutionPolicy Bypass -File scripts/verify-site.ps1`  
Run: `Invoke-WebRequest http://127.0.0.1:8080/healthz -UseBasicParsing`  
Expected: build succeeds, health returns HTTP 200, and `/kb`, `/api`, and arbitrary unknown paths do not expose the knowledge base.

- [ ] **Step 5: Commit**

```powershell
git add ops scripts docs/operations .gitignore
git commit -m "feat: add local Caddy publishing workflow"
```

### Task 6: Integrate Cloudflare Tunnel without exposing LangBot

**Files:**
- Create: `ops/cloudflared/config.example.yml`
- Create: `ops/cloudflared/README.md`
- Modify: `docs/operations/local-publishing.md`
- Modify: `.gitignore`

**Interfaces:**
- Consumes: the local Caddy origin on `127.0.0.1:8080`; the Cloudflare account and tunnel created by the user; the chosen registered domain.
- Produces: a documented ingress mapping for the public site and optional `lab` demo route, with no `kb` or private API route.

- [ ] **Step 1: Write route-safety checks**

Add a PowerShell check that parses the tracked example and rejects any ingress hostname containing `kb`, `api`, `admin`, or `localhost` as a public hostname. Include an explicit final catch-all `http_status:404` route in the example.

- [ ] **Step 2: Run the route-safety check to verify it fails**

Run: `powershell -ExecutionPolicy Bypass -File scripts/verify-site.ps1`  
Expected: FAIL until the example configuration contains an explicit public-only ingress list and catch-all denial.

- [ ] **Step 3: Add the safe example and operator instructions**

Document the exact public routes `kaiseriii.me`, `www.kaiseriii.me`, and `lab.kaiseriii.me` to `http://127.0.0.1:8080` or the separately documented demo port. Keep the real tunnel credentials and generated tunnel ID in an ignored local file. Document that the LangBot service stays bound to loopback or an authenticated private network and is never added to the public tunnel.

- [ ] **Step 4: Verify local configuration before any external tunnel action**

Run: `cloudflared tunnel ingress validate --config ops/cloudflared/config.example.yml`  
Run: `powershell -ExecutionPolicy Bypass -File scripts/verify-site.ps1`  
Expected: the example is syntactically valid and route-safety checks pass. Stop before creating a tunnel or DNS record until the user confirms the external action.

- [ ] **Step 5: Commit**

```powershell
git add ops/cloudflared docs/operations scripts/verify-site.ps1 .gitignore
git commit -m "feat: document protected Cloudflare ingress"
```

### Task 7: Configure the domain and inbound email forwarding

**Files:**
- Modify: `docs/operations/local-publishing.md`
- Create: `docs/operations/domain-email-checklist.md`

**Interfaces:**
- Consumes: the authenticated GitHub/Namecheap/Cloudflare sessions and the user's existing mailbox destination entered by the user at the provider page.
- Produces: a registered primary domain, DNS records pointing to the tunnel, and a tested `hello@kaiseriii.me` inbound forwarding alias; if the fallback is used, the alias becomes `hello@yuyue.me`.

- [ ] **Step 1: Verify candidate registration pages without submitting**

Open the GitHub Student Developer Pack and Namecheap redemption flow. Check `kaiseriii.me` first and `yuyue.me` second. Record the registrar-visible availability and renewal terms in the checklist without entering payment data or completing registration.

- [ ] **Step 2: Prepare exact DNS and email records**

Document the intended records: root and `www` for the public site, `lab` for the demo entry, and the provider-required MX/TXT records for inbound forwarding. Do not publish records until the domain is successfully registered and the user confirms the final DNS changes.

- [ ] **Step 3: Ask for action-time confirmation**

Before the final registration, DNS save, or email-routing save, tell the user the exact site/account, domain, records, and destination mailbox involved. Do not type the mailbox destination or complete registration without that confirmation.

- [ ] **Step 4: Verify the external result**

Run DNS lookups for `kaiseriii.me`, `www.kaiseriii.me`, and `lab.kaiseriii.me`; request `https://kaiseriii.me/healthz`; send a test message to `hello@kaiseriii.me` from a non-owner mailbox and verify receipt in the user's existing mailbox. If the registrar fallback is used, substitute `yuyue.me` consistently in these checks. Do not claim completion until all visible checks pass.

- [ ] **Step 5: Commit documentation only**

```powershell
git add docs/operations
git commit -m "docs: record domain and email operations"
```

### Task 8: Create the safe GitHub repository and CI workflow

**Files:**
- Create: `.github/workflows/ci.yml`
- Create: `README.md`
- Modify: `docs/operations/local-publishing.md`

**Interfaces:**
- Consumes: the locally verified site and the authenticated `KaiserIIII` GitHub account.
- Produces: a safe public source repository, a reproducible CI workflow, and a documented local-origin publishing procedure.

- [ ] **Step 1: Write the CI contract**

The workflow must run on pushes and pull requests, install from `package-lock.json`, run `npm run audit:public`, `npm run check`, `npm run build`, and `npm test -- --run`. It must not contain secrets or deploy credentials.

- [ ] **Step 2: Run the workflow commands locally**

Run: `npm ci`  
Run: `npm run audit:public`  
Run: `npm run check`  
Run: `npm run build`  
Run: `npm test -- --run`  
Expected: all pass before any repository publication.

- [ ] **Step 3: Add documentation and repository metadata**

Write a README describing the site, local startup, public/private boundary, and how to update reviewed content. Include no personal identifiers beyond the approved public profile.

- [ ] **Step 4: Ask for action-time confirmation and publish**

Before creating the remote repository or pushing source, show the exact repository name, visibility, and files that will be published. Use `KaiserIIII/kaiser-site` unless the user selects another name, then create the repository and push the local `main` branch.

- [ ] **Step 5: Verify CI and repository contents**

Confirm the remote repository shows the README and source, does not contain `.env`, `.local`, `dist`, private data, or knowledge-base storage, and has a passing CI run.

- [ ] **Step 6: Commit**

```powershell
git add .github README.md docs/operations
git commit -m "ci: add safe GitHub workflow and publishing guide"
```

### Task 9: Final verification, backup, and handoff

**Files:**
- Modify: `docs/operations/local-publishing.md`
- Create: `docs/operations/backup-and-recovery.md`
- Create: `docs/operations/public-release-checklist.md`

**Interfaces:**
- Consumes: the built site, local Caddy origin, tunnel, DNS, email forwarding, and GitHub CI result.
- Produces: evidence-backed release notes and a repeatable recovery path.

- [ ] **Step 1: Run the complete local verification**

Run: `npm ci`  
Run: `npm run audit:public`  
Run: `npm run check`  
Run: `npm run build`  
Run: `npm test -- --run`  
Run: `powershell -ExecutionPolicy Bypass -File scripts/start-site.ps1`  
Run: `powershell -ExecutionPolicy Bypass -File scripts/verify-site.ps1`

- [ ] **Step 2: Perform browser verification**

Check desktop and mobile widths, keyboard navigation, theme/language controls, project filters, project detail routes, copy-email feedback, reduced-motion behavior, console logs, and the absence of public knowledge-base access.

- [ ] **Step 3: Record backup and recovery**

Document which source files are backed up by Git, which local tunnel/Caddy files are ignored and must be backed up separately, how to rebuild `dist/`, and how to restart the existing LangBot service without changing its data directory.

- [ ] **Step 4: Complete the release checklist**

Record verified URLs, build commit, CI run, DNS status, email-forwarding test result, local service ports, and unresolved risks. Mark the site complete only when every required check has a fresh result.

- [ ] **Step 5: Commit**

```powershell
git add docs/operations
git commit -m "docs: add release and recovery verification"
```
