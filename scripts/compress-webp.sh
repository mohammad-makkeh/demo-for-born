#!/usr/bin/env bash
set -euo pipefail

ROOT="${1:-.}"
QUALITY="${2:-75}"
JOBS="${3:-$(getconf _NPROCESSORS_ONLN 2>/dev/null || sysctl -n hw.ncpu 2>/dev/null || echo 4)}"

BACKUP_DIR="${ROOT%/}/backup_webp_originals"

command -v cwebp >/dev/null 2>&1 || { echo "❌ cwebp not found. Install libwebp."; exit 1; }
command -v xargs >/dev/null 2>&1 || { echo "❌ xargs not found."; exit 1; }

export ROOT QUALITY BACKUP_DIR

echo "ROOT:    $ROOT"
echo "QUALITY: $QUALITY"
echo "JOBS:    $JOBS"
echo "BACKUP:  $BACKUP_DIR"
echo

# Safety: avoid backing up inside backup dir itself if script re-run
find "$ROOT" -type f -iname "*.webp" ! -path "$BACKUP_DIR/*" -print0 |
  xargs -0 -n 1 -P "$JOBS" bash -c '
    set -euo pipefail
    file="$1"

    # Make relative path to ROOT
    rel="${file#"$ROOT"/}"

    # Backup path (mirrors folder structure)
    backup_path="$BACKUP_DIR/$rel"
    backup_parent="$(dirname "$backup_path")"
    mkdir -p "$backup_parent"

    # Only backup once (if re-running script)
    if [[ ! -f "$backup_path" ]]; then
      cp -p "$file" "$backup_path"
    fi

    tmp="${file}.tmp.webp"
    cwebp -q "$QUALITY" -mt -quiet "$file" -o "$tmp"

    # Replace only if smaller
    orig_size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file")
    new_size=$(stat -f%z "$tmp" 2>/dev/null || stat -c%s "$tmp")

    if [[ "$new_size" -lt "$orig_size" ]]; then
      mv "$tmp" "$file"
      echo "✅ $rel ($orig_size → $new_size bytes)"
    else
      rm -f "$tmp"
      echo "⏭  $rel (no gain)"
    fi
  ' _

echo
echo "Done. Originals saved under: $BACKUP_DIR"
