# Talim AI — Build Progress Tracker

> **Purpose of this file:** This is the single source of truth for what's done, what's in progress, and what's next. When you (or Claude) come back after a break, start here. Don't jump phases — one task at a time. Pair this with `SITE-STATE.md` for architecture details.

**Site:** talimai.tech — 🟢 **LIVE + Cloudflare + analytics + lead pipeline + AI CV analyzer + AI chat + SEO content hub + FOUNDER PHOTO/PERSON SEO + ADMIN CMS (visual editor + stats)**
**Repo:** github.com/mushttaqshah/talim-ai
**Owner:** Mushtaq Shah (Syed Mushtaq Ur Rehman Shah Bukhari)
**Last updated:** 2026-05-29 (Admin CMS: visual edit mode + statistics DEPLOYED)
**Current phase:** Self-service admin control panel (full CMS) — LIVE
**Next single action:** Use the panel; optionally expand visual editor (add/remove sections) or build more opportunity guides

> ⚠️ NOTE: Sections lower in this file are older. The accurate current state is the header above + the **"LATEST STATUS"** block at the very bottom of this file. Pageclip references below are obsolete — forms now post to a Cloudflare Worker.

---

## ⏭️ DO THIS NEXT (only this — don't jump ahead)

✅ Admin CMS is fully deployed (Pages & Files editor, New Guide, Media upload, Find-in-site, History/Restore, Leads, **Visual Edit Mode**, **Statistics**). The owner can now self-edit the whole site.

**Day-to-day use:** talimai.tech/admin/ → log in with ADMIN_KEY.
- Edit any text/image visually: **Edit Site** tab → "Edit Home page" (or any page via ?edit=1) → click text/image → Save.
- Add an opportunity guide: **New Guide** tab.
- See traffic + leads: **Stats** tab.

**Still worth doing (when ready):**
1. Google Search Console → Request Indexing for the 3 hub URLs (if not done) so they rank sooner.
2. On LinkedIn, add `https://talimai.tech` to the profile (boosts founder-name SEO; pairs with the Person schema already on the site).
3. Rotate the Notion token + Gemini key that were pasted in chat earlier (security TODO).

**Optional future build (ask Claude):** expand the visual editor to add/remove whole sections & reorder blocks; feature on/off toggles (CV analyzer/chat); announcement banner; auto-link new guides on the hub.

---

## Phase 0 — Foundation ✅ COMPLETE

- [x] Domain purchased: talimai.tech
- [x] GitHub repo: mushttaqshah/talim-ai (public)
- [x] index.html with full SEO meta tags (3500+ lines)
- [x] Title, meta description, canonical URL
- [x] Open Graph + Twitter Card meta tags
- [x] H1 count fixed (1 H1, 21 H2s)
- [x] robots.txt with AI crawler permissions
- [x] sitemap.xml with all sections + 12 article anchors
- [x] CNAME file committed
- [x] Google Search Console verification
- [x] 12 articles drafted (currently inline anchors in homepage)
- [x] Pageclip integrated for 2 forms (contact + registration)

## Phase 1 — Get Site Live ✅ COMPLETE

- [x] GitHub Pages enabled
- [x] DNS configured at registrar (4 A records + www CNAME)
- [x] HTTPS enforced
- [x] talimai.tech live ✅
- [x] robots.txt + sitemap.xml externally accessible
- [x] Sitemap submitted to Google Search Console
- [x] Bing Webmaster Tools set up (BingSiteAuth.xml uploaded, verified)
- [x] Sitemap submitted to Bing
- [x] www → apex redirect verified

## Phase 2 — Performance & Reliability 🟡 IN PROGRESS

### Sub-phase 2A — Cloudflare ✅ COMPLETE

- [x] Cloudflare account created (Free plan)
- [x] talimai.tech added, DNS imported
- [x] Nameservers updated: bethany/trevor.ns.cloudflare.com
- [x] Cloudflare verification complete (domain proxying)
- [x] SSL/TLS mode set to "Full (strict)"
- [x] "Always Use HTTPS" enabled
- [x] "Block AI training bots" DISABLED (critical for SEO)
- [N/A] Auto Minify (deprecated by Cloudflare August 2024)
- [N/A] Brotli compression (auto-enabled on Free plan since June 2024)

### Sub-phase 2B — Analytics & Monitoring ✅ COMPLETE

- [x] Imgbot activated on `mushttaqshah/talim-ai`
- [x] SimpleAnalytics signed up via Student Pack
- [x] SimpleAnalytics scripts added to index.html before `</body>`
- [x] SimpleAnalytics T&Cs accepted, tracking confirmed
- [x] Sentry signed up via Student Pack
- [x] Sentry loader script added to index.html in `<head>` (loads early to catch other-script errors)

