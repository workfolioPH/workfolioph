#!/usr/bin/env bash
# WorkFolio PH — pre-publish verification gate
# ------------------------------------------------------------
# Re-runs every cross-reference check from the 2026-09-04 publish review.
# Run locally before every merge to main; CI runs it automatically.
# Exit code: 0 = all checks passed, 1 = at least one FAIL.
# ------------------------------------------------------------
set -u
cd "$(dirname "$0")/.."
pass=0; fail=0
ok()  { echo "PASS  $1"; pass=$((pass+1)); }
bad() { echo "FAIL  $1"; fail=$((fail+1)); }

echo "== WorkFolio PH prepublish check =="
echo

# 1) Production build (tsc -b && vite build) — catches CSS/TS breakage like ee2c385
if npm run build >/tmp/wf-build.log 2>&1; then
  ok "npm run build (tsc + vite)"
else
  bad "production build failed — tail of log:"
  tail -n 6 /tmp/wf-build.log | sed 's/^/      /'
fi

# 2) Lint gate
if npm run lint --silent >/tmp/wf-lint.log 2>&1; then
  ok "eslint clean (0 errors)"
else
  bad "lint errors — tail of log:"
  tail -n 12 /tmp/wf-lint.log | sed 's/^/      /'
fi

# 3) Single source of truth: no duplicated project tree
if [ -e src/components/src ] || [ -e src/components/package.json ]; then
  bad "duplicated project tree found under src/components/ (delete it — it caused the 2026-09 drift)"
else
  ok "no nested duplicate project copies"
fi

# 4) Social-share image must exist (it was a 404 blocking shares)
if [ -s public/og-image.png ]; then
  ok "public/og-image.png present"
else
  bad "public/og-image.png MISSING — og:image in index.html would 404"
fi

# 5) Every '/images/...' referenced in code exists in public/
missing=0
while IFS= read -r img; do
  [ -s "public${img}" ] || { echo "FAIL  referenced image missing: $img"; missing=1; }
done < <(grep -rhoE "'/images/[A-Za-z0-9._-]+'" src --include='*.tsx' --include='*.ts' | tr -d "'" | sort -u)
if [ "$missing" -eq 0 ]; then ok "all /images/* references resolve to real files"; else fail=$((fail+1)); fi

# 6) No third-party image hotlinks (reliability + latency for PH visitors)
if grep -rq "images.unsplash.com" src index.html 2>/dev/null; then
  bad "hotlinked unsplash.com images found — localize to public/images/"
else
  ok "no third-party image hotlinks in source"
fi

# 7) Nav/scroll anchors all resolve to existing section ids
dangling=0
targets=$(grep -rhoE "scrollToSection\('[a-zA-Z0-9-]+'\)|handleScrollTo\('[a-zA-Z0-9-]+'\)|onScrollTo\('[a-zA-Z0-9-]+'\)" src --include='*.tsx' | grep -oE "'[a-zA-Z0-9-]+'" | tr -d "'" | sort -u)
for t in $targets; do
  grep -q "id=\"$t\"" src/components/*.tsx || { echo "FAIL  scroll target '#$t' has no matching section id"; dangling=1; }
done
if [ "$dangling" -eq 0 ]; then ok "all scroll targets resolve ($(echo "$targets" | wc -w) anchors)"; else fail=$((fail+1)); fi

# 8) Product domain consistency: no stale Firebase '.web.app' strings
if grep -rq "\.web\.app" src --include='*.tsx' --include='*.ts'; then
  bad "'.web.app' found in source — product promise is *.workfolio.ph"
else
  ok "no stale .web.app domain strings"
fi

# 9) Core package prices consistent (JSON-LD vs PricingSection vs Calculator)
priceflag=1
for p in 3500 6500 10500; do
  grep -q "\"price\": \"$p\"" index.html              || { echo "FAIL  price $p missing from index.html JSON-LD offers"; priceflag=0; }
  grep -q "price: $p," src/components/PricingSection.tsx   || { echo "FAIL  price $p missing from PricingSection"; priceflag=0; }
  grep -q "price: $p," src/components/PricingCalculator.tsx || { echo "FAIL  price $p missing from PricingCalculator packages"; priceflag=0; }
done
if [ "$priceflag" -eq 1 ]; then ok "₱3,500 / ₱6,500 / ₱10,500 consistent across JSON-LD, PricingSection, Calculator"; else fail=$((fail+1)); fi

# 10) Built output sanity
if [ -f dist/index.html ] && [ -f dist/og-image.png ]; then
  ok "dist/ produced with og-image copied"
else
  bad "dist/index.html or dist/og-image.png missing after build"
fi

# 11) Inquiry ref-code format (anti-enumeration: 6 digits)
if grep -q "100000 + Math.random() \* 900000" api/inquiries.js; then
  ok "inquiry ref codes use 6-digit space"
else
  bad "api/inquiries.js ref-code entropy regressed (expected 100000..999999)"
fi

# 12) Reviews write endpoint is admin-gated
if grep -q "requireAdmin(req, res)" api/reviews.js; then
  ok "POST /api/reviews requires admin"
else
  bad "POST /api/reviews is open again — gate it with requireAdmin"
fi

# 13) Public read endpoints filter is_published
pub=1
for f in api/faqs.js api/reviews.js api/samples.js; do
  grep -q "is_published', true" "$f" || { echo "FAIL  $f no longer filters is_published"; pub=0; }
done
if [ "$pub" -eq 1 ]; then ok "faqs/reviews/samples filter is_published"; else fail=$((fail+1)); fi

echo
echo "== RESULT: $pass passed, $fail failed =="
if [ "$fail" -eq 0 ]; then
  echo "All publish gates green. Safe to merge/deploy."
  exit 0
else
  echo "Fix the FAIL items above before publishing."
  exit 1
fi
