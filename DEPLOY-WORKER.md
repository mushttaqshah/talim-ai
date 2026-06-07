# Deploy Guide — Talim AI Registration Worker

> Step-by-step to deploy the lead-capture Worker. Do these IN ORDER. Don't skip.
> Each step is small. Check the box as you go.

**What this Worker does:** Receives form submissions at `talimai.tech/api/register` and `/api/subscribe`, backs every one up to Cloudflare KV, writes the lead to your Notion CRM, and (optionally) emails you.

**Files you need (from this session's outputs):**
- `worker.js` — the Worker code
- `wrangler.toml` — the deploy config

---

## Part A — One-time tool setup (10 min)

You'll deploy from your own computer using Cloudflare's `wrangler` tool.

- [ ] **A1.** Make sure Node.js is installed. Open a terminal and run:
  ```
  node --version
  ```
  If you see a version (v18+), good. If "command not found", install from https://nodejs.org (LTS version).

- [ ] **A2.** Create a folder for the Worker on your computer:
  ```
  mkdir talimai-worker
  cd talimai-worker
  ```

- [ ] **A3.** Put `worker.js` and `wrangler.toml` into this folder (download them from this chat, move them in).

- [ ] **A4.** Log in to Cloudflare from the terminal:
  ```
  npx wrangler login
  ```
  A browser window opens → approve access → return to terminal.

---

## Part B — Create the KV namespace (5 min)

KV is where every lead gets backed up (zero data loss).

- [ ] **B1.** Create the namespace:
  ```
  npx wrangler kv namespace create LEADS_KV
  ```

- [ ] **B2.** The command prints something like:
  ```
  [[kv_namespaces]]
  binding = "LEADS_KV"
  id = "abc123def456..."
  ```
  Copy that `id` value.

- [ ] **B3.** Open `wrangler.toml`, find the line:
  ```
  id = "REPLACE_WITH_YOUR_KV_NAMESPACE_ID"
  ```
  Replace it with your real id. Save.

---

## Part C — Add secrets (5 min)

Secrets are encrypted by Cloudflare. They never appear in code or git.

- [ ] **C1.** Add the Notion token (paste when prompted — it won't echo):
  ```
  npx wrangler secret put NOTION_TOKEN
  ```
  Paste your `ntn_...` token, press Enter.

- [ ] **C2.** Add the database ID:
  ```
  npx wrangler secret put DATABASE_ID
  ```
  Paste: `723ff589df9c4385a35ee460ce94f1f7`

  **Email alerts and admin key are OPTIONAL — skip C3/C4 for now, add later.**

- [ ] **C3.** (Optional, later) Admin key to read backups via `/api/leads?key=...`:
  ```
  npx wrangler secret put ADMIN_KEY
  ```
  Paste any long random string you make up (save it in 1Password).

- [ ] **C4.** (Optional, later — needs Resend account) Email alerts:
  ```
  npx wrangler secret put RESEND_API_KEY
  npx wrangler secret put NOTIFY_EMAIL
  ```

---

## Part D — Deploy (2 min)

- [ ] **D1.** Deploy:
  ```
  npx wrangler deploy
  ```

- [ ] **D2.** It prints a URL like `https://talimai-register.<your-subdomain>.workers.dev`
  AND it sets up the route `talimai.tech/api/*`.

- [ ] **D3.** Test the health endpoint — open in browser:
  ```
  https://talimai.tech/api/health
  ```
  You should see JSON like:
  ```json
  {"ok":true,"notion":true,"kv_backup":true,"email":false}
  ```
  - `notion: true` → token + DB ID set correctly
  - `kv_backup: true` → KV connected
  - `email: false` → expected (not set up yet)

---

## Part E — Connect the website forms (10 min)

Now point the site's forms at your Worker instead of Pageclip.

- [ ] **E1.** Open `index.html` in GitHub editor.

- [ ] **E2.** **Registration form** — find:
  ```html
  <form class="pageclip-form" id="register-form" action="https://send.pageclip.co/2lYgWddnh3q2871V81UWBg8tsBjqxT9k/talim-register" method="post">
  ```
  Change the `action` to:
  ```html
  <form id="register-form" action="https://talimai.tech/api/register" method="post">
  ```
  (Also removed `class="pageclip-form"` so Pageclip's JS doesn't intercept it.)

- [ ] **E3.** **Contact form** (hero/CTA) — find:
  ```html
  <form class="cta-form pageclip-form" action="https://send.pageclip.co/2lYgWddnh3q2871V81UWBg8tsBjqxT9k" method="post">
  ```
  Change to:
  ```html
  <form class="cta-form" action="https://talimai.tech/api/subscribe" method="post">
  ```

- [ ] **E4.** **Add the honeypot field** to BOTH forms (spam protection). Inside each `<form>`, add this hidden field right after the opening tag:
  ```html
  <input type="text" name="company_url" tabindex="-1" autocomplete="off" style="position:absolute;left:-9999px;" aria-hidden="true">
  ```
  Bots fill it, humans never see it → those submissions get silently dropped.

- [ ] **E5.** The forms' JavaScript needs updating too — the current code uses Pageclip events (`pageclip:success`). We'll replace that with a normal fetch() in the NEXT session (it's a bit involved). For now, the forms will still POST and work; the success message handling is what we'll polish.

  **→ Tell Claude when you reach this step — we'll do E5 together.**

---

## Part F — Verify end to end

- [ ] **F1.** Go to https://talimai.tech → Register → fill the form → submit.
- [ ] **F2.** Check your Notion "Talim AI — Registrations" database → the lead should appear with Status = New.
- [ ] **F3.** Submit the hero email form too → check it lands as a subscription.

---

## Troubleshooting

| Symptom | Fix |
|---|---|
| `/api/health` shows `notion:false` | Re-run `wrangler secret put NOTION_TOKEN` and `DATABASE_ID` |
| Lead doesn't appear in Notion | Did you connect the integration to the database? (Notion → database → ... → Connections → add "Talim AI Form Backend") |
| `/api/health` 404 | Route not set. Check `wrangler.toml` route pattern + redeploy |
| Form submits but page shows raw JSON | That's E5 — JS handler needs updating (next session) |
| `kv_backup:false` | KV id wrong in wrangler.toml — recheck B3 |

---

## What's intentionally left for next session

- **E5** — replace Pageclip JS with clean fetch() so the form shows your themed success screen instead of raw JSON
- **Email alerts** — set up Resend, verify talimai.tech domain, add the 2 secrets
- **Admin backup viewer** — optional `/api/leads` dashboard

Deploy Parts A–D first (gets the Worker live + tested via /api/health). Then we do E + F together.
