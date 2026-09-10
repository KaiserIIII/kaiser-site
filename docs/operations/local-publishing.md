# Local publishing

The public site is a static Astro build served by Caddy on this computer. The local LangBot knowledge base is a separate service and is not part of the public site origin.

## Prerequisites

- Node.js and npm
- Caddy available on `PATH`

Install Caddy using the official package for Windows, then open a new PowerShell window so the command is available.

## Start, verify, and stop

From the repository root:

```powershell
npm ci
powershell -ExecutionPolicy Bypass -File scripts/start-site.ps1
powershell -ExecutionPolicy Bypass -File scripts/verify-site.ps1
```

The site is available at `http://127.0.0.1:8080/`. The start script builds `dist/` when needed, records the project-owned Caddy PID under `.local/`, and writes logs under the same ignored directory.

Stop only this site's recorded process with:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/stop-site.ps1
```

The verification script checks the homepage health endpoint and confirms that `/kb`, `/api`, and an unknown route return `404`. It does not start or stop processes.

## Boundaries

`ops/Caddyfile` serves only the generated `dist/` directory. No knowledge-base data, uploaded documents, environment files, databases, or private API is copied into this repository or routed by Caddy. Keep the LangBot service bound to its existing private interface until a separate authenticated access design is reviewed.

## Rebuild after content changes

```powershell
npm run audit:public
npm run check
npm run build
powershell -ExecutionPolicy Bypass -File scripts/verify-site.ps1
```

If the site is already running, restart it after a build so the service picks up the new static output:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/stop-site.ps1
powershell -ExecutionPolicy Bypass -File scripts/start-site.ps1
```

## Troubleshooting

- If Caddy is missing, install it and reopen PowerShell.
- If port `8080` is busy, inspect the owning process before changing the port; the tunnel and verification configuration must be updated together.
- If the health check fails, inspect `.local/caddy-error.log` and validate the configuration with `caddy validate --config ops/Caddyfile --adapter caddyfile`.
