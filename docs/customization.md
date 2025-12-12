# Branding & Page Customization

Statusor is built to be branded and copy-tuned from config files—no code changes needed for typical tweaks.

## Quick start
1) Edit `src/config/theme.config.ts` to set your company name, colors, logo, and key links.
2) Update status data and service metadata in `src/config/status.config.ts`.
3) Run `npm run dev` to preview changes; `npm run build` to produce a static bundle.

## Branding controls (`src/config/theme.config.ts`)
Example:
```ts
export const THEME = {
  companyName: "Acme Cloud",
  logoUrl: "/logo.svg",        // use a hosted URL or replace public/logo.svg
  primaryColor: "#0f172a",     // Tailwind-compatible hex values
  accentColor: "#22c55e",
  darkModeDefault: true,       // set false to start in light mode
  links: {
    website: "https://status.acme.com",
    support: "mailto:support@acme.com",
    docs: "https://docs.acme.com/status",
  },
  aboutPage: {
    title: "About Acme status",
    body: `
This page shows live availability for Acme Cloud services.
Contact support if you notice an issue that is not posted here.
    `,
  },
};
```

Notes:
- `logoUrl` respects the build base path (`import.meta.env.BASE_URL`); keep it relative when serving from subpaths.
- The header/footer links and about page copy come directly from this file.
- Colors are injected as CSS variables; any valid hex will work.

## Content and layout
- **Service order and grouping**: controlled via `group` and array order in `src/config/status.config.ts`.
- **Icons**: set `icon` per service (e.g., `"globe"`, `"shield"`, `"api"`). Add more in `src/components/icons`.
- **Demo page**: `/demo` is a guided walkthrough; update copy under `src/demo/` if you want to change it.

## Adding custom pages or routes
1) Create a new page under `src/pages/`.
2) Register it in `src/router.tsx` to add a route.
3) Add navigation links in `src/components/layout/Header.tsx` if you want it visible in the top bar.

## Deploying with branding intact
- Branding lives in config files, so the built `dist/` folder is portable.
- If hosting under a subdirectory (e.g., `https://status.example.com/app/`), set `BASE_PATH` during build: `BASE_PATH="/app/" npm run build`.
