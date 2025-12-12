import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import StatusBadge from "../components/StatusBadge";
import { THEME } from "../config/theme.config";
import type { StatusLevel } from "../types/status";

const tourSteps = [
  {
    id: "configure",
    title: "Configure services declaratively",
    description:
      "Edit src/config/status.config.ts to add services, adapters, SLAs, and icons without touching React components.",
    tip: "Point adapters to your APIs or static JSON feeds for instant data.",
  },
  {
    id: "brand",
    title: "Brand it in minutes",
    description:
      "Tune colors, logo, and copy via src/config/theme.config.ts. Dark mode is built-in with a single toggle.",
    tip: "Drop your logo in public/logo.svg and adjust primary/accent colors.",
  },
  {
    id: "adapt",
    title: "Extend adapters",
    description:
      "Create new adapters in src/adapters/ and register them. Mix HTTP pings with custom data sources.",
    tip: "Expose incidents and maintenance from any backend by implementing the optional methods.",
  },
  {
    id: "deploy",
    title: "Deploy anywhere",
    description:
      "Static build works on GitHub Pages, Netlify, or behind your own CDN. The workflow here ships to Pages.",
    tip: "Set BASE_PATH for subfolder deployments.",
  },
];

const statusOptions: { label: string; value: StatusLevel }[] = [
  { label: "Operational", value: "operational" },
  { label: "Degraded", value: "degraded" },
  { label: "Partial outage", value: "partial_outage" },
  { label: "Major outage", value: "major_outage" },
  { label: "Maintenance", value: "maintenance" },
];