### Sub-phase 2C — Missing brand assets 🟡 IN PROGRESS

- [x] Created favicons (favicon-32x32.png, favicon-16x16.png, apple-touch-icon.png, favicon.ico)
- [x] Created og-image.png (1200x630, dual-audience layout + Iqbal shayr + Founder credit)
- [ ] **NEXT:** Fix email inconsistency in footer (`hello@talim.ai` → `hello@talimai.tech`)
- [ ] Update social media URLs (line ~2948, 5 placeholder `#` links)
- [ ] Replace placeholder YouTube video ID `dQw4w9WgXcQ` OR hide video section
- [ ] Replace placeholder WhatsApp number `+92-XXX-XXXXXXX` in register page

## Phase 3 — Split Content into Real Pages 🔒 LOCKED

**Goal:** Each article on its own URL for real SEO indexing.

- [ ] Create `/blog/index.html`
- [ ] 12 article pages under `/blog/[slug]/index.html` (slugs in earlier sessions)
- [ ] Each article: own meta description, OG image, canonical URL
- [ ] Update sitemap.xml — remove `#article-...` anchors, add real URLs
- [ ] Update homepage Insights cards to point to real URLs
- [ ] Resubmit sitemap to Google + Bing
- [ ] All 12 article drafts already exist in earlier Claude transcripts

## Phase 4 — Standalone Product Pages 🔒 LOCKED

**Note:** Site already has 3 internal "pages" via JavaScript routing (home, analyzer, services, register). For SEO, these need to become real URL paths so each indexes separately.

- [ ] `/universities/index.html`
- [ ] `/universities/accreditation/index.html`
- [ ] `/universities/faculty-qualification/index.html`
- [ ] `/universities/assurance-of-learning/index.html`
- [ ] `/students/cv-analyzer/index.html`
- [ ] `/students/scholarship-compass/index.html`
- [ ] `/pricing/index.html` (extract from current Services page)
- [ ] `/about/index.html` (extract Founder section)
- [ ] `/contact/index.html`
- [ ] Refactor nav to use real `<a href>` instead of `onclick="showPage()"`

## Phase 4.5 — Lead Capture Infrastructure ✅ COMPLETE (live, pending final user test)

**Goal:** Move from Pageclip-only to a fully-owned, transparent, editable lead pipeline. User wanted complete control, easy editing, multiple backups, instant notifications.

**Architecture (LIVE):**
```
User registers → Cloudflare Worker (talimai.tech/api/register & /api/subscribe)
                       ↓
              ┌────────┴────────┐
              ↓                 ↓
        Notion Database   Cloudflare KV  (LEADS_KV — every submission, 1yr TTL)
        (primary CRM)     (backup log)
              ↓
        Email notification (optional — not yet enabled)
```

### Sub-phase 4.5A — Notion CRM ✅ COMPLETE
- [x] Created Notion database: "Talim AI — Registrations"
  - Database URL: https://www.notion.so/723ff589df9c4385a35ee460ce94f1f7
  - Database ID: `723ff589df9c4385a35ee460ce94f1f7`
  - Data source ID: `76173baa-866f-440d-89b0-84afb0af5699`
  - Integration name: "Talim AI Form Backend" (connected to DB)
- [x] 17 fields configured (form fields + CRM tracking)
- [x] Status field with 7 stages: New → Contacted → Demo Scheduled → Proposal Sent → Won / Lost / On Hold
- [x] 4 views created: Sales Pipeline (board), New Leads (table), By Audience (board), Follow-up Calendar
- [ ] User to add icon + cover image in Notion (optional, cosmetic — DEFERRED)

### Sub-phase 4.5B — Cloudflare Worker ✅ COMPLETE & DEPLOYED
- [x] Created Notion integration, got token, shared DB with integration
- [x] Built production Worker (worker.js) with endpoints:
  - POST /api/register (full 5-step form)
  - POST /api/subscribe (hero email signup)
  - GET /api/health (status check)
  - GET /api/leads?key=ADMIN_KEY (protected backup viewer)
- [x] Features: KV backup (every submission, never fails request), honeypot spam field (`company_url`), rate limiting (5/IP/hour), optional Resend email, graceful Notion-failure handling
- [x] Deployed via Cloudflare DASHBOARD (no terminal):
  - Worker name: `talimai-register`
  - Worker URL: `talimai-register.mrehman-msab03asab.workers.dev`
  - KV namespace `LEADS_KV` created + bound
  - Secrets added: NOTION_TOKEN, DATABASE_ID
  - Route set: `talimai.tech/api/*`
