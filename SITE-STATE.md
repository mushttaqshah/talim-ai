# Talim AI — Current Site Architecture Snapshot

> **Purpose:** Quick reference for the current state of index.html and connected services. So future Claude doesn't need to re-fetch and re-read 3500 lines of HTML to get oriented. Pair with `PROGRESS.md` for what to do next.

**Last verified:** 2026-05-29
**Current index.html size:** ~3600 lines, single-page-app style + floating chat widget

> ⚠️ Older details below predate the Worker, CV/Gemini, chat widget, and content hub. See the **"ARCHITECTURE UPDATE (2026-05-29)"** block at the bottom for the accurate current map.

---

## 🌐 Live URLs

| URL | What it serves |
|---|---|
| `https://talimai.tech/` | Home page (default route) |
| `https://www.talimai.tech/` | Redirects to apex |
| `https://talimai.tech/robots.txt` | Live, AI-friendly |
| `https://talimai.tech/sitemap.xml` | Live, references homepage anchors (will need real URLs in Phase 3) |
| `https://talimai.tech/BingSiteAuth.xml` | Bing verification |
| `https://talimai.tech/google3bc09efeaceb49c1.html` | Google verification |

---

## 📁 Repo files (mushttaqshah/talim-ai)

```
├── CNAME                       (talimai.tech)
├── README.md
├── BingSiteAuth.xml            (Bing verification)
├── google3bc09efeaceb49c1.html (Google verification)
├── index.html                  (the entire site, ~3500 lines)
├── robots.txt                  (AI crawler friendly)
└── sitemap.xml                 (anchors, needs real URLs in Phase 3)
```

**Missing files to create in Phase 2C:**
```
├── og-image.png         (1200x630 social share — referenced line 21)
├── favicon-32x32.png    (referenced line 34)
├── favicon-16x16.png    (referenced line 35)
└── apple-touch-icon.png (180x180 — referenced line 36)
```

---

## 🏗️ index.html structure

### `<head>` (lines 1-1419)

