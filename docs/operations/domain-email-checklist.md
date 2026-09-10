# Domain and email checklist

Status: preparation only. No domain registration, DNS save, or mailbox-routing change has been submitted by this repository.

## Candidate order

1. Primary: `kaiseriii.me`
2. Fallback: `yuyue.me`

Availability and student-offer eligibility must be confirmed in the authenticated registrar flow immediately before registration. A search result is not a reservation.

## Intended public names

- Website: `https://<registered-domain>/`
- Optional aliases: `www.<registered-domain>` and `lab.<registered-domain>`
- Inbound alias: `hello@<registered-domain>`

The first implementation uses `hello@kaiseriii.me` in the reviewed public site. If the fallback is registered, update the site metadata and content in one reviewed change before publishing.

## External action gate

Before the final button is pressed, record and show the following exact values:

- Registrar and signed-in account: confirmed by the user
- Domain being registered: `kaiseriii.me` or `yuyue.me`
- Registration term and renewal price: read from the final checkout page
- DNS provider: the authenticated Cloudflare account selected by the user
- Tunnel hostnames: root, `www`, and `lab` for the registered domain
- Mail forwarding destination: entered by the user directly in the provider form; never copied into this repository or chat
- Confirmation: pending until the user explicitly approves the exact registration, DNS, and routing actions

Do not enter payment details, submit registration, save DNS records, or save email routing before this gate is reviewed.

## DNS shape after registration

Cloudflare Tunnel should create or manage the public hostname records. Use the tunnel-generated target rather than an exposed home IP. The exact CNAME target and any required TXT verification value are provider-generated and must be copied from the authenticated dashboard.

The intended public hostnames are:

```text
<registered-domain>       -> Cloudflare Tunnel public hostname
www.<registered-domain>   -> Cloudflare Tunnel public hostname
lab.<registered-domain>   -> Cloudflare Tunnel public hostname
```

Do not add records for the LangBot port, `/kb`, `/api`, uploaded documents, or administrative services.

## Inbound forwarding shape

The v1 mail design is receive-only forwarding:

```text
hello@<registered-domain> -> user's existing mailbox
```

Use the provider's exact MX/TXT values. The destination mailbox remains private and is entered manually in the provider UI. Local SMTP, outbound sending, mailbox exports, and mail storage are out of scope for v1.

## Verification after approval

After the external changes are complete, verify all of the following before calling the setup complete:

```powershell
Resolve-DnsName <registered-domain>
Resolve-DnsName www.<registered-domain>
Resolve-DnsName lab.<registered-domain>
Invoke-WebRequest https://<registered-domain>/healthz -UseBasicParsing
```

Send a test message from a non-owner mailbox to `hello@<registered-domain>` and verify receipt in the private destination mailbox. Do not record the message body or destination address in this repository.
