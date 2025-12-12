import IncidentsTimeline from "../components/IncidentsTimeline";
import MaintenanceList from "../components/MaintenanceList";
import StatusBadge from "../components/StatusBadge";
import StatusOverview from "../components/StatusOverview";
import { useStatusData } from "../hooks/useStatusData";
import { computeGlobalStatus } from "../types/status";
import { Link } from "react-router-dom";

export function HomePage() {
  const { loading, error, snapshots, incidents, scheduled, services, getServiceById } =
    useStatusData();

  const global = computeGlobalStatus(snapshots);
  const latestUpdate = snapshots.length
    ? snapshots
        .map((snap) => new Date(snap.updatedAt).getTime())
        .reduce((max, current) => Math.max(max, current), 0)
    : undefined;

  const openOrRecentIncidents = incidents.filter((incident) => {
    if (incident.status !== "resolved") return true;
    if (!incident.resolvedAt) return true;
    const resolvedAgo = Date.now() - new Date(incident.resolvedAt).getTime();
    return resolvedAgo < 1000 * 60 * 60 * 24 * 7; // past 7 days
  });

  const upcomingMaintenance = scheduled.filter(
    (item) => new Date(item.endAt).getTime() >= Date.now(),
  );

  return (
    <div className="flex flex-col gap-10">
      <section className="gradient-card relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-800 dark:bg-slate-900/70">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-blue-500/20 to-emerald-400/20 blur-3xl" />
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Global status
            </p>
            <h1 className="mt-1 text-3xl font-semibold text-slate-900 dark:text-white">
              {global.label}
            </h1>
            {latestUpdate && (
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Updated at {new Date(latestUpdate).toLocaleString()}
              </p>
            )}
          </div>
          <div className="flex flex-col items-end gap-2">
            <StatusBadge status={global.level} />
            {loading && (
              <p className="text-xs text-slate-500 dark:text-slate-400">Refreshing...</p>
            )}
          </div>
        </div>
        {error && (
          <p className="mt-4 rounded-lg bg-rose-100 px-4 py-3 text-sm text-rose-700 dark:bg-rose-900/40 dark:text-rose-200">
            {error}
          </p>
        )}
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Services
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Configured via src/config/status.config.ts
          </p>
        </div>
        <StatusOverview services={services} snapshots={snapshots} />
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Incidents
            </h3>
            <Link
              to="/incidents"
              className="text-sm text-blue-600 hover:underline dark:text-blue-400"
            >
              View all
            </Link>
          </div>
          <IncidentsTimeline
            incidents={openOrRecentIncidents}
            getServiceById={getServiceById}
            limit={3}
          />
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Scheduled maintenance
            </h3>
          </div>
          <MaintenanceList maintenance={upcomingMaintenance} getServiceById={getServiceById} />
        </div>
      </section>
    </div>
  );
}

export default HomePage;
