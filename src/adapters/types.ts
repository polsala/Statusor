import type {
  StatusSnapshot,
  Incident,
  ScheduledMaintenance,
} from "../types/status";
import type { Service } from "../types/status";

export interface StatusAdapter {
  id: string;
  getStatusSnapshots(
    serviceIds: string[],
    services: Service[],
  ): Promise<StatusSnapshot[]>;
  getIncidents?(): Promise<Incident[]>;
  getScheduledMaintenance?(): Promise<ScheduledMaintenance[]>;
}
