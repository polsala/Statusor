import type { StatusLevel } from "../types/status";

interface StatusBadgeProps {
  status: StatusLevel;
}

const STATUS_STYLES: Record<StatusLevel, string> = {
  operational: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200",
  degraded: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-200",
  partial_outage: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-200",
  major_outage: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-200",
  maintenance: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200",
};

const STATUS_LABELS: Record<StatusLevel, string> = {
  operational: "Operational",
  degraded: "Degraded",
  partial_outage: "Partial outage",
  major_outage: "Major outage",
  maintenance: "Maintenance",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${STATUS_STYLES[status]}`}
    >
      <span className="h-2 w-2 rounded-full bg-current" aria-hidden />
      {STATUS_LABELS[status]}
    </span>
  );
}

export default StatusBadge;
