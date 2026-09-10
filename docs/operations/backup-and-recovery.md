# Backup and recovery

## What Git protects

The repository protects the reviewed public source, Astro configuration, Caddy/Tunnel examples, quality gates, and operating documentation. Rebuild the generated output instead of backing up `dist/` as a source of truth:

```powershell
npm ci
npm run audit:public
npm run check
npm run build
```

Keep a second copy of the Git repository or a remote repository only after its visibility and contents have been reviewed.

## What must stay private

The ignored `.local/` directory can contain Caddy PID/log files and the real Cloudflare Tunnel configuration. Back up the real tunnel config and credential JSON through a private, encrypted method. Never commit them, paste them into chat, or put them in `public/`.

The existing LangBot knowledge base has its own data directory and recovery process. Back it up separately according to that application's procedure; do not copy its databases, indexes, uploads, environment files, or raw documents into this site repository.

## Recovery sequence

1. Restore the repository to a reviewed commit.
2. Install the pinned lockfile dependencies with `npm ci`.
3. Run `npm run audit:public`, `npm run check`, and `npm run build`.
4. Restore the private local Tunnel config under `.local/cloudflared/config.yml`.
5. Start Caddy with `scripts/start-site.ps1` and run `scripts/verify-site.ps1`.
6. Start the Cloudflare Tunnel only after checking its route list against `ops/cloudflared/config.example.yml`.
7. Check the public health URL and inbound mail alias.

If the computer is replaced, do not expose the knowledge base while restoring the portfolio. Bring up the static site first, then restore private services separately.
