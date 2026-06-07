# TALIM AI — Opportunities Content Hub: Plan & Playbook

**Goal (in the founder's words):** Aggregate every service/initiative of Pakistani government youth platforms (starting with PMYP / pmyp.gov.pk, then HEC, NAVTTC, NITB, provincial & international sources) into talimai.tech as clear, original, step-by-step student guides — benefits, eligibility, how-to-apply, and news — so students learn everything in one place and Talim AI ranks at the top of Google for these searches.

**Status:** Foundation LIVE-READY (hub + 2 exemplar guides built this session). Scales to unlimited guides + sources using the template below.

---

## 1. The architecture (the "mindmap")

```
talimai.tech/opportunities/                 ← HUB LANDING (browse by need)
│
├── Categories (by what the STUDENT needs, not by which govt dept):
│     • Scholarships & Education
│     • Loans & Funding
│     • Skills & Training
│     • Jobs & Internships
│     • Leadership & Engagement
│     • Exam Prep
│
├── Individual GUIDE PAGES (one folder each = one real URL):
│     /opportunities/kamyab-jawan-business-loan/      ✅ built
│     /opportunities/pmyp-laptop-scheme/              ✅ built
│     /opportunities/<next-slug>/                     ← add more here
│
└── SOURCES (expandable — each guide is tagged with its source):
      PMYP ✅ · HEC ✅ · NAVTTC · NITB · provincial (Punjab/KP/Sindh CM schemes) · international
```

**Why this structure ranks:** Google ranks *pages*, not sections of a single-page app. Each guide is its own crawlable URL with its own title, meta, and schema, targeting a specific long-tail search (e.g. "Kamyab Jawan loan documents 2026"). Categories organise them for humans; sources let us expand to new websites without reorganising.

---

## 2. URL & file conventions (IMPORTANT — keep consistent)

- Hub: `/opportunities/index.html`
- Shared styles: `/opportunities/hub.css` (every page links this — DRY, edit once)
- Each guide: `/opportunities/<slug>/index.html` where `<slug>` is lowercase-hyphenated and keyword-rich.
  - Good slugs: `kamyab-jawan-business-loan`, `pmyp-laptop-scheme`, `hec-need-based-scholarship`, `navttc-free-it-courses`
  - Slug = the main keyword people search. Don't change a slug once published (breaks links/SEO).

**How to create a folder on GitHub web UI (no terminal needed):**
When adding a file, in the filename box type the full path including the folder, e.g.
`opportunities/hec-need-based-scholarship/index.html`
GitHub auto-creates the folders. Done.

---

## 3. The SEO guide-page template (what EVERY guide must contain)

Copy an existing guide (e.g. `kamyab-jawan-business-loan/index.html`) and swap the content. Each guide MUST have, in order:

1. **`<head>` SEO block:**
   - `<title>` — keyword-rich, ends with "| Talim AI", under ~60 chars where possible
   - `<meta name="description">` — 150–160 chars, includes main keywords + a benefit
   - `<meta name="keywords">` — the search terms people use
   - `<link rel="canonical">` — the exact page URL
   - OG + Twitter tags (copy, change title/description/url)
   - favicons + theme-color (same as site)
   - fonts + `hub.css`
2. **JSON-LD `@graph`** with FOUR schema types (this is what wins rich results):
   - `Article` (headline, author=Talim AI, publisher, datePublished, dateModified)
   - `HowTo` (the application steps — mirrors the on-page steps)
   - `FAQPage` (the on-page FAQ Q&As — drives "People also ask")
   - `BreadcrumbList` (Home › Opportunities › This page)
   - ⚠️ Update `datePublished`/`dateModified` and all URLs for each new page.
3. **Body structure:**
   - `<header class="site-header">` (copy as-is)
   - Breadcrumb nav
   - `<h1>` (one per page, keyword-rich)
   - article meta pills (category, "Updated <month year>", read time)
   - **"At a glance" box** (6 key facts — amounts, ages, deadlines, where to apply)
   - Intro (2 short paras, include "independent summary")
   - `## What is it` — plain-language explainer
   - `## Benefits` / tiers / what you get
   - `## Who is eligible` (and "Who is NOT eligible" — great for SEO + honesty)
   - `## Documents needed`
   - **`## How to apply — step by step`** using `<ol class="steps">` (numbered circles)
   - **Official source callout** (`.official` box) — prominent link to the REAL site, `rel="noopener nofollow"`
   - `## Tips` to improve chances / avoid rejection
   - `## FAQ` using `.faq` `<details>` blocks
   - **Talim AI CTA** block (push CV Analyzer / mentorship)
   - **Related opportunities** (link 1–2 other guides + the hub — internal linking helps SEO)
   - **Independence disclaimer** (`.disclaimer`) — REQUIRED on every page (see §6)
   - `<footer class="site-footer">` (copy as-is)

---

## 4. Repeatable process — adding ONE new guide

1. Pick the opportunity + its main keyword → decide the `slug`.
2. **Research & verify facts** from official + reputable sources (never copy text — rewrite in our own words). Capture: what it is, benefits, eligibility, documents, steps, deadlines, official URL.
3. Duplicate an existing guide file's structure; replace all content + all schema fields + all URLs + dates.
4. Add the guide to the **hub** (`/opportunities/index.html`): put a `.guide-card` in the right category section (and flip that category from "Coming soon" to "Guides inside →" if needed).
5. Add the new URL to **`sitemap.xml`**.
6. Commit each file on GitHub (type the folder path as the filename to create folders).
7. After deploy: in Google Search Console, "Request indexing" for the new URL to speed it up.

**Adding a new SOURCE website (e.g. NAVTTC):** no new architecture needed. Just create guides under `/opportunities/<slug>/` as usual and tag each with the source name in the `.guide-tag` and the category. Optionally add the source to the hub copy.

---

## 5. SEO checklist (per page + sitewide)

Per page:
- [ ] Unique, keyword-rich `<title>` + meta description
- [ ] One `<h1>`; logical `<h2>`/`<h3>` with keywords
- [ ] Canonical URL correct
- [ ] All 4 JSON-LD types present & valid (test at search.google.com/test/rich-results)
- [ ] Internal links to related guides + hub
- [ ] Prominent official outbound link (`nofollow`)
- [ ] Fast (no heavy images; uses shared CSS)
- [ ] Mobile-friendly (template already is)

Sitewide:
- [ ] sitemap.xml updated + submitted in Google Search Console & Bing
- [ ] robots.txt allows crawling (already set)
- [ ] Hub linked from homepage nav (see §7)
- [ ] Build backlinks over time (share guides on LinkedIn, student groups, university pages)

**Honest expectation:** Long-tail pages can rank in weeks; competitive head terms take months + backlinks + steady fresh content. No one can guarantee overnight #1. The compounding play is: many high-quality specific guides → lots of long-tail traffic → authority → broader rankings.

---

## 6. Legal / trust guardrails (NON-NEGOTIABLE)

- Every page carries the **independence disclaimer**: Talim AI is independent, NOT affiliated with/endorsed by PMYP/HEC/government; we summarise public info and link to official sources; rules change — verify officially; applications are free; never pay an agent a commission.
- **Never copy** government site text or images (copyright + Google duplicate-content penalty). Always rewrite in original words.
- Always **link to the official source** prominently (honesty + avoids impersonation, which would get the site penalised/taken down).
- Don't promise outcomes ("guaranteed loan/laptop/selection").

---

## 7. Homepage → hub link (one small edit, do once)

Add a link to the hub in the homepage nav and ideally a card on the homepage. Minimal change in `index.html`:
- In the main site nav, add: `<a href="/opportunities/">Opportunities</a>`
- (Optional) Add a homepage section/card: "Youth Opportunities — free step-by-step guides" linking to `/opportunities/`.

---

## 8. Guide backlog (ideas to build next — prioritise high-search, high-impact)

**PMYP / federal:**
- Kamyab Jawan business loan ✅
- PM laptop scheme ✅
- PM internship programme
- Skills for All / Hunarmand Pakistan (NAVTTC) free courses
- PM youth skill development / stipend programmes
- Green Youth Movement / environment internships

**HEC:**
- HEC need-based scholarship
- HEC indigenous PhD fellowship
- Ehsaas undergraduate scholarship

**International (for the Students audience):**
- Fulbright (USA), Chevening (UK), DAAD (Germany), Commonwealth, MEXT (Japan), Erasmus+, Australia Awards

**Exam prep hubs:** FPSC, PPSC, MDCAT, NTS, GAT (syllabus + timeline + strategy)

**Provincial:** Punjab/KP/Sindh/Balochistan CM laptop & loan & skills schemes

---

## 9. What was built this session

- `/opportunities/hub.css` — shared brand stylesheet (matches site tokens: forest/cream/gold, Fraunces + Manrope, Noto Nastaliq Urdu)
- `/opportunities/index.html` — hub landing (6 categories, featured guides, CTA, disclaimer, CollectionPage + BreadcrumbList schema)
- `/opportunities/kamyab-jawan-business-loan/index.html` — full guide (Article+HowTo+FAQ+Breadcrumb schema), facts verified May 2026
- `/opportunities/pmyp-laptop-scheme/index.html` — full guide (Article+HowTo+FAQ+Breadcrumb schema), facts verified May 2026
- `sitemap.xml` — updated with the 3 new URLs

**Deploy:** upload the `opportunities/` folder (3 files) + updated `sitemap.xml` to the repo, add the homepage nav link, then Request Indexing in Search Console.