- [x] **HEALTH CHECK VERIFIED** (2026-05-22): `/api/health` returned `{"ok":true,"notion":true,"kv_backup":true,"email":false}` ✅
- [x] Updated index.html — connected both forms to Worker (5 changes in one commit):
  - Contact form → action=/api/subscribe, id=contact-form, +honeypot
  - Register form → action=/api/register, +honeypot
  - Contact form JS → fetch() instead of pageclip events
  - Register form JS → fetch() POST FormData→JSON, success sets currentStep=6
  - Removed pageclip.css + pageclip.js
- [ ] **PENDING: final end-to-end test** — user to submit a real form on the live site and confirm the lead appears in Notion. (Claude cannot test — environment blocks external URLs.)

### Sub-phase 4.5C — Email notifications 🔒 DEFERRED (optional, later)
- [ ] Set up Resend (3000 emails/month free), verify talimai.tech domain
- [ ] Add secrets RESEND_API_KEY + NOTIFY_EMAIL to the Worker
- [ ] Change Worker `from` address from onboarding@resend.dev to noreply@talimai.tech
- [ ] Test: register triggers email alert
- Worker code already supports this — just needs the 2 secrets + Resend account.

### Sub-phase 4.5D — Cleanup
- [x] Pageclip scripts removed from index.html (forms now go to Worker)
- [ ] (Optional) Add ADMIN_KEY secret to enable /api/leads backup viewer
- [ ] User should rotate the Notion token after this session (was shared in chat — security best practice)

## Phase 5 — CV Analyzer Backend ⚠️ LOCKED (BROKEN IN PRODUCTION)

**Current state:** CV Analyzer UI is built but the JavaScript calls `https://api.anthropic.com/v1/messages` directly from the browser — this will FAIL in production because:
1. No API key in request headers (CORS + auth will block it)
2. Even if it worked, hardcoding API key in client-side JS = $1000s wasted by abuse in <24 hours

**The build is set up for Claude.ai's Artifacts environment** where the API key is auto-injected. On talimai.tech directly, it won't work.

**Fix path:**
- [ ] Sign up for Appwrite Education plan (Student Pack — free)
- [ ] Build serverless function that proxies to Anthropic API (Appwrite Functions or Cloudflare Workers)
- [ ] Store ANTHROPIC_API_KEY as encrypted environment variable
- [ ] Update CV Analyzer JS to call YOUR endpoint, not Anthropic's directly
- [ ] Add rate limiting (3 free analyses per email per day, by IP)
- [ ] Sign up for Clerk (Student Pack — auth) if collecting emails

**Cloudflare Workers might be the simpler path** — already on Cloudflare, generous free tier, no extra service. To decide in this phase.

## Phase 6 — Student Services Platform 🔒 LOCKED

**Strategic note (Session 7):** Talim AI serves TWO audiences, not just universities. Student services are broader than just "Scholarship Compass" — they include exam prep, career tools, and scholarship matching across national + international schemes.

### Sub-phase 6A — Scholarship Compass
- [ ] MongoDB Atlas (Student Pack — $50 credit + free tier)
- [ ] Build scholarship schema, ingest top 30 HEC schemes
- [ ] Add international: Fulbright, Chevening, DAAD, Commonwealth, MEXT, Erasmus+, Australia Awards
- [ ] User profile form (degree, CGPA, district, financial need, target country)
- [ ] Matching algorithm + filter UI

### Sub-phase 6B — Exam Prep Tools
- [ ] FPSC (CSS/PMS) prep — past papers, MCQs, syllabus tracker
- [ ] PPSC (Punjab Public Service Commission) prep
- [ ] MDCAT (medical college admission test) prep
- [ ] NTS (National Testing Service) prep
- [ ] GAT (Graduate Assessment Test) prep
- [ ] Decide: build in-house vs. partner with existing providers vs. content-only

### Sub-phase 6C — Career Services
- [ ] CV Analyzer (Phase 5 — already in progress, broken in prod)
- [ ] Job market intelligence (which sectors hire most in Pakistan)
- [ ] Salary calculator by industry + experience
- [ ] LinkedIn profile review tool
- [ ] Interview prep (mock questions, by industry/role)

### Open question
- [ ] How to monetize student side? Free CV Analyzer is loss-leader, but exam prep + scholarship mentorship can be paid (already priced on Services page: CV Pro Review PKR 2,500, Scholarship Mentorship PKR 25,000, Career Compass PKR 75,000/3mo).

## Phase 7 — Universities Backend (paid product) 🔒 LOCKED

- [ ] Pick: DigitalOcean ($200 credit) ⭐ vs Azure ($100)
- [ ] Provision server
- [ ] Doppler for secrets (Student Pack)
- [ ] CV parsing pipeline (PDF/DOCX → structured faculty data)
- [ ] HEC W/X/Y/Z journal classification engine
- [ ] HEC BPS rank validation
- [ ] Faculty Qualification Matrix generator (Excel export)
- [ ] PLO/CLO mapping (syllabi → outcomes)
- [ ] SAR section-draft generator (Claude API)
- [ ] Admin dashboard, multi-tenant isolation

