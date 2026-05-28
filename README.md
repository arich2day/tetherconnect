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
| `index.html` | Homepage — hero, problem framing, architecture, features, differentiators, CTA. |
| `product.html` | Product overview — pipeline components, enforcement modes, specs, competitive comparison. |
| `demo.html` | Six-screen interactive product tour with a working enforcement simulator. |
| `security.html` | Security architecture and posture. |
| `pricing.html` | Tier comparison and pricing model. |
| `company.html` | About the company. |
| `contact.html` | Contact info and demo-request form. |
| `privacy.html` / `terms.html` | Legal pages. |
| `shared.css` | Design system: tokens, nav, footer, buttons, badges, typography. |
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
