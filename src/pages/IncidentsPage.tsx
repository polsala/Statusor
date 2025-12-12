import IncidentsTimeline from "../components/IncidentsTimeline";
import { useStatusData } from "../hooks/useStatusData";

export function IncidentsPage() {
  const { incidents, getServiceById } = useStatusData();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-wide text-slate-500 dark:text-slate-400">
            History
          </p>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
            Incident timeline
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Chronological list of current and past incidents across all services.
          </p>
        </div>
      </div>
      <IncidentsTimeline incidents={incidents} getServiceById={getServiceById} />
    </div>
  );
}

export default IncidentsPage;