## Phase 8 — Launch Operations 🔒 LOCKED

- [x] ~~Pageclip form backend~~ — already integrated
- [ ] Testmail for email flow testing (Student Pack)
- [ ] AstraSecurity firewall + malware scan (Student Pack)
- [ ] BrowserStack cross-browser test (Student Pack)
- [ ] LambdaTest mobile responsiveness (Student Pack)
- [ ] Polypane performance audit (Student Pack)
- [ ] 1Password for credentials (Student Pack)
- [ ] Privacy Policy
- [ ] Terms of Service
- [ ] Business email mushtaq@talimai.tech via Cloudflare Email Routing (FREE — Cloudflare is now active so this can be done anytime)

## Phase 9 — Go-to-Market 🔒 LOCKED

- [ ] Publish first 4 articles (after Phase 3)
- [ ] Demo deck with Visme (Student Pack — 3 months Starter)
- [ ] LinkedIn company page
- [ ] Outreach list: 30 Pakistani business school QECs
- [ ] First cold email batch
- [ ] First demo call scheduled
- [ ] Pricing finalized
- [ ] 1st pilot university signed

---

## 📓 Session Log

### Session 1 — original SEO planning
- Competitor analysis, 12 articles drafted, SEO fixes, content strategy
- Hit API limit before files deployed

### Session 2 — files committed
- index.html, robots.txt, sitemap.xml, CNAME, Google verification HTML

### Session 3 — 2026-05-16 morning — Progress Tracker created
- PROGRESS.md and STUDENT-PACK-INVENTORY.md created
- Stopped at Phase 1, task 1

### Session 4 — 2026-05-16 — SITE WENT LIVE 🟢
- GitHub Pages, DNS, custom domain — site live and accessible

### Session 5 — 2026-05-16 — Phase 1 FULLY COMPLETE ✅
- Google Search Console sitemap submission
- Bing Webmaster Tools setup + verification (manual route, BingSiteAuth.xml)
- Bing sitemap submission, www → apex redirect verified

### Session 6 — 2026-05-16 — MAJOR INFRA UPGRADE 🟢
- Cloudflare migration (account, NS update, verification all done)
- Imgbot activated
- SimpleAnalytics signed up, scripts added before </body>, T&Cs accepted
- Discovered Pageclip already integrated (Phase 8 item pre-completed)
- Stopped at Cloudflare SSL/TLS config tweaks