export function GuidedTour() {
  const [activeStep, setActiveStep] = useState(tourSteps[0].id);
  const [demoStatus, setDemoStatus] = useState<StatusLevel>("operational");
  const [previewDark, setPreviewDark] = useState(true);
  const [brandName, setBrandName] = useState(THEME.companyName || "Statusor Demo");
  const [tagline, setTagline] = useState(
    THEME.aboutPage?.title ?? "Enterprise status with transparency.",
  );
  const [primaryColor, setPrimaryColor] = useState(THEME.primaryColor || "#2563eb");
  const [accentColor, setAccentColor] = useState(THEME.accentColor || "#22c55e");
  const [servicesPreview, setServicesPreview] = useState<
    { id: string; name: string; status: StatusLevel }[]
  >([
    { id: "api", name: "Core API", status: "operational" },
    { id: "auth", name: "Authentication", status: "operational" },
    { id: "web", name: "Web App", status: "degraded" },
  ]);

  const step = useMemo(
    () => tourSteps.find((item) => item.id === activeStep) ?? tourSteps[0],
    [activeStep],
  );

  const previewColors = useMemo(
    () =>
      ({
        "--preview-primary": primaryColor,
        "--preview-accent": accentColor,
      }) as CSSProperties,
    [primaryColor, accentColor],
  );

  const updateServiceStatus = (id: string, status: StatusLevel) => {
    setServicesPreview((prev) => prev.map((svc) => (svc.id === id ? { ...svc, status } : svc)));
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200">
                Guided tour
              </span>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200">
                Interactive
              </span>
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-slate-900 dark:text-white">
              Build your status page in four moves
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Walk through the core workflow: configure, brand, extend adapters, and deploy.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {tourSteps.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveStep(item.id)}
                  className={`rounded-2xl border px-4 py-3 text-left transition ${
                    activeStep === item.id
                      ? "border-blue-500 bg-blue-50 shadow-sm dark:border-blue-400/60 dark:bg-blue-900/30"
                      : "border-slate-200 hover:border-blue-300 dark:border-slate-800 dark:hover:border-blue-500/60"
                  }`}
                >
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {item.title}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">{item.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Step detail
          </p>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{step.title}</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">{step.description}</p>
          <div className="mt-3 rounded-xl bg-slate-50 p-3 text-xs text-slate-600 dark:bg-slate-800/60 dark:text-slate-300">
            <strong className="text-slate-800 dark:text-white">Pro tip:</strong> {step.tip}
          </div>

          <div className="mt-6 space-y-3">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">Preview status badge</p>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setDemoStatus(option.value)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide transition ${
                    demoStatus === option.value
                      ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                      : "border border-slate-300 text-slate-700 hover:border-blue-400 dark:border-slate-700 dark:text-slate-200 dark:hover:border-blue-400"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-50 to-white p-4 shadow-sm dark:border-slate-800 dark:from-slate-900 dark:to-slate-900/70">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Live badge preview</p>
                <p className="text-lg font-semibold text-slate-900 dark:text-white">Your service</p>
              </div>
              <StatusBadge status={demoStatus} />
            </div>
          </div>
        </div>
      </div>

      <div
        className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60"
        style={previewColors}
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Live customization
            </p>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Preview branding + services
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Adjust brand, colors, and service states to see what customers will experience.
            </p>
          </div>
          <button
            onClick={() => setPreviewDark((prev) => !prev)}
            className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          >
            {previewDark ? "Preview: Light" : "Preview: Dark"}
          </button>
        </div>

        <div className="mt-4 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Brand name
              </label>
              <input
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-blue-400 dark:focus:ring-blue-900/30"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Customer message
              </label>
              <input
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-blue-400 dark:focus:ring-blue-900/30"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Primary color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="h-10 w-12 cursor-pointer rounded-lg border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900"
                    aria-label="Pick primary color"
                  />
                  <input
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-blue-400 dark:focus:ring-blue-900/30"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Accent color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    className="h-10 w-12 cursor-pointer rounded-lg border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900"
                    aria-label="Pick accent color"
                  />
                  <input
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-blue-400 dark:focus:ring-blue-900/30"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Service states
                </label>
                <button
                  onClick={() =>
                    setServicesPreview([
                      { id: "api", name: "Core API", status: "operational" },
                      { id: "auth", name: "Authentication", status: "operational" },
                      { id: "web", name: "Web App", status: "degraded" },
                    ])
                  }
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-200"
                >
                  Reset
                </button>
              </div>
              <div className="space-y-2">
                {servicesPreview.map((svc) => (
                  <div
                    key={svc.id}
                    className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-800 dark:bg-slate-900/50"
                  >
                    <div className="min-w-[120px] text-sm font-semibold text-slate-800 dark:text-slate-100">
                      {svc.name}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {statusOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => updateServiceStatus(svc.id, option.value)}
                          className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide transition ${
                            svc.status === option.value
                              ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                              : "border border-slate-300 text-slate-700 hover:border-blue-400 dark:border-slate-700 dark:text-slate-200 dark:hover:border-blue-400"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            className={`relative overflow-hidden rounded-2xl border shadow-sm transition ${
              previewDark
                ? "border-slate-800 bg-slate-900 text-slate-100"
                : "border-slate-200 bg-white text-slate-900"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--preview-primary)]/5 via-transparent to-[color:var(--preview-accent)]/10" />
            <div className="relative space-y-4 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Live preview
                  </p>
                  <h4 className="text-xl font-semibold">{brandName || "Your brand"}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    {tagline || "Set customer-facing copy here."}
                  </p>
                </div>
                <button
                  className="rounded-full px-3 py-1 text-xs font-semibold text-white shadow"
                  style={{ backgroundColor: primaryColor }}
                >
                  {previewDark ? "Dark" : "Light"} theme
                </button>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {servicesPreview.map((svc) => (
                  <div
                    key={svc.id}
                    className="rounded-xl border border-slate-200/70 bg-white/60 p-3 shadow-sm backdrop-blur dark:border-slate-800/60 dark:bg-slate-900/70"
                    style={
                      previewDark
                        ? { borderColor: primaryColor }
                        : { borderColor: `${primaryColor}33` }
                    }
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold">{svc.name}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Live endpoint</p>
                      </div>
                      <span className="shrink-0">
                        <StatusBadge status={svc.status} />
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <span
                  className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow-sm"
                  style={{ backgroundColor: accentColor }}
                >
                  Accent CTA
                </span>
                <span
                  className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow-sm"
                  style={{ backgroundColor: primaryColor }}
                >
                  Primary CTA
                </span>
                <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide border border-dashed border-slate-300 text-slate-600 dark:border-slate-700 dark:text-slate-300">
                  BASE_PATH aware
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuidedTour;
