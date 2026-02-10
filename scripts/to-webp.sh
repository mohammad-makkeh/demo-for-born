#!/usr/bin/env bash
set -euo pipefail

IN_DIR="${1:-.}"

count=$(find "$IN_DIR" -type f \( \
  -iname "*.png" -o -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.tif" -o -iname "*.tiff" -o -iname "*.bmp" \
\) | wc -l | tr -d ' ')

if [[ "$count" -eq 0 ]]; then
  echo "No images found under: $IN_DIR"
  exit 0
fi

echo "Found $count image(s) under: $IN_DIR"

find "$IN_DIR" -type f \( \
  -iname "*.png" -o -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.tif" -o -iname "*.tiff" -o -iname "*.bmp" \
\) -print0 | while IFS= read -r -d '' f; do
  out="${f%.*}.webp"
  cwebp -lossless -z 9 -mt -quiet "$f" -o "$out"
  echo "✅ $f -> $out"
done
