# KAISER _III

KAISER _III is a cinematic, high-technology personal portfolio for 于越 / Yue Yu. It presents a reviewed public profile, an engineering-and-AI journey, selected builds, capability signals, and a contact point in one responsive static site.

## Local development

Requirements: Node.js, npm, and Caddy.

```powershell
npm ci
npm run dev
```

For the production-shaped local origin:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/start-site.ps1
powershell -ExecutionPolicy Bypass -File scripts/verify-site.ps1
```

The site is served at `http://127.0.0.1:8080/`. Stop it with `scripts/stop-site.ps1`. The tracked Cloudflare example in `ops/cloudflared/` exposes only approved site hostnames and never the local knowledge base.

## Public-content boundary

Only reviewed public information belongs in `src/data/`, `src/components/`, and `public/`. The repository must never contain student IDs, direct school mailboxes, birth dates, family information, grades or rank, raw communications, API keys, environment files, uploaded documents, databases, or knowledge-base storage.

Before changing public content, run:

```powershell
npm run audit:public
npm run check
npm run build
npm test -- --run
```

The public email shown by the site is an inbound alias. Its private forwarding destination is configured manually at the provider and is not stored here.

## Publishing model

Astro emits a static `dist/` directory. Caddy serves that directory on the home computer; a separately authenticated Cloudflare Tunnel may expose only the site hostnames. Domain registration, DNS, email forwarding, and any public repository creation remain explicit operator actions described in `docs/operations/`.
