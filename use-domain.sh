#!/bin/sh
# Run this ONLY after fernandocatter.com DNS points at GitHub Pages.
# It turns the custom domain on and pushes.
cd "$(dirname "$0")" || exit 1
git mv CNAME.pending CNAME 2>/dev/null || true
git add -A
git commit -m "Point site at fernandocatter.com"
git push
