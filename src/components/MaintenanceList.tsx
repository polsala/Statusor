import type { ScheduledMaintenance, Service } from "../types/status";
import StatusBadge from "./StatusBadge";

interface MaintenanceListProps {
  maintenance: ScheduledMaintenance[];
  getServiceById: (id: string) => Service | undefined;
}

export function MaintenanceList({ maintenance, getServiceById }: MaintenanceListProps) {
  if (!maintenance.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
        No scheduled maintenance.
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {maintenance.map((item) => (
        <div
          key={item.id}
          className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/70"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              {item.title}
            </h3>
            <StatusBadge status="maintenance" />
          </div>
          {item.description && (
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              {item.description}
            </p>
          )}
          <div className="mt-3 text-sm text-slate-500 dark:text-slate-400">
            <p>
              {new Date(item.startAt).toLocaleString()} → {new Date(item.endAt).toLocaleString()}
            </p>
            <p className="mt-1">
              Affects: {item.serviceIds.map((id) => getServiceById(id)?.name ?? id).join(", ")}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MaintenanceList;
