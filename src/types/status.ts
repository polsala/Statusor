export type StatusLevel =
  | "operational"
  | "degraded"
  | "partial_outage"
  | "major_outage"
  | "maintenance";

export interface Service {
  id: string;
  name: string;
  description?: string;
  group?: string;
  icon?: string;
  adapter: string;
  adapterConfig?: any;
  slaTarget?: number;
}

export interface Incident {
  id: string;
  serviceIds: string[];
  title: string;
  description?: string;
  status: "investigating" | "identified" | "monitoring" | "resolved";
  startedAt: string;
  resolvedAt?: string;
  impact: "minor" | "major";
}

export interface ScheduledMaintenance {
  id: string;
  title: string;
  description?: string;
  serviceIds: string[];
  startAt: string;
  endAt: string;
}

export interface StatusSnapshot {
  serviceId: string;
  status: StatusLevel;
  updatedAt: string;
  uptimeLast30d?: number;
}

export interface GlobalStatus {
  level: StatusLevel;
  label: string;
}

export const statusPriority: Record<StatusLevel, number> = {
  operational: 0,
  degraded: 1,
  partial_outage: 2,
  major_outage: 3,
  maintenance: 1,
};

export function computeGlobalStatus(snapshots: StatusSnapshot[]): GlobalStatus {
  if (!snapshots.length) {
    return { level: "operational", label: "Status unknown" };
  }
  const worst = snapshots.reduce((max, snap) => {
    return statusPriority[snap.status] > statusPriority[max]
      ? snap.status
      : max;
  }, "operational" as StatusLevel);

  switch (worst) {
    case "operational":
      return { level: worst, label: "All systems operational" };
    case "degraded":
    case "maintenance":
      return { level: worst, label: "Some systems may be degraded" };
    case "partial_outage":
      return { level: worst, label: "Partial outage detected" };
    default:
      return { level: worst, label: "Major outage impacting services" };
  }
}
