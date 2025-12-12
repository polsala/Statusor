import type { Incident, Service } from "../types/status";
import StatusBadge from "./StatusBadge";

interface IncidentsTimelineProps {
  incidents: Incident[];
  getServiceById: (id: string) => Service | undefined;
  limit?: number;
}

const statusTone: Record<Incident["status"], string> = {
  investigating: "text-amber-600",
  identified: "text-amber-600",
  monitoring: "text-blue-600",
  resolved: "text-emerald-600",
};

export function IncidentsTimeline({ incidents, getServiceById, limit }: IncidentsTimelineProps) {
  const sorted = [...incidents].sort(
    (a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime(),
  );
  const visible = typeof limit === "number" ? sorted.slice(0, limit) : sorted;

  if (!visible.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
        No incidents to display.
      </div>
    );
  }

  return (
    <ol className="relative space-y-6 border-l border-slate-200 pl-6 dark:border-slate-800">
      {visible.map((incident) => (
        <li key={incident.id} className="relative">
          <span className="absolute -left-[11px] mt-1 h-3 w-3 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500" aria-hidden />
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/70">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  {new Date(incident.startedAt).toLocaleString()}
                </p>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {incident.title}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-semibold uppercase ${statusTone[incident.status]}`}>
                  {incident.status}
                </span>
                <span
                  className={`rounded-full px-2 py-1 text-xs font-semibold ${incident.impact === "major" ? "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-200" : "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-200"}`}
                >
                  {incident.impact} impact
                </span>
              </div>
            </div>
            {incident.description && (
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                {incident.description}
              </p>
            )}
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <StatusBadge status={incident.status === "resolved" ? "operational" : "degraded"} />
              <span className="h-1 w-1 rounded-full bg-slate-300" aria-hidden />
              <p>
                Affects: {incident.serviceIds.map((id) => getServiceById(id)?.name ?? id).join(", ")}
              </p>
              {incident.resolvedAt && (
                <>
                  <span className="h-1 w-1 rounded-full bg-slate-300" aria-hidden />
                  <p>Resolved at {new Date(incident.resolvedAt).toLocaleString()}</p>
                </>
              )}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}

export default IncidentsTimeline;
