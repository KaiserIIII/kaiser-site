# Public release checklist

This checklist distinguishes locally verified work from external account actions that still require action-time confirmation.

## Local verification

- [x] Public data is manually reviewed and the public-content audit passes.
- [x] `npm ci` installs from the lockfile.
- [x] `npm run check` passes with no diagnostics.
- [x] `npm run build` emits the homepage and five project detail routes.
- [x] `npm test -- --run` passes.
- [x] Caddy config validates and listens on the loopback site origin.
- [x] `/healthz` returns 200.
- [x] `/kb`, `/api`, and unknown routes return 404.
- [x] Cloudflare example validates and has an explicit 404 catch-all.
- [x] Browser checks pass at 1440px, 768px, and 360px widths.
- [x] Project detail route, menu, language toggle, theme toggle, and project filter were exercised.
- [x] Browser console is clear after adding the local favicon.

## External actions — pending confirmation

- [ ] Register `kaiseriii.me`, or use `yuyue.me` if the registrar flow changes the availability result.
- [ ] Create the Cloudflare Tunnel and attach only the approved site hostnames.
- [ ] Save the provider-generated DNS records.
- [ ] Configure `hello@<registered-domain>` as inbound forwarding to the user's private mailbox.
- [ ] Create `KaiserIIII/kaiser-site` with the visibility explicitly approved by the user.
- [ ] Push the reviewed source and confirm CI passes.
- [ ] Send a test message to the public alias and verify receipt privately.

## Release record

```text
Build commit: 873d2d6 (latest locally verified code)
Local origin: http://127.0.0.1:8080/
Public domain: pending registration
Tunnel: pending creation
DNS: pending
Inbound email: pending
Remote repository: pending user confirmation
Known risk: the home computer and network must remain online for public availability.
```
