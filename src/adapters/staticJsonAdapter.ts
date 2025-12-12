import type {
  Incident,
  ScheduledMaintenance,
  StatusSnapshot,
  StatusLevel,
  Service,
} from "../types/status";
import type { StatusAdapter } from "./types";

const BASE_PATH = import.meta.env.BASE_URL ?? "/";

type StaticJsonPayload = {
  snapshots?: StatusSnapshot[];
  incidents?: Incident[];
  scheduled?: ScheduledMaintenance[];
  status?: StatusLevel;
  updatedAt?: string;
  uptimeLast30d?: number;
};

async function fetchJson(url: string): Promise<StaticJsonPayload> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch static JSON from ${url}`);
  }
  return response.json();
}

export const staticJsonAdapter: StatusAdapter = {
  id: "static_json",
  async getStatusSnapshots(
    serviceIds: string[],
    services: Service[],
  ): Promise<StatusSnapshot[]> {
    const relevant = services.filter((svc) => serviceIds.includes(svc.id));
    const now = new Date().toISOString();
    const tasks = relevant.map(async (service) => {
      const url = service.adapterConfig?.url;
      if (!url) {
        throw new Error(`Missing url for service ${service.id}`);
      }
      try {
        const data = await fetchJson(url);
        if (data.snapshots && data.snapshots.length) {
          return data.snapshots.find((snap) => snap.serviceId === service.id);
        }
        if (data.status && data.updatedAt) {
          return {
            serviceId: service.id,
            status: data.status,
            updatedAt: data.updatedAt,
            uptimeLast30d: data.uptimeLast30d,
          } satisfies StatusSnapshot;
        }
        return {
          serviceId: service.id,
          status: "major_outage" as StatusLevel,
          updatedAt: now,
        } satisfies StatusSnapshot;
      } catch (error) {
        console.error(`static_json adapter error for ${service.id}`, error);
        return {
          serviceId: service.id,
          status: "major_outage" as StatusLevel,
          updatedAt: now,
        } satisfies StatusSnapshot;
      }
    });

    const results = await Promise.allSettled(tasks);
    const snapshots: StatusSnapshot[] = [];
    results.forEach((result) => {
      if (result.status === "fulfilled" && result.value) {
        snapshots.push(result.value);
      }
    });
    return snapshots;
  },

  async getIncidents(): Promise<Incident[]> {
    try {
      const payload = await fetchJson(`${BASE_PATH}data/incidents.json`);
      return payload.incidents ?? [];
    } catch (error) {
      console.error("static_json adapter incidents error", error);
      return [];
    }
  },

  async getScheduledMaintenance(): Promise<ScheduledMaintenance[]> {
    try {
      const payload = await fetchJson(`${BASE_PATH}data/maintenance.json`);
      return payload.scheduled ?? [];
    } catch (error) {
      console.error("static_json adapter maintenance error", error);
      return [];
    }
  },
};
