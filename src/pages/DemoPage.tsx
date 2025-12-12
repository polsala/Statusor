import GuidedTour from "../demo/GuidedTour";

export function DemoPage() {
  const themeSnippet = `export const THEME = {
  companyName: "Acme Cloud",
  logoUrl: "/logo.svg",
  primaryColor: "#0f172a",
  accentColor: "#22c55e",
  darkModeDefault: true,
  links: {
    website: "https://status.acme.com",
    support: "mailto:support@acme.com",
    docs: "https://docs.acme.com/status",
  },
};`;

  const servicesSnippet = `export const SERVICES = [
  {
    id: "api-core",
    name: "Core API",
    group: "Backend",
    adapter: "static_json",
    adapterConfig: { url: "/data/api-core-status.json" },
  },
  {
    id: "auth",
    name: "Authentication",
    group: "Security",
    adapter: "http_ping",
    adapterConfig: {
      url: "https://auth.example.com/healthz",
      expectedStatus: 200,
      timeoutMs: 4000,
    },
  },
];`;

  const adapterSnippet = `import type { StatusAdapter } from "./types";

export const monitoringAdapter: StatusAdapter = {
  id: "monitoring_api",
  async getStatusSnapshots(serviceIds, services) {
    // Call your monitoring API and map results
    return serviceIds.map((serviceId) => ({
      serviceId,
      status: "operational",
      updatedAt: new Date().toISOString(),
    }));
  },
};`;

  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Demo workspace
        </p>
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
          Hands-on walkthrough
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Learn how to brand your status page, wire up services, and extend adapters. Use the guided tour to see live UI changes.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Interactive tour
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Use the controls below to simulate outages, tweak theming, and preview customer-facing messaging.
        </p>
        <div className="h-4" aria-hidden="true" />
        <div>
          <GuidedTour />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="lg:col-span-2 space-y-2">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            How-to walkthrough
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Follow these steps to configure, brand, connect services, and extend adapters.
          </p>
        </div>

        <div className="space-y-3 rounded-xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            1) Quick start
          </h2>
          <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-700 dark:text-slate-300">
            <li>Clone or fork, then run <code className="rounded bg-slate-100 px-1 py-0.5 text-[11px] text-slate-700 dark:bg-slate-800 dark:text-slate-100">npm install</code> and <code className="rounded bg-slate-100 px-1 py-0.5 text-[11px] text-slate-700 dark:bg-slate-800 dark:text-slate-100">npm run dev</code>.</li>
            <li>Set branding in <code className="rounded bg-slate-100 px-1 py-0.5 text-[11px] text-slate-700 dark:bg-slate-800 dark:text-slate-100">src/config/theme.config.ts</code>.</li>
            <li>Define services and adapters in <code className="rounded bg-slate-100 px-1 py-0.5 text-[11px] text-slate-700 dark:bg-slate-800 dark:text-slate-100">src/config/status.config.ts</code>.</li>
            <li>Build for production with <code className="rounded bg-slate-100 px-1 py-0.5 text-[11px] text-slate-700 dark:bg-slate-800 dark:text-slate-100">npm run build</code>; host the <code className="rounded bg-slate-100 px-1 py-0.5 text-[11px] text-slate-700 dark:bg-slate-800 dark:text-slate-100">dist/</code> folder anywhere.</li>
          </ol>
        </div>

        <div className="space-y-3 rounded-xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            2) Brand it
          </h2>
          <p className="text-sm text-slate-700 dark:text-slate-300">
            All branding is config-first. Update colors, logo, links, and copy without touching components.
          </p>
          <pre className="overflow-auto rounded-lg border border-slate-200 bg-slate-50 p-4 text-xs text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100">
            <code>{themeSnippet}</code>
          </pre>
        </div>

        <div className="space-y-3 rounded-xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            3) Connect your services
          </h2>
          <p className="text-sm text-slate-700 dark:text-slate-300">
            Mix static JSON feeds and live health checks. Each service picks an adapter and its config.
          </p>
          <pre className="overflow-auto rounded-lg border border-slate-200 bg-slate-50 p-4 text-xs text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100">
            <code>{servicesSnippet}</code>
          </pre>
          <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700 dark:text-slate-300">
            <li><code className="rounded bg-slate-100 px-1 py-0.5 text-[11px] text-slate-700 dark:bg-slate-800 dark:text-slate-100">static_json</code> works great for static hosting; point to any JSON endpoint.</li>
            <li><code className="rounded bg-slate-100 px-1 py-0.5 text-[11px] text-slate-700 dark:bg-slate-800 dark:text-slate-100">http_ping</code> hits lightweight health endpoints and derives status from HTTP codes.</li>
          </ul>
        </div>

        <div className="space-y-3 rounded-xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            4) Extend with custom adapters
          </h2>
          <p className="text-sm text-slate-700 dark:text-slate-300">
            Need PagerDuty, Prometheus, or internal APIs? Add a new adapter and register it in <code className="rounded bg-slate-100 px-1 py-0.5 text-[11px] text-slate-700 dark:bg-slate-800 dark:text-slate-100">src/adapters/index.ts</code>.
          </p>
          <pre className="overflow-auto rounded-lg border border-slate-200 bg-slate-50 p-4 text-xs text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100">
            <code>{adapterSnippet}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}

export default DemoPage;
