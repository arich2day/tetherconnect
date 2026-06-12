# Tether Connect — Marketing Site

Static marketing site for [Tether Connect](https://www.tetherconnect.app), the endpoint-native AI security platform.

## Live URLs

- Primary: <https://www.tetherconnect.app>
- Apex `https://tetherconnect.app` 301-redirects to `www.` via GoDaddy domain forwarding.

## Stack

- Plain HTML + CSS, no build step.
- One shared stylesheet (`shared.css`) plus per-page `<style>` blocks for page-specific layouts.
- Vanilla JS in `demo.html` for the interactive tour.
- Hosted on **GitHub Pages** from the `gh-pages` branch.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Beat 1 — the reality today + headline + 3 strongest selling points + CTA. |
| `how-it-works.html` | Beat 3 — architecture diagram, dataflow, three-tier judge authority, honest scope. |
| `controls.html` | Beat 2 + Beat 4 sub-notes — BUILT capabilities with "what it does today / why it matters". |
| `integrations.html` | Beat 3 — SIEM (Splunk HEC, Sentinel, syslog), SCIM via Jackson, posture export (Tether / Okta / Entra / CSV), HMAC webhooks. |
| `pilot.html` | Beat 5 — what you get, day-by-day, success criteria, out-of-scope, EDR/CASB/IdP/DLP table, `terraform destroy` unwind. |
| `demo.html` | The five-beat developer-loop story with "What you just saw" sidebars + interactive simulator. |
| `security.html` | Cryptography, per-tenant isolation, no-MITM-CA, three-tier authority, attestation, threat model, disclosure policy. |
| `pricing.html` | SKU table sourced from `Tether_Company_Assets/investor-pitch/PRICING.md`. |
| `about.html` | "Why we built Tether" — the moment, founders, what we believe, 90–180 day cut. |
| `contact.html` | Contact info and walkthrough form. |
| `privacy.html` / `terms.html` | Legal pages. |
| `shared.css` | Design system: GLC tokens layered on existing Tether vars. IBM Plex stack. 1px default rules. |
| `CNAME` | GitHub Pages custom domain (`www.tetherconnect.app`). |

## Design System

Defined in `shared.css` under `:root`. Quick reference:

- **Surface**: cream (`--bg: #f0ebe3`, `--surface: #f7f3ee`).
- **Ink**: near-black (`--ink: #1a1612`).
- **Accent**: brand red `--red: #c8001e` — used for italic headline emphasis (`<em>`), eyebrow underlines, and `badge-red` / `btn-red`.
- **Fonts**: IBM Plex Sans (body), IBM Plex Sans Condensed (uppercase headlines), IBM Plex Mono (labels, terminals).
- **Edges**: 2px borders, no rounded corners. Editorial / industrial feel.

Reusable utilities: `.btn-primary`, `.btn-secondary`, `.btn-red`, `.btn-primary-inv`, `.btn-outline-inv`, `.badge` + `.badge-red/green/amber/blue/ink/muted`, `.section-label`, `.section-title`, `.page-hero`, `.wrap`.

## Local Development

It's just HTML — open any page directly in a browser, or serve the directory:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

Relative links between pages assume the files sit at the same path.

## Deployment

GitHub Pages serves directly from the `gh-pages` branch. Any commit landed on `gh-pages` auto-deploys within a minute or two.

Workflow:

1. Create a feature branch from `gh-pages`.
2. Open a PR against `gh-pages`.
3. Merge — Pages picks it up automatically.

The `CNAME` file is managed by GitHub Pages and gets auto-committed when the custom domain is changed via Settings → Pages.

### DNS (GoDaddy)

- `www CNAME arich2day.github.io.` — primary record for the site.
- Apex `tetherconnect.app` — four A records to GitHub Pages (`185.199.108-111.153`) plus GoDaddy Domain Forwarding (301 → `https://www.tetherconnect.app`).

## Contact

`alvin@tetherconnect.app` · +1 (202) 790-4956
