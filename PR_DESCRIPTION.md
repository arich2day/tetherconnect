# Transform the marketing site to lead with business value; move plumbing to a technical brief

## Summary

The previous build was honest but led with mechanism — it opened pages with *how it's wired* (ports, flags, `*.go:line` chips, the three-tier vocabulary) before it sold *what it does for the business*. This PR inverts that across every public page: each page now leads with the outcome and the one-line proof a skeptic accepts, and all implementation detail is consolidated into a single new, unlinked **`technical-brief.html`** that CTAs and contextual links point to ("Read the technical brief →").

No claim exceeds the built ceiling; no DO-NOT-CLAIM language was introduced; the design system (shared.css tokens, fonts, bordered-grid cards, wave-canvas hero, accessibility scaffolding) and the nav/footer structure are unchanged. Static site, no build step, demo interactivity preserved in vanilla JS.

The GTM messaging spine drove the rewrite: the AI-egress **governance gap** as the hero angle, five value propositions (see / govern / prove / no-backlash / stack-fit) each with a skeptic-grade proof line, the objection→answer pairs woven in, the pilot reframed as a near-zero-risk "prove it on your own data" lever, and **verifiability substituted for social proof** (we have no public customers, so we invite the buyer to check our claims).

## New page

- **`technical-brief.html`** — created. Unlinked (not in nav), `noindex`. The single destination for all stripped plumbing, presented as assets: the architecture SVG + stacked fallback, the per-request dataflow, the three-tier judge authority, the policy signing/verification chain, the judge + hardware tiers, the SIEM/SCIM/posture wiring with exact routes and signatures, the offline attestation chain (curl/openssl), the honest scope + full threat model (in/out of scope), and the per-tool coverage matrix. Every preserved citation points at a real line on `master` (see appendix). Nav/footer identical to the rest of the site.

## Page-by-page changes

### `index.html` (Home)
- Hero sub now leads with the **outcome** ("see, control, and prove what your developers send to AI tools — in your own cloud, without slowing them down, without a root cert on a single laptop"). Eyebrow → "The AI-egress governance gap." Dropped the Tier 0/1/2 vocabulary and the `~10s` propagation stat in favor of two trust one-liners (your cloud / no MITM cert).
- Replaced the raw proxy-log terminal (ports, 403, `blocklist.go`, SIEM event names) with a **BEFORE/AFTER risk + evidence card** — same terminal styling, value-legible content.
- Added a **cost-of-inaction** section (Audit / Breach / Deadline / the fix) — the old site stated the gap but never put stakes on it.
- Rewrote the "three capabilities" grid into the **five value propositions** (see / govern / prove / no-backlash / stack-fit), each with the GTM skeptic proof line, plus a sixth "for the champion" card linking to the technical brief. Stripped all `.js`/`.go` citation chips and the dense "five more BUILT" paragraph.
- CTA band reframed to the near-zero-risk pilot ("Free up to 25 seats, two weeks, in your own cloud… no Tether-side data to expunge").

### `how-it-works.html`
- Stays in nav; now **value-led**. Hero → "Governance over the AI channel. With near-zero developer friction."
- Replaced the architecture SVG, the per-request dataflow, the judge-authority tier grid, and the honest-scope tables (all plumbing) with: a "why this shape" outcome section, a **three-things** grid (proxy on the machine / control plane in your cloud / audit trail — each framed as an outcome), and a **"Will it slow my developers?"** section answering the friction objection (most pass / named risk blocks / a person decides in seconds).
- All deep machinery moved to the brief; contextual links added.

### `controls.html`
- Hero → "You set the policy floor. It's enforced the same way across the whole fleet."
- **Inverted all eight capability rows** so *why it matters* (value) leads and *what it does* supports. Stripped every citation chip, port, flag name (`bind_host`, `CloudJudgeCanBlock`), ms timeout, `blocklist.go`, hardware-tier names, and sample-rate internals → brief.
- Workspace-tier section reframed plainly ("visible and recorded now, enforced next"). JIT section reframed around "a risky moment, governed — without filing a developer ticket." Per-tool coverage **table replaced** with a value summary + link to the matrix in the brief.

