#!/usr/bin/env bash
# Interactive setup script to quickly customize Statusor branding and links.
# This overwrites src/config/theme.config.ts with the values you provide.

set -euo pipefail

SCRIPT_PATH="${BASH_SOURCE[0]:-$0}"
SCRIPT_DIR="$(cd -- "$(dirname -- "$SCRIPT_PATH")" && pwd)"
ROOT="$(cd -- "$SCRIPT_DIR/.." && pwd)"
THEME_FILE="$ROOT/src/config/theme.config.ts"

if [[ ! -f "$THEME_FILE" ]]; then
  echo "theme.config.ts not found at $THEME_FILE"
  exit 1
fi

extract() {
  local key="$1"
  sed -n "s/.*${key}: \"\\(.*\\)\".*/\\1/p" "$THEME_FILE" | head -n1
}

default_company="$(extract "companyName")"
default_logo="$(extract "logoUrl")"
default_primary="$(extract "primaryColor")"
default_accent="$(extract "accentColor")"
default_support="$(extract "support")"
default_website="$(extract "website")"
default_docs="$(extract "docs")"
default_dark=$(sed -n 's/.*darkModeDefault: \(true\|false\).*/\1/p' "$THEME_FILE" | head -n1)

escape_json() {
  echo "$1" | sed 's/\\/\\\\/g; s/"/\\"/g'
}

escape_template() {
  echo "$1" | sed 's/\\/\\\\/g; s/`/\\`/g'
}

read -rp "Company name [${default_company:-Statusor}]: " company
company="${company:-${default_company:-Statusor}}"

read -rp "Logo URL [${default_logo:-/logo.svg}]: " logo
logo="${logo:-${default_logo:-/logo.svg}}"

read -rp "Primary color hex [${default_primary:-#2563eb}]: " primary
primary="${primary:-${default_primary:-#2563eb}}"

read -rp "Accent color hex [${default_accent:-#22c55e}]: " accent
accent="${accent:-${default_accent:-#22c55e}}"

read -rp "Website link [${default_website:-https://status.statusor.invalid}]: " website
website="${website:-${default_website:-https://status.statusor.invalid}}"

read -rp "Support link (mailto or URL) [${default_support:-mailto:support@statusor.invalid}]: " support
support="${support:-${default_support:-mailto:support@statusor.invalid}}"

read -rp "Docs link [${default_docs:-https://docs.statusor.invalid}]: " docs
docs="${docs:-${default_docs:-https://docs.statusor.invalid}}"

read -rp "About title [About this status page]: " about_title
about_title="${about_title:-About this status page}"

read -rp "About description (single line) [Status for ${company}]: " about_body
about_body="${about_body:-Status for ${company}}"

read -rp "Start in dark mode? (y/n) [${default_dark:-true}]: " dark_input
case "${dark_input:-${default_dark:-true}}" in
  y|Y|yes|true) dark_mode=true ;;
  *) dark_mode=false ;;
esac

company_e="$(escape_json "$company")"
logo_e="$(escape_json "$logo")"
primary_e="$(escape_json "$primary")"
accent_e="$(escape_json "$accent")"
website_e="$(escape_json "$website")"
support_e="$(escape_json "$support")"
docs_e="$(escape_json "$docs")"
about_title_e="$(escape_json "$about_title")"
about_body_e="$(escape_template "$about_body")"

cat > "$THEME_FILE" <<EOF
const BASE_PATH = import.meta.env.BASE_URL ?? "/";

export const THEME = {
  companyName: "${company_e}",
  logoUrl: "${logo_e}",
  primaryColor: "${primary_e}",
  accentColor: "${accent_e}",
  darkModeDefault: ${dark_mode},
  links: {
    website: "${website_e}",
    support: "${support_e}",
    docs: "${docs_e}",
  },
  aboutPage: {
    title: "${about_title_e}",
    body: \`
${about_body_e}
    \`,
  },
};

export default THEME;
EOF

echo "Updated theme config at src/config/theme.config.ts"
echo "Tip: run 'npm run dev' to preview changes or set VITE_ENABLE_DEMO=true for the demo route."
