# Statusor – Configurable Status Page

An enterprise-ready status page you can brand, connect, and extend. Statusor is React + TypeScript with config-first theming, adapters for your services, and clean UX for customers.

## Features
- Config-driven branding and navigation (`src/config/*`).
- Adapter system (HTTP ping + static JSON included) to pull status, incidents, and maintenance data.
- Simple path to add custom connectors for any service or data source.
- TailwindCSS styling with dark mode toggle and custom colors.
- React Router pages (overview, incidents, about) with extendable routes.
- Basic tests with Vitest and Testing Library.

## Getting Started
### Requirements
- Node.js 18+
- npm (or pnpm/yarn)

### Install & Run
```bash
npm install
npm run dev
```
Visit the URL printed by Vite (usually http://localhost:5173).

### Linting & Tests
```bash
npm run lint
npm test
```

## Documentation
- [Branding & customization](docs/customization.md)
- [Service connections & adapters](docs/service-connections.md)

## Demo mode
- The guided demo route (`/demo`) is off by default.
- Enable it by setting `VITE_ENABLE_DEMO=true` (or `VITE_DEMO_MODE=true`) at build/run time.
- It auto-enables on this repo's GitHub Pages build (base path contains `/Statusor/`).

## Configuration
- **Services**: Edit `src/config/status.config.ts` to add/update services and their adapters.
- **Branding & Theme**: Adjust colors, logo, and copy in `src/config/theme.config.ts`.

## Adapters
Built-in adapters live in `src/adapters/`:
- `static_json`: Fetches status snapshots (and optional incidents/maintenance) from static JSON endpoints.
- `http_ping`: Pings an HTTP endpoint and derives status from the response.

To add an adapter:
1. Create a new file in `src/adapters/` implementing `StatusAdapter`.
2. Register it in `src/adapters/index.ts`.
3. Reference the adapter id in `status.config.ts` for any service.

## Build & Deploy
Create a static bundle and host the `dist` folder on your platform of choice (S3 + CDN, Nginx, Netlify, etc.):
```bash
npm run build
```
- If serving from a subdirectory, set `BASE_PATH` when building (e.g., `BASE_PATH="/status/" npm run build`).

## Project Structure
```
src/
  adapters/        // Adapter implementations and registry
  components/      // UI components
  config/          // Declarative service + theme config
  hooks/           // Data hooks
  pages/           // Routed pages
  types/           // Shared types and helpers
docs/             // Customer-facing how-to guides
public/data/       // Example static JSON data
.github/workflows/ // CI
```

## Extending
- Add more pages/routes via `src/router.tsx`.
- Layer in analytics or logging inside `useStatusData` to trace fetch errors.
- Refine UI tokens by tweaking Tailwind config and THEME colors.
- Explore the guided product demo at `/demo` for a quick, interactive walkthrough.

## Static Data Examples
Sample JSON feeds are under `public/data/` for quick demos. Point adapters to your own endpoints for live data.