### `integrations.html`
- Hero → "It extends the stack you already trust. No rip-and-replace."
- Every card now **leads with the outcome**, not the API route. Removed all `int-route` chips (`POST → <splunk-host>/…`, `GET /api/v1/…`) and citations → brief. SIEM/SSO/SCIM/posture/audit cards rewritten value-first; one "exact routes are in the technical brief" line per section.

### `pilot.html`
- Hero reframed to the conversion lever: "Prove it on your own data… free up to 25 seats, two weeks… `terraform destroy` if it doesn't deliver — no Tether-side data to expunge." (`terraform destroy` shell block kept as a trust signal.)
- **Replaced the "Out of scope — 5 things" confession block** with a single line ("we'll tell you the limits before we provision") + brief link; kept the Design Partner Program note.
- Stripped plumbing from "what you get" and the five-beat list (ports, `jackson.js`, `siem-adapters.js`, `demo-dry-run.js`, raw routes); reframed both value-first. Success criteria de-plumbed (dropped raw `POST /api/v1/…` routes). Coexistence map retained (it's value; home links to it); fixed its footnote link to point at the brief's honest-scope.

### `demo.html` (rebuilt)
- Rebuilt as a **value story** dramatizing the transformation: BEFORE (invisible, ungoverned channel) → AFTER (security sees it / policy governs the risky moment / operator decides in seconds / audit-ready evidence / "and it never left your cloud"). Five beats, each a value moment.
- Replaced every raw proxy-log SVG (403, `blocklist.go:138`, timeouts, SIEM event names) and the code-citation sidebars with **risk + evidence cards** and a **"What this means for you"** sidebar mapping each beat to a business outcome (risk made visible / governed without a ticket / dev stays unblocked / evidence produced / inside your own cloud) — never to a code module. Promoted the operator JIT console (the most value-legible asset).
- **Kept the interactive simulator's interaction model** (scenario × mode, vanilla JS, no build) but reskinned its output from raw proxy-log lines to a BEFORE/AFTER risk/outcome/evidence card ("a customer record was about to leave → blocked & recorded → a signed receipt your auditor pulls"). "Read the technical brief →" link added for the machinery.

### `security.html` (mostly kept)
- Kept the no-MITM stance, per-tenant isolation, data residency, design principles, in-scope threat rows, disclosure policy, and hedged compliance-evidence framing.
- Moved the `main.go:1-22` source-comment block, the curl/openssl attestation block, and the threat-model **out-of-scope rows** to the brief (replaced in place with value framing + brief links). Stripped the `.go:line` citation chips from the design-principle cards. Re-pointed the old `how-it-works.html#judge-authority` link to the brief.

### `pricing.html`
- **Removed the "Multi-tenant SaaS Overwatch — post-GA" SKU line** (sold a v1-nonexistent capability). Kept the honest **customer-supplied-judge** framing ("Tether bills nothing for judge calls") and the free-25-seat pilot.
- Hero reframed to predictable, stack-extending governance. Reconciled the pilot wording with `pilot.html` (two-week, free up to 25 seats, `terraform destroy` at day 14). Softened `Ollama`/internal-doc references to plain language.

### `about.html` (kept)
- Unchanged per the mandate — the narrative, the "govern the channel, don't surveil the developer" thesis, and the patent-review honesty quote are strong trust assets. Nav/footer already consistent.

## Voice & guardrails
- One author voice throughout: measured, second person for problem/outcome/trial framing, third person only for mechanism. Active voice, present tense; numbers where we have them, em-dash where we don't.
- No banned buzzword stacking; no DO-NOT-CLAIM language; no claim beyond the built ceiling. No fabricated customers, logos, or metrics — verifiability is offered in place of social proof.

---

## Appendix — Claims-to-code

Every BUILT-capability statement that remains on a public page is backed by a citation preserved verbatim from the prior source and now centralized in `technical-brief.html`. Public pages state the *value*; the brief carries the *proof*. Citations below are reused from the existing source — none were invented.

| Capability (claim on site) | Path:line (on `arich2day/project-tether@master`) | Where it's claimed |
|---|---|---|
| Loopback proxy bind / agent dials proxy | `warden/cmd/proxy/main.go:98-103` | brief §02 |
| No TLS interception / no CA injection | `warden/cmd/proxy/main.go:1-22` | brief §08, security |
| Tier 0 deterministic floor (request path) | `warden/cmd/proxy/proxy_core.go:114-117` | brief §02, §03 |
| Tier 0 blocklist match | `warden/cmd/proxy/blocklist.go:138` | brief §03 |
| Tier 1 sync judge (opt-in) | `warden/cmd/proxy/proxy_core.go:130` | brief §02, §03 |
| Tier 1 fail-closed on timeout | `warden/cmd/proxy/proxy_core.go:158-181` | brief §02 |
| Tier 2 async advisory (cannot block) | `warden/cmd/proxy/proxy_core.go:183-188` | brief §02 |
| Async path has no handle on sent response | `warden/cmd/proxy/proxy_core.go:245` | brief §03 |
| Three-tier authority model (doc) | `docs/JUDGE_AUTHORITY.md` | brief §01, §03 |
| Ed25519 policy signing (control plane) | `overwatch/api/policy-signing.js:122-150` | brief §04 |
| Policy verification before apply (proxy) | `warden/cmd/proxy/policy_signing.go:171-203` | brief §04 |
| Policy client / 10s poll | `warden/cmd/proxy/policy_client.go:26` | brief §04 |
| Fail-closed on signature mismatch | `warden/cmd/proxy/policy_client.go:185-188` | brief §04 |
| Hardware-adaptive judge selection | `warden/cmd/proxy/judge_selector.go:76-93` | brief §05 |
| SIEM fan-out entrypoint | `overwatch/api/siem-adapters.js:36` | brief §06 |
| Splunk HEC adapter | `overwatch/api/siem-adapters.js:267-282` | brief §06 |
| Microsoft Sentinel adapter (HMAC Log Analytics) | `overwatch/api/siem-adapters.js:290-312` | brief §06 |
| Syslog RFC 5424 adapter | `overwatch/api/siem-adapters.js:333-355` | brief §06 |
| Outbound HMAC-signed webhooks | `overwatch/api/webhook-store.js:174-240` | brief §06 |
| SSO via Jackson (SAML/OIDC) | `overwatch/api/auth-providers/jackson.js` | brief §06 |
| SCIM directory sync / role-from-groups | `overwatch/api/auth-providers/jackson.js:205-291` | brief §06 |
| Posture export — Tether-native | `overwatch/api/posture-export.js:79-101` | brief §06 |
| Posture export — Okta Device Trust | `overwatch/api/posture-export.js:111-135` | brief §06 |
| Posture export — Microsoft Graph managedDevice | `overwatch/api/posture-export.js:145-172` | brief §06 |
| Posture export — CSV (RFC 4180) | `overwatch/api/posture-export.js:177-212` | brief §06 |
| Posture export endpoint surface | `overwatch/api/posture-export.js:217-228` | brief §06 |
| JIT decision (workspace daemon) | `warden/cmd/workspace/main.go:349-402` | brief §06 |
| Access-request backend | `overwatch/api/server.js` | brief §06 |
| MCP escalation surface | `warden/cmd/proxy/mcp.go:401-426` | brief §06 |
| Cooperative MCP scope | `warden/cmd/proxy/mcp.go` | brief §08 |
| Append-only policy audit | `docs/PILOT.md` | brief §06 |
| Per-request attestation / `X-Tether-Policy-Version` | `docs/ATTESTATION.md` | brief §02, §07 |
| Architecture / deploy model | `deploy/README.md` | brief §01 |

**Citations pending repo access:** none — every BUILT claim retained on a public page maps to a citation already present in the prior source and re-centralized in the brief. No new line numbers were invented; where a claim could not be tied to a specific line in the prior source, it was kept as conceptual value language rather than asserting a citation.

https://claude.ai/code/session_01U4egp9pL2VjsrsVAPS2PdE