In this exact order:
1. Meta charset, viewport, title, description, keywords, author, robots
2. Canonical URL
3. Open Graph tags (og:type, site_name, locale, title, description, url, image, alt, width, height)
4. Twitter Card tags
5. Favicon link tags (files don't exist yet)
6. `theme-color: #0E3B2A` (forest green)
7. **Sentry loader script** (added Session 7, loads early)
8. Admin/setup notes comment block
9. Google Fonts preconnect + Fraunces/Manrope/Noto Nastaliq Urdu stylesheet
10. **Pageclip CSS** (form spinner styling)
11. PDF.js + Mammoth.js libraries (for CV Analyzer's client-side parsing)
12. ~3000 lines of `<style>` (entire site CSS inlined)
13. 4 JSON-LD structured data blocks: Organization, SoftwareApplication, WebSite, FAQPage

### `<body>` (lines 1420-3408)

**Top-level structure:**
```
<nav class="main-nav">              — sticky, blurred-backdrop nav
  └── 7 nav links + Register CTA

<div class="page active" id="page-home">
  ├── Hero (with Islamic pattern SVG ornament)
  ├── Standards strip (NBEAC, AACSB, HEC, NSCT, HEDP)
  ├── Problem section
  ├── How it works (3 steps)
  ├── Product (3 pillars: Accreditation / Faculty Intel / AoL)
  ├── Resources (9 cards: HEC, NBEAC, AACSB, HEDP, PSEB, SECP, FBR, e-portal)
  ├── Video section (YouTube embed — placeholder ID!)
  ├── Student section
  ├── Insights (12 article cards — link to anchors below)
  ├── Knowledge Library (12 inline <details> articles)
  ├── Founder section (text "M" as placeholder photo)
  ├── Partners section (6 empty "Cohort 1" slots)
  ├── FAQ (6 questions, accordion JS)
  └── CTA section with Pageclip contact form

<div class="page" id="page-analyzer">
  └── CV Analyzer (upload zone + results display + Claude API call)

<div class="page" id="page-services">
  ├── Audience tabs (HEI / Org / Student)
  └── 3 pricing tiers per audience (9 tier cards total)

<div class="page" id="page-register">
  └── 5-step Pageclip-powered registration form

<footer>
  └── Brand, social links (5 placeholder #), product/resources/contact columns

<script>
  ├── showPage() / scrollToSection() routing
  ├── Pageclip form event handlers
  ├── FAQ accordion
  ├── CV Analyzer (PDF parsing, DOCX parsing, Anthropic API call, results rendering)
  ├── Services audience switcher
  └── Register multi-step form logic

<script src="pageclip.js">           — Pageclip CDN
<script src="simpleanalytics">       — analytics tracker
<noscript>                            — analytics fallback
```

---

## 🎨 Design system

| Token | Value | Use |
|---|---|---|
| `--cream` | `#F5F1E8` | Page background |
| `--cream-deep` | `#EEE7D6` | Section alternate bg |
| `--cream-warm` | `#F9F5EC` | Card bg |
| `--ink` | `#1A1F1A` | Main text |
| `--forest` | `#0E3B2A` | Brand primary, CTAs |
| `--forest-deep` | `#072017` | Hover state |
| `--gold` | `#C49A4C` | Accent |
| `--terracotta` | `#B0623E` | Warning/highlight |

**Fonts:** Fraunces (serif headings, opsz variable), Manrope (sans body), Noto Nastaliq Urdu (Urdu text)

**Pattern:** Islamic geometric pattern SVG as hero/student ornament

---

## 🔌 Integrated services

| Service | Status | Where it shows up in code |
|---|---|---|
| **Cloudflare** | 🟢 Active | DNS / SSL / proxy / AI crawler control |
| **GitHub Pages** | 🟢 Active | Serves from main branch |
| **Cloudflare Worker** | 🟢 LIVE | `talimai-register` — handles `talimai.tech/api/*` (register + subscribe + health + leads) |
| **Notion CRM** | 🟢 Connected | DB `723ff589df9c4385a35ee460ce94f1f7` — receives leads via Worker |
| **Cloudflare KV** | 🟢 Active | `LEADS_KV` — backs up every submission (1yr TTL) |
| **SimpleAnalytics** | 🟢 Tracking | Script before `</body>` |
| **Sentry** | 🟢 Tracking | Loader script in `<head>` (key `f397870fe2b73828a29ea635ae32d177`) |
| **Imgbot** | 🟢 Active | GitHub App on repo |
| **Pageclip** | ⚫ Removed | Replaced by Cloudflare Worker (scripts deleted from index.html) |
| **Google Search Console** | 🟢 Verified | Sitemap submitted |
| **Bing Webmaster Tools** | 🟢 Verified | Sitemap submitted |
| **Resend (email alerts)** | 🔒 Not set up | Worker supports it — needs RESEND_API_KEY + NOTIFY_EMAIL secrets |
| **Anthropic API** | ⚠️ Broken in prod | CV Analyzer calls directly — needs backend proxy (Phase 5) |

---

## ⚠️ Placeholder values that need real replacements

| Where | What | Fix path |
|---|---|---|
| Line ~2948 footer | 5 social `href="#"` (LinkedIn, X, Instagram, YouTube, Facebook) | Replace with real URLs |
| Hero video section | YouTube ID `dQw4w9WgXcQ` (Rick Roll) | Upload real walkthrough, replace ID |
| Register page success | WhatsApp `+92-XXX-XXXXXXX` | Add real number |
| Footer link | `hello@talim.ai` | Change to `hello@talimai.tech` (matches mailto: in services note) |
| Founder section | Letter "M" as photo placeholder | Upload founder photo, replace CSS-rendered letter |
| Partners section | 6 "Cohort 1" empty slots | Replace with real partner logos when confirmed |

---

## 🛠️ Pricing tiers in current site

### HEI / Universities
- NBEAC Essentials — PKR 150,000/year
- AACSB Ready (featured) — PKR 400,000/year
- Enterprise — Custom

### Partner Organizations
- Bronze — PKR 50,000/year
- Silver (featured) — PKR 150,000/year
- Gold — PKR 400,000/year

### Students
- CV Pro Review — PKR 2,500 one-time
- Scholarship Mentorship (featured) — PKR 25,000 per application
- Career Compass — PKR 75,000 / 3 months

(All these are reflected in JSON-LD `SoftwareApplication` schema too)

---

## 📞 Contact / Brand references in site

- Email used in code: `hello@talimai.tech` (services note + sample text)
- Email in footer (inconsistent): `hello@talim.ai`
- Founder: Mushtaq Shah
- Affiliations cited: Bahria Business School (BBS-IC) Islamabad, NUST MS Agribusiness, PepsiCo Roshan Kal Internship
- Languages: English (en-PK) + Urdu (ur-PK)

---

## 🔄 ARCHITECTURE UPDATE (2026-05-29) — current truth

✅ DEPLOYED & LIVE as of 2026-05-29 — all files below are committed to the repo and serving on talimai.tech.

### Live URLs (updated)
| URL | What it serves |
|---|---|
| `https://talimai.tech/` | Home (SPA: home/services/analyzer/register routes) + chat widget |
| `https://talimai.tech/opportunities/` | **SEO content hub** (real page) — 6 categories, featured guides |
| `https://talimai.tech/opportunities/kamyab-jawan-business-loan/` | Guide (Article+HowTo+FAQ+Breadcrumb schema) |
| `https://talimai.tech/opportunities/pmyp-laptop-scheme/` | Guide (Article+HowTo+FAQ+Breadcrumb schema) |
| `https://talimai.tech/api/health` | Worker health → notion/kv/cv_analyzer/chat status |
| `https://talimai.tech/api/{register,subscribe,cv-analyze,chat,leads}` | Worker endpoints |

### Repo files (updated)
```
├── CNAME, README.md, robots.txt
├── BingSiteAuth.xml, google3bc09efeaceb49c1.html
├── index.html                  (SPA + chat widget; nav has "Opportunities"; forms→Worker; analyzeCv→Worker)
├── sitemap.xml                 (now: home + 3 hub URLs — REAL urls, not anchors)
├── og-image.png, favicon-16x16.png, favicon-32x32.png, apple-touch-icon.png, favicon.ico   ✅ added
└── opportunities/
    ├── hub.css                 (shared brand stylesheet for all hub pages)
    ├── index.html              (hub landing)
    ├── kamyab-jawan-business-loan/index.html
    └── pmyp-laptop-scheme/index.html
```
NOTE: the Worker (`worker.js`) is deployed in Cloudflare, not the Pages repo.

### index.html — what changed
- **Nav:** added `<a href="/opportunities/">Opportunities</a>` (real link, not SPA route).
- **CV Analyzer:** `analyzeCv()` POSTs `{cv_text}` to `https://talimai.tech/api/cv-analyze` (prompt lives in Worker). No Anthropic client calls remain.
- **Forms:** contact→`/api/subscribe`, register→`/api/register` via fetch() (+honeypot `company_url`). Pageclip gone.
- **Chat widget (NEW):** floating FAB + panel near `</footer>`; CSS before `</style>`; JS at end of main `<script>`. Calls `/api/chat` with full `chatHistory`. Brand-styled, English/Urdu/Hinglish, mobile full-screen, honest "AI assistant" disclaimer + WhatsApp.
- Design tokens unchanged (forest/cream/gold; Fraunces/Manrope/Noto Nastaliq Urdu).

### Cloudflare Worker (`talimai-register`) — endpoints
`/api/register`, `/api/subscribe`, `/api/cv-analyze` (Gemini), `/api/chat` (Gemini multi-turn), `/api/health`, `/api/leads?key=ADMIN_KEY`.
Secrets: `NOTION_TOKEN`, `DATABASE_ID`, `GEMINI_API_KEY` (set). Optional: `RESEND_API_KEY`, `NOTIFY_EMAIL`, `ADMIN_KEY`.
Health JSON: `{ok, notion, kv_backup, email, cv_analyzer, chat}`. KV namespace `LEADS_KV` bound.

### Content hub design system
All `/opportunities/` pages share `hub.css`: components include `.site-header`, `.breadcrumb`, `.hub-hero`, `.cat-grid/.cat-card`, `.guide-list/.guide-card`, `.glance` (forest "at a glance" box), `.steps` (numbered circles), `.official` (gold-bordered source callout), `.faq` (`<details>`), `.talim-cta`, `.disclaimer`, `.site-footer`. To add guides/sources see **CONTENT-HUB-PLAN.md** (template + repeatable process).

---

## 🔄 ARCHITECTURE UPDATE (2026-05-29, evening) — Admin CMS + Visual Editor + Founder SEO

### New files
```
├── founder-mushtaq-shah.jpg     (founder photo, 4:5, used in About section + Person schema)
├── admin/
│   ├── index.html               (Admin Control Panel dashboard — noindex; tabs: New Guide, Edit Site, Pages & Files, Media, Stats, Leads, Help)
│   └── editor.js                (Visual Edit Mode — loaded on any page via ?edit=1)
```

### index.html changes
- About section: `.founder-photo` now contains `<img src="/founder-mushtaq-shah.jpg" ...>` (CSS `.founder-photo img{object-fit:cover}` added); label "Founder & CEO"; bio name bolded.
- JSON-LD: 5 blocks now — **Person** (#founder, with alternateName, jobTitle, sameAs→LinkedIn, image, alumniOf), **Organization** (#organization, founder→#founder), WebSite, SoftwareApplication, FAQPage.
- Before `</body>`: tiny script = analytics beacon (`POST /api/track`) + visual-editor loader (`if location.search has edit=1 → load /admin/editor.js`).

### Cloudflare Worker — admin & analytics endpoints (in worker.js)
Config consts: `GITHUB_OWNER=mushttaqshah`, `GITHUB_REPO=talim-ai`, `GITHUB_BRANCH=main`.
Secrets: `GITHUB_TOKEN` (fine-grained PAT, Contents R/W), `ADMIN_KEY` (dashboard password). Plus existing NOTION_TOKEN, DATABASE_ID, GEMINI_API_KEY.
- Public: `POST /api/track` — increments `stats:agg` in KV (total/days/pages).
- Admin (all require header `X-Admin-Key`, brute-force limited):
  - `POST /api/admin/login`
  - `GET  /api/admin/tree` — list editable files
  - `GET  /api/admin/file?path=` · `PUT /api/admin/file` · `DELETE /api/admin/file`
  - `POST /api/admin/new-guide` — generate SEO guide HTML + add to sitemap
  - `POST /api/admin/search` — find text across files
  - `GET  /api/admin/history?path=` · `GET /api/admin/file-at?path=&sha=` — version history + restore
  - `POST /api/admin/upload` — image/binary upload (base64)
  - `GET  /api/admin/stats` — views + leads aggregates
  - `POST /api/admin/save-regions` — apply visual-editor text/image edits (unique-match only; ambiguous skipped)
- Helpers added: `encodeB64/decodeB64` (UTF-8, chunked), `githubApi`, `ghGetFile(env,path,ref)`, `ghPutFile`, `ghDeleteFile`, `ghPutRaw` (binary), `adminKeyValid`, `buildGuideHtml`.
- Health JSON now: `{ok, notion, kv_backup, email, cv_analyzer, chat, admin}`.
- CORS updated to allow `X-Admin-Key` header + PUT/DELETE.

### Visual editor (editor.js) behaviour
Loaded only with `?edit=1`. Prompts for admin password (stored in sessionStorage). Makes leaf text elements `contenteditable` (paste-as-plain-text) and images click-to-replace (uploads via `/api/admin/upload`). On Save → `POST /api/admin/save-regions` with `{path, changes:[{old,new}], imageChanges:[{old,new}]}`. Worker maps URL path→file, replaces each `old` only if it occurs exactly once (safe), commits once. Free-form drag / section reordering NOT included.

### Stats (Stats tab)
Reads `/api/admin/stats`. Shows total/today/7-day views, leads count, 14-day CSS bar chart, top pages. Source = own KV counter (`stats:agg`) via the `/api/track` beacon. Low-traffic safe; counts from deploy date.

---

## CURRENT STATE (2026-06-06) — full file & page inventory

### Site pages live/ready (GitHub Pages → talimai.tech)
```
/                                          index.html  (homepage: multimodal CV Analyzer, chat widget, founder section, 5 JSON-LD blocks, beacon+editor loader)
/about/                                    about/index.html  (founder Person page, @graph 5 entities, visible FAQ)
/admin/                                    admin/index.html + admin/editor.js  (self-service CMS, noindex)
/opportunities/                            opportunities/index.html  (hub — 5 active categories)
/opportunities/                            opportunities/hub.css  (shared styling for all guide pages)
/opportunities/kamyab-jawan-business-loan/         Loans
/opportunities/pmyp-laptop-scheme/                 Skills/Education
/opportunities/hec-need-based-scholarship/         Scholarships
/opportunities/navttc-free-courses/                Skills
/opportunities/qs-world-university-rankings-pakistan/   Scholarships  (QS WUR 2026 — updated 2026-06-06)
/opportunities/csc-chinese-government-scholarship/      Scholarships  (full rewrite 2026-06-06)
/opportunities/international-youth-opportunities/       Leadership & Engagement  (NEW 2026-06-06)
robots.txt        (welcomes all AI crawlers; Disallow /admin/; Sitemap line)
sitemap.xml       (10 URLs)
llms.txt          (citable site summary for AI engines)
CNAME             (talimai.tech)
favicon-16x16.png, favicon-32x32.png, favicon.ico, apple-touch-icon.png, og-image.png, founder-mushtaq-shah.jpg
```

### Cloudflare (separate from GitHub)
```
worker.js         (talimai-register; route talimai.tech/api/*; endpoints: register, subscribe, cv-analyze [multimodal], chat, track, health, leads, admin/*)
wrangler.toml     (worker config)
```
Secrets (set in Cloudflare, redeploy after any change): NOTION_TOKEN, DATABASE_ID, GEMINI_API_KEY, GITHUB_TOKEN, ADMIN_KEY.

### Hub categories
Active (have guides): Scholarships & Education (CSC, QS, HEC, PMYP) · Loans & Funding (Kamyab Jawan) · Skills & Training (NAVTTC) · Leadership & Engagement (Youth Opportunities).
Coming soon: Jobs & Internships · Exam Prep.

### Guide page pattern (all 8)
hub.css + site-header/footer + breadcrumb + article-head (pill + "Updated …") + glance grid + article-body (answer-first) + steps + official link box + faq (details/summary, synced to FAQPage schema) + talim-cta + related cards + disclaimer (independent, not affiliated, official link). JSON-LD per page: Article + (HowTo and/or ItemList) + FAQPage + BreadcrumbList — all validated (json.loads), div balance + panel ids checked.
