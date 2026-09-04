# WorkFolio PH — Launch Fix Plan (Ordered, Verifiable)

Source: `PUBLISH-REVIEW.md` (2026-09-04 review of `main` @ `1df18ec`).
All code-level findings were fixed in commit `1e9fb39` (see `/home/user/0001-*.patch`).
This plan sequences **what to do, in what order, and how to prove each step worked**.

Golden rule for every step: **run `npm run check` before it's considered done.**
(The same gate runs automatically in GitHub Actions — a red check means "not merged, not published".)

---

## MOVE 1 — Land the fixes on GitHub under protection  *(first move, ~15 min)*

1. Apply the patch on your machine:
   ```bash
   git clone https://github.com/workfolioPH/workfolioph.git
   cd workfolioph
   git checkout -b fix/publish-readiness
   git am 0001-Publish-readiness-fixes-build-dedupe-security-conten.patch
   # (or: git apply --3way <patch> && git add -A && git commit)
   npm install && npm run check          # expect: RESULT: 13 passed, 0 failed
   git push -u origin fix/publish-readiness
   ```
2. Open a PR `fix/publish-readiness → main`. Wait for **CI green** (Actions → CI), merge.
3. **Lock the pattern** so this class of breakage can't return:
   - GitHub → Settings → Branches → branch protection on `main`:
     *"Require a pull request"*, *"Require status checks to pass"* (select **CI / build**),
     *"Do not allow force pushes"*.
   - **Stop editing `main` in the GitHub web UI and stop using "Add files via upload".**
     Both together are what deleted a CSS brace and created a duplicate project tree.

✅ Done when: `main` HEAD passes CI and branch protection is ON.

## MOVE 2 — Supabase bootstrap  *(~20 min, blocking everything dynamic)*

1. Create a Supabase project (any region near you).
2. SQL Editor → paste & run the full `supabase/schema.sql`.
3. Verify: Table editor shows `inquiries`, `faqs`, `reviews`, `portfolio_samples`.
4. Authentication → Users → *Add user* → admin email + strong password (turn off
   "Confirm email" or confirm once). **This exact email becomes `ADMIN_EMAIL`.**
5. Settings → API: copy **Project URL**, **anon public key**, **service_role secret key**.

✅ Done when: you can see the 4 tables and hold the 3 keys + admin login.

## MOVE 3 — Vercel env + deploy  *(~15 min)*

1. Import the repo in Vercel (framework preset **Vite**, build `npm run build`, output `dist`).
2. Environment Variables — set for **Production, Preview, and Development**:

   | Name | Value |
   |---|---|
   | `NEXT_PUBLIC_SUPABASE_URL` | Project URL |
   | `VITE_SUPABASE_URL` | same Project URL |
   | `VITE_SUPABASE_ANON_KEY` | anon public key |
   | `SUPABASE_SERVICE_ROLE_KEY` | service_role secret (⚠ server-only) |
   | `ADMIN_EMAIL` | the Supabase admin user email |
   | `PUBLIC_SITE_ORIGIN` | `https://workfolioph.vercel.app` (or final domain) |

3. Redeploy so functions pick up the vars.

✅ Done when: `curl -s <url>/api/faqs` returns `[]` (200, not 500).

## MOVE 4 — End-to-end verification on the live URL  *(~20 min, do not skip)*

Run every row; each has a pass condition:

- [ ] **Inquiry**: submit the form with test data → success screen shows `WF-` + **6 digits**.
- [ ] **DB**: Supabase table editor shows the row with status `New`.
- [ ] **Tracker**: Workflow section → enter the ref → status card appears; wrong ref → "No inquiry found".
- [ ] **Admin**: header Admin button → sign in as admin → table loads with your test row.
- [ ] **Update**: change status → reload → new status persists (check in Supabase too).
- [ ] **Sign out**: the new Sign-out button logs out; reopening asks for credentials.
- [ ] **403 clarity** (optional): logged-in non-admin → red banner says "Administrator access required".
- [ ] **Share preview**: send the URL in WhatsApp/Messenger → card shows title + the new og-image.
- [ ] **Mobile**: 360px-wide viewport (real phone or DevTools) → modals fit, header sticks, no sideways page scroll *(this is what the restored CSS block guards)*.
- [ ] **FAQ**: renders the 6 built-in FAQs; after seeding `faqs`, DB rows override.
- [ ] Delete the test inquiry row in Supabase.

✅ Done when: all rows pass. This is the actual "ready to publish" proof.

## MOVE 5 — Business decisions to settle before paid traffic  *(content only)*

Pick the truth, then edit in **one PR**; `npm run check` keeps pricing files in sync:

- [ ] **Photo enhancement price**: AddonsSection says ₱1,000, Calculator says ₱1,500 → choose one.
- [ ] **Video editing price**: "₱1,500–₱2,500" (section) vs flat ₱2,500 (calculator) → choose one.
- [ ] **Turnaround**: Hero/Footer "2–3 Day Delivery" vs FAQ "Professional/Premium 3–5 business days" → align.
- [ ] Add a short **Privacy Notice + Terms** page; link it in the inquiry modal + footer (PH Data Privacy Act).
- [ ] Anti-spam for `POST /api/inquiries`: Cloudflare Turnstile or honeypot + rate limit (recommended once traffic starts).
- [ ] Optional: "SAMPLE" micro-label on the hero mockup persona; `@workfolio.ph` business email.

## MOVE 6 — Custom domain switch (when `workfolio.ph` is bought)  *(~10 min, one PR)*

Search & replace `workfolioph.vercel.app` → `https://workfolio.ph` in:
`index.html` (canonical, og:url, JSON-LD ids), `public/robots.txt` (Sitemap line),
`public/sitemap.xml` (`<loc>`), `src/components/Footer.tsx` (Web line). Then add the domain in Vercel.

## MOVE 7 — Launch week hygiene

- [ ] Google Search Console: verify domain, submit `sitemap.xml`.
- [ ] Watch Vercel → Functions → Logs for `/api/inquiries` errors 1–2 days.
- [ ] Supabase: enable daily backups habit (export) or paid PITR; keep `ADMIN_EMAIL` user on 2FA-capable strong password.
- [ ] Re-run `npm run check` before *every* push to `main` — it is now the standing publication gate.

---

## The ongoing pattern (why each step is ordered like this)

```
        local edit → npm run check → commit → PR → CI (same gate) → merge → auto-deploy
```

- The **gate is a script, not a memory** — 13 automated checks reproduce this entire review
  (build, lint, dedupe, og-image, image refs, hotlinks, anchors, domains, prices, ref-code
  entropy, endpoint guards, publish filters). CI runs `npm run check`, so a future GitHub web
  edit that deletes a brace — like `ee2c385` did — can never reach `main` again.
- Env vars before end-to-end tests (Moves 2→3→4): the API fails fast by design, so testing
  order never produces confusing silent failures — the Admin portal now even says
  "Supabase is not configured" out loud.
- Copy/pricing decisions come **after** the site is provably functional, so you're making
  business choices against a working product, not debugging while deciding.
