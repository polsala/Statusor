import StatusBadge from "./StatusBadge";
import type { Service, StatusSnapshot } from "../types/status";

interface ServiceCardProps {
  service: Service;
  snapshot?: StatusSnapshot;
}

const ICON_FALLBACKS: Record<string, string> = {
  api: "🛰️",
  globe: "🕸️",
  shield: "🛡️",
  db: "🗄️",
};

export function ServiceCard({ service, snapshot }: ServiceCardProps) {
  const icon = ICON_FALLBACKS[service.icon ?? ""] ?? "🟢";
  const uptime = snapshot?.uptimeLast30d;
  const uptimeText =
    typeof uptime === "number" ? `${uptime.toFixed(2)}%` : "N/A";
  const updatedAt = snapshot?.updatedAt
    ? new Date(snapshot.updatedAt).toLocaleString()
    : "Unknown";

  return (
    <div className="gradient-card relative flex flex-col gap-3 rounded-2xl border border-slate-200 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/60">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-lg dark:bg-slate-800">
            <span role="img" aria-label={service.icon ?? "service icon"}>
              {icon}
            </span>
          </div>
          <div>
            <p className="text-base font-semibold text-slate-900 dark:text-white">
              {service.name}
            </p>
            {service.description && (
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {service.description}
              </p>
            )}
          </div>
        </div>
        {snapshot ? (
          <StatusBadge status={snapshot.status} />
        ) : (
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:bg-slate-800 dark:text-slate-300">
            Unknown
          </span>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
        <p>Uptime 30d: {uptimeText}</p>
        <span className="h-1 w-1 rounded-full bg-slate-400" aria-hidden />
        <p>Last update: {updatedAt}</p>
        {service.slaTarget && (
          <>
            <span className="h-1 w-1 rounded-full bg-slate-400" aria-hidden />
            <p>SLA: {service.slaTarget}%</p>
          </>
        )}
      </div>
    </div>
  );
}

export default ServiceCard;
