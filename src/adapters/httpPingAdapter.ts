import type { StatusSnapshot, Service, StatusLevel } from "../types/status";
import type { StatusAdapter } from "./types";

interface HttpPingConfig {
  url: string;
  expectedStatus?: number;
  timeoutMs?: number;
}

async function pingService(config: HttpPingConfig): Promise<StatusLevel> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), config.timeoutMs ?? 5000);
  try {
    const response = await fetch(config.url, { signal: controller.signal });
    clearTimeout(timeout);
    const expected = config.expectedStatus ?? 200;
    if (response.status === expected) {
      return "operational";
    }
    return "degraded";
  } catch (error) {
    console.error("http_ping adapter error", error);
    return "major_outage";
  }
}

export const httpPingAdapter: StatusAdapter = {
  id: "http_ping",
  async getStatusSnapshots(
    serviceIds: string[],
    services: Service[],
  ): Promise<StatusSnapshot[]> {
    const now = new Date().toISOString();
    const relevant = services.filter((svc) => serviceIds.includes(svc.id));

    const tasks = relevant.map(async (service) => {
      const config = service.adapterConfig as HttpPingConfig | undefined;
      if (!config?.url) {
        throw new Error(`Missing http_ping url for service ${service.id}`);
      }
      const status = await pingService(config);
      return {
        serviceId: service.id,
        status,
        updatedAt: now,
      } satisfies StatusSnapshot;
    });

    const results = await Promise.allSettled(tasks);
    const snapshots: StatusSnapshot[] = [];
    results.forEach((result) => {
      if (result.status === "fulfilled") {
        snapshots.push(result.value);
      }
    });
    return snapshots;
  },
};