### Session 7 — 2026-05-16 — Phase 2A + 2B COMPLETE ✅
- Cloudflare configured: SSL "Full (strict)", Always HTTPS ON, AI bot blocking OFF
- Realized Auto Minify + Brotli no longer exist (Cloudflare deprecated in 2024)
- Sentry signed up via Student Pack
- Sentry loader script added in `<head>` (early load for catching other-script errors)
- User shared full current index.html — full architecture noted in SITE-STATE.md
- **NEW DISCOVERIES:**
  - Site has 4 JS-routed "pages": home, analyzer, services, register
  - 5-step Pageclip-powered registration form built and ready
  - CV Analyzer UI exists but calls Anthropic API client-side (WILL FAIL in production, no API key)
  - Multiple placeholders to fix: YouTube video (Rick Roll), social URLs (#), WhatsApp number, footer email inconsistency
- **Stopped at:** Phase 2C, favicon creation

### Session 8 — 2026-05-22 — Phase 2C assets + Phase 4.5 lead pipeline LIVE 🟢🎉
- Created favicons (favicon-16/32, apple-touch-icon, favicon.ico) — forest bg, cream "T", gold dot
- Created og-image.png — DUAL-AUDIENCE layout (Universities | Students) + Allama Iqbal shayr in Noto Nastaliq Urdu ("ستاروں سے آگے جہاں اور بھی ہیں / ابھی عشق کے امتحاں اور بھی ہیں") + Founder credit "Syed Mushtaq Ur Rehman Shah Bukhari" bottom-right
  - Urdu rendering: installed fonts-noto-extra via apt; used raw text + direction='rtl' in PIL (raqm support). arabic-reshaper NOT needed and causes boxes — avoid.
- Fixed footer email hello@talim.ai → hello@talimai.tech (user did)
- Added WhatsApp +923096032223 with wa.me link (user did, will test later)
- **BUILT FULL LEAD PIPELINE (Phase 4.5):**
  - Created Notion DB "Talim AI — Registrations" (17 fields, 4 views) via Notion MCP
  - Created Notion integration "Talim AI Form Backend", connected to DB
  - Built production worker.js (Notion + KV backup + honeypot + rate limit + optional email)
  - User deployed via Cloudflare dashboard (no terminal): worker `talimai-register`, KV `LEADS_KV`, secrets NOTION_TOKEN + DATABASE_ID, route talimai.tech/api/*
  - HEALTH CHECK PASSED: {"ok":true,"notion":true,"kv_backup":true,"email":false}
  - User connected both forms (register + contact) to Worker, removed Pageclip
- **Next action:** User to do final live form test (submit → check Notion). Then pick next phase.
- **SECURITY:** User shared Notion token in chat twice despite warnings; chose to proceed. Token should be rotated. It's now stored as encrypted Cloudflare secret.

### Session 9 — [empty, fill in next time]
- Date:
- What got done:
- What got stuck:
- Next action:

---

## 🚧 Known Issues / Open Items

### Pre-launch placeholder fixes (Phase 2C)
- [x] `og-image.png` created + uploaded (dual-audience + Iqbal shayr + founder credit)
- [x] `favicon-32x32.png`, `favicon-16x16.png`, `apple-touch-icon.png`, `favicon.ico` created + uploaded
- [x] Footer email standardized to `hello@talimai.tech`
- [x] WhatsApp number `+923096032223` added with wa.me link (user to test later)
- [ ] YouTube video ID `dQw4w9WgXcQ` is placeholder (Rick Roll) — replace OR hide [DEFERRED — user said later]
- [ ] 5 footer social links are `#` (LinkedIn, X, Instagram, YouTube, Facebook) [DEFERRED — user will provide URLs later]
- [ ] Founder photo is CSS letter "M" placeholder [DEFERRED]
- [ ] 6 empty "Cohort 1" partner slots [DEFERRED]

### Critical (Phase 5)
- [ ] **CV Analyzer JS calls Anthropic API directly client-side** — works in claude.ai Artifacts but BREAKS on production. Needs backend proxy (Appwrite Function / Cloudflare Worker) before public launch.

### Resolved
- [x] ~~`FORMSPREE_URL` placeholder~~ — Pageclip already integrated for both forms
- [x] ~~Phase 8 form backend~~ — Pageclip handles it

### Decisions deferred
- [ ] Backend hosting Phase 7: DigitalOcean ($200) ⭐ vs Azure ($100)
- [ ] CV Analyzer proxy Phase 5: Appwrite Function vs Cloudflare Worker

---

## 🎯 North Star Goals

- **3 months:** Articles published as separate pages, CV Analyzer LIVE (with backend), 1 pilot university conversation started
- **6 months:** All 12 articles indexed + page-1 ranking for 3 NBEAC keywords, 3 paying universities, 1000+ CV Analyzer users
- **12 months:** AACSB module live, 10+ paying universities, known brand in Pakistani higher ed

---

## 🏆 Wins So Far (1.5 days of work)

- 🟢 Foundation: domain, repo, full SEO, 12 articles drafted
- 🟢 Site LIVE at talimai.tech with HTTPS (GitHub Pages)
- 🟢 Indexed in Google + Bing
- 🟢 On Cloudflare CDN with strict SSL + AI-bot-friendly config
- 🟢 SimpleAnalytics tracking visitors
- 🟢 Sentry tracking JavaScript errors
- 🟢 Imgbot auto-optimizing images
- 🟢 Pageclip handling 2 forms (contact + 5-step registration)
- 🟢 Full multi-page site (home/analyzer/services/register) with state routing

**Investment so far:** ~$0 (everything via free tiers + Student Pack)

---

## ⚠️ Rules for Working on This Project

1. **One task at a time.** Open this file → look at "Do This Next" → do only that → tick the box → next task.
2. **Never skip phases.** Locked phases stay locked.
3. **Update the Session Log** every session.
4. **No new feature ideas** until current phase is done. Capture them in "Known Issues" instead.
5. **If stuck:** screenshot the error + write what you tried in the Session Log.

---

## ✅ LATEST STATUS (2026-05-29) — supersedes older sections above

This block is the accurate current truth. Older phase sections above predate these.

### Phase 2C — Brand assets ✅ DONE
- Favicons (16/32/apple-touch/.ico) + OG image (1200×630, dual-audience, Iqbal shayr in Urdu) generated & uploaded.

### Phase 4.5 — Lead Capture Pipeline ✅ LIVE
- Cloudflare Worker `talimai-register` at `talimai.tech/api/*`.
- Endpoints: `/api/register`, `/api/subscribe`, `/api/health`, `/api/leads?key=…`.
- Writes leads to **Notion CRM** ("Talim AI — Registrations", 17 fields, 4 views) + **Cloudflare KV** backup.
- Honeypot + rate limiting. Pageclip fully removed; both forms now fetch() the Worker.
- Secrets set: `NOTION_TOKEN`, `DATABASE_ID`. (Email via Resend = optional, deferred.)

### Phase 5 — CV Analyzer backend ✅ FIXED (Google Gemini)
- Old client-side Anthropic call (broken in prod) replaced.
- Worker `/api/cv-analyze` → Gemini `gemini-2.5-flash` (free tier, no card; ~250/day shared).
- Secret `GEMINI_API_KEY` set. Health `cv_analyzer:true` VERIFIED.
- index.html `analyzeCv()` now POSTs `{cv_text}` to the Worker. CV rate limit 8/IP/hr.
- ⏳ Pending: a real CV upload test by user.

### Phase: Website Chat Assistant ✅ DEPLOYED & LIVE (reuses GEMINI_API_KEY)
- Transparent, on-brand "Talim AI Assistant" (NOT pretending to be human — honest by design; escalates to WhatsApp).
- Worker `/api/chat` → Gemini multi-turn with full Talim AI persona/knowledge/pricing + honesty & no-hallucination rules. Rate limit 40/IP/hr.
- index.html: floating chat FAB + panel (brand-styled, English/Urdu/Hinglish, mobile full-screen). Health `chat:true`.
- ✅ Deployed 2026-05-29 (worker.js + new index.html committed). ⏳ Optional: user to do a final live chat smoke-test (English + Urdu).

### Phase 3 (expanded) — SEO Opportunities Content Hub ✅ FOUNDATION DEPLOYED & LIVE
- Goal: aggregate Pakistani govt youth initiatives (PMYP first, then HEC/NAVTTC/etc.) as original step-by-step guides; rank on Google; promote the programmes. Independent, links to official sources.
- Deployed 2026-05-29 (6 files committed): `/opportunities/hub.css` (shared), `/opportunities/index.html` (hub, 6 categories), 2 exemplar guides — `kamyab-jawan-business-loan/` and `pmyp-laptop-scheme/` — each with Article+HowTo+FAQ+Breadcrumb JSON-LD, "at a glance" box, step-by-step, official link, independence disclaimer. `sitemap.xml` updated (4 real URLs, replaced old anchor list). Homepage nav now has an "Opportunities" link + chat widget.
- Architecture + repeatable "add a guide / add a source" playbook + SEO checklist + guide backlog: see **CONTENT-HUB-PLAN.md**.
- ⏳ Next: (a) confirm the 3 pages render live + Request Indexing in Search Console; (b) build more guides — PM Internship, HEC need-based scholarship, NAVTTC free courses, international scholarships (Fulbright/Chevening/DAAD), exam-prep hubs (FPSC/PPSC/MDCAT/NTS/GAT).

### 🔐 Security TODO (after session)
- Rotate the Notion token and the Gemini key that were pasted in chat earlier (both currently work as Cloudflare secrets). Going forward: secrets only via Cloudflare/1Password, never chat.
- Before 2026-06-19: in aistudio.google.com, click "Restrict to Gemini API" on the key (Google ends unrestricted-key support that date).

### Deferred placeholder fixes (remember all)
Footer social links (5× `#`), YouTube video id (Rick-roll placeholder), founder photo (CSS "M"), 6 empty partner slots, WhatsApp final test. Footer contact = mushttaqshah@gmail.com (kept by choice).

### Files maintained in repo (persistent memory)
`PROGRESS.md` (this), `SITE-STATE.md` (architecture), `CONTENT-HUB-PLAN.md` (hub playbook), `STUDENT-PACK-INVENTORY.md`, plus `worker.js`, `wrangler.toml`, `DEPLOY-WORKER.md`.

### Session log — 2026-05-29
Built CV Analyzer Gemini backend (fixed prod), website chat assistant (transparent/honest), and the SEO content hub foundation (hub + 2 guides + sitemap + plan + homepage nav link). All JS/JSON-LD validated. Next: deploy, index, expand guides.

### Session log — 2026-05-29 (deployment)
User deployed all 6 files via GitHub web UI: created `opportunities/hub.css`, `opportunities/index.html`, `opportunities/kamyab-jawan-business-loan/index.html`, `opportunities/pmyp-laptop-scheme/index.html`; replaced root `sitemap.xml` and root `index.html`. Content hub + chat widget are now LIVE on talimai.tech. Immediate next: verify the 3 hub URLs render in a private window, test the chat widget (English + Urdu), and Request Indexing for the 3 new URLs in Google Search Console.

---

## ✅ LATEST STATUS (2026-05-29, evening) — Admin CMS, Visual Editor, Stats, Founder SEO

### Founder photo + Person SEO ✅ DEPLOYED
- Founder section now shows a real photo (`/founder-mushtaq-shah.jpg`, 4:5, optimised) instead of the "M" placeholder; label "Founder & CEO"; full name bolded in bio.
- Added a full **Person** JSON-LD entity (`@id` #founder) — name + alternateName ("Mushtaq Shah" etc.), jobTitle "Founder & CEO", worksFor/founderOf the Org, alumniOf (NUST, Cholistan), image, `sameAs` → LinkedIn. Organization JSON-LD given `@id` #organization and linked to the founder. (WebSite + SoftwareApplication + FAQ schema already present.)
- Goal: rank for "Talim AI" (easy, brand), the full founder name (achievable), "Mushtaq Shah" (common name, long game). Owner action: add talimai.tech to LinkedIn profile to confirm the entity link.

### Admin Control Panel — FULL CMS ✅ DEPLOYED (talimai.tech/admin/)
A password-protected dashboard that edits the REAL static files via GitHub (so SEO stays intact). Architecture: admin page → Cloudflare Worker (holds GitHub token) → GitHub repo → Pages rebuild (~1 min).
- **Secrets (Worker):** `GITHUB_TOKEN` (fine-grained PAT, repo `talim-ai`, Contents read/write) + `ADMIN_KEY` (the dashboard password). Health shows `admin:true`.
- **Tabs / features:**
  - ➕ **New Guide** — form → generates a full SEO guide page (Article+HowTo+FAQ+Breadcrumb) at `/opportunities/<slug>/` + auto-adds to sitemap.
  - 🖌️ **Edit Site (Visual Edit Mode)** — opens any page with `?edit=1`; click text to edit, click image to replace; Save → commits. Safe model: only edits leaf text elements and replaces via **unique-match** (ambiguous/duplicate text is skipped + reported, never corrupts). NOT free-form drag (told the user honestly).
  - 📝 **Pages & Files** — browse/edit/create/delete any file; **Find-in-site** search; **History → Restore** (one-click revert to any previous version).
  - 🖼️ **Media** — upload images (binary) straight to the repo.
  - 📊 **Stats** — own analytics (no external account): total/today/7-day views, 14-day bar chart, top pages, leads count.
  - 📥 **Leads** — registrations from KV.
- **Worker endpoints added:** `/api/admin/{login,tree,file (GET/PUT/DELETE),new-guide,search,history,file-at,upload,stats,save-regions}` + public `/api/track` (analytics beacon). Admin endpoints gated by `X-Admin-Key`, brute-force rate-limited.
- **Files:** `admin/index.html` (dashboard), `admin/editor.js` (visual editor, loaded on site only when `?edit=1`), `worker.js` (all endpoints). Homepage `index.html` got a tiny beacon+editor-loader snippet before `</body>`. `/admin/` is `noindex`.

### Known limits / honest notes
- Visual editor: text+image only; duplicate-text edits are skipped (use Pages & Files for those). No pixel drag / section reordering yet (possible future build).
- KV analytics: simple read-modify-write counter; fine at low traffic (Cloudflare KV free ~1000 writes/day). Counts start from deploy.

### Session log — 2026-05-29 (evening)
Added founder photo + Person/Org JSON-LD SEO; built the full self-service Admin CMS (guides generator, file editor with find + history/restore, media upload, leads) and then upgraded it with **Visual Edit Mode** (click-to-edit text + image replace on the live site) and a **Statistics dashboard** (own KV-based analytics). 4 files deployed: worker.js, admin/index.html, admin/editor.js, index.html. All JS/JSON-LD validated. The owner can now edit the whole site themselves without a developer.

---

## ✅ LATEST STATUS (2026-06-06) — Multimodal CV, AEO/GEO/Entity SEO, Content Hub expanded to 8 guides

This block catches the tracker up on everything since the 2026-05-29 evening entry.

### CV Analyzer — now MULTIMODAL ✅
- Browser sends EITHER `{file_base64, mime_type}` for PDF/PNG/JPG/WEBP (raw file → Gemini native multimodal — reads scanned PDFs, complex layouts, photos) OR `{cv_text}` for DOCX (mammoth) / TXT.
- **pdf.js fully removed** from index.html (it was the cause of "some CVs work, some don't"). Accept types `.pdf,.docx,.doc,.png,.jpg,.jpeg,.webp,.txt`, 12MB cap.
- Worker: `buildCvInstructions()`, `CV_ALLOWED_MIME`, `analyzeCvWithGemini(env,{text}|{fileBase64,mimeType})`, mime + 18MB base64 validation.

### AEO / GEO / Entity SEO overhaul ✅
- Answer-first 40–60 word blocks with named entities + a stat; declarative subject-verb-object facts.
- **FAQPage schema** on homepage (added "What is Talim AI?" as the first Q) + visible FAQ synced char-for-char.
- **robots.txt** rewritten to explicitly welcome all AI crawlers (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-Web, anthropic-ai, PerplexityBot, Perplexity-User, Google-Extended, Googlebot, Bingbot, Applebot, CCBot, Amazonbot, Bytespider, Meta-ExternalAgent, cohere-ai, DuckAssistBot) + Disallow /admin/ + Sitemap line.
- **/llms.txt** added — clean citable site summary + founder entity + key pages.
- **/about/index.html** founder page — @graph 5 entities (ProfilePage, Person, Organization, BreadcrumbList, FAQPage), visible answer-first FAQ; nav "About" sitewide.
- Honest framing to owner: no one can guarantee "always #1 on every AI engine"; on-page is ~complete, remaining levers are OFF-PAGE (Bing Webmaster sitemap, Brave Webmaster, LinkedIn link + headline, backlinks, fresh content) + time.

### Content hub — now 8 guide pages + hub, 5 active categories
Guides live/ready under /opportunities/ (each: hub.css, answer-first, official link, disclaimer, Article/HowTo/FAQ/Breadcrumb schema, JSON-LD validated):
1. kamyab-jawan-business-loan (Loans)
2. pmyp-laptop-scheme (Skills/Education)
3. hec-need-based-scholarship (Scholarships)
4. navttc-free-courses (Skills)
5. qs-world-university-rankings-pakistan (Scholarships/Education) — **updated this session** to official QS WUR 2026 data: global top 10 (MIT #1 14th yr → Imperial → Stanford → Oxford → Harvard → Cambridge → ETH → NUS → UCL → Caltech), all 18 ranked Pakistani universities w/ table (QAU 354, NUST 371 … Islamia Bahawalpur ~1401), 35 universities in QS Subject Rankings, official 9-indicator methodology table + weights, ItemList schema. Source: topuniversities.com (verified). Original wording, attributed to QS.
6. csc-chinese-government-scholarship (Scholarships) — **rewritten comprehensively this session** from the full chinesescholarshipcouncil.com source: CGS sub-programmes (Great Wall/EU/AUN/WMO/PIF/Marine/MOFCOM/Bilateral/University), Belt & Road + provincial scholarships, benefits table (stipend by level), age limits, Type A/B/C + 3-application policy (2A+1B), eligibility, 7-step apply, full documents list, ~40 universities + no-fee universities, agency number, IELTS/English certificate, part-time work (X1/X2 + NOC), timeline, 10 FAQs. Original, attributed; official = campuschina.org / studyinchina.csc.edu.cn.
7. **international-youth-opportunities (NEW this session)** — evergreen original guide derived from youthop.com categories: scholarships, fellowships, exchanges, competitions, conferences, internships, workshops, volunteering; funding levels (fully/partial/self); where to find; how to apply + Pakistani-student tips; HowTo + FAQ(7) + Breadcrumb. Activated the hub's **"Leadership & Engagement"** category (was "Coming soon"). Discovery link → youthop.com (attributed, independent).
- Hub `opportunities/index.html`: Scholarships(4 cards: CSC, QS, HEC, PMYP) · Loans(Kamyab Jawan) · Skills(NAVTTC) · Leadership(Youth Opportunities). Categories still "Coming soon": Jobs & Internships, Exam Prep.
- **sitemap.xml now lists 10 URLs** (home, /opportunities/, /about/, + 7 guides).

### Copyright/plagiarism stance (honored)
User repeatedly asked to "take this site's content" — done the RIGHT way every time: source used as RESEARCH → ORIGINAL rewrite in our own words + facts/data attributed to the official source + official link. No verbatim copying (plagiarism + duplicate-content penalty + AI distrust). User confirmed this is what they want.

### Still pending (owner / future)
- OFF-PAGE: Bing Webmaster sitemap submit (ChatGPT visibility), Brave Webmaster verify (Claude), LinkedIn add talimai.tech + headline, more same-name social profiles, backlinks.
- Placeholder fixes: 5 footer social links still `#` (need X/IG/YouTube/FB URLs from user); 6 empty partner "Cohort 1" slots; optional email (Resend); WhatsApp final test.
- Security: rotate the Notion token + Gemini key that were pasted in chat earlier; restrict Gemini key to Gemini API.

### Session log — 2026-06-06
Rewrote the CSC guide comprehensively from its full source page; updated the QS rankings guide to the official QS World University Rankings 2026 data (global top 10 + 18 Pakistani universities + subject rankings + 9-indicator methodology); built a new evergreen "International Youth Opportunities" guide and activated the hub's Leadership & Engagement category. Updated sitemap to 10 URLs. All JSON-LD validated, div balance checked. Then packaged the entire current site into a single ZIP for the owner (complete snapshot of everything added/improved across all sessions).
