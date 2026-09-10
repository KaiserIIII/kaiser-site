# Cloudflare Tunnel boundary

This directory contains a tracked, credential-free route example. The only public hostnames approved by this project are:

- `kaiseriii.me`
- `www.kaiseriii.me`
- `lab.kaiseriii.me`

All three hostnames terminate at the local Caddy origin on `http://127.0.0.1:8080`. The final ingress entry is an explicit `http_status:404` catch-all. There is no route for the local LangBot knowledge base, its API, uploaded documents, or an administrative endpoint.

## Local preparation

After the domain and Cloudflare account are ready, copy `config.example.yml` to a private local file such as `.local/cloudflared/config.yml`. Replace only the tunnel UUID and credential path. Keep the copied file and credentials outside Git.

Validate the tracked example before creating any external route:

```powershell
cloudflared tunnel --config ops/cloudflared/config.example.yml ingress validate
powershell -ExecutionPolicy Bypass -File scripts/verify-site.ps1
```

The real tunnel is run locally with:

```powershell
cloudflared tunnel --config .local/cloudflared/config.yml run
```

Creating the tunnel, attaching DNS hostnames, and changing public DNS are external account actions. Do not run them until the exact domain and records have been reviewed immediately before submission.

## Hard boundary

Do not add a hostname containing `kb`, `api`, `admin`, or `localhost`. Do not change the service target to the LangBot port. Keep the knowledge base local or behind a separately authenticated private network.
