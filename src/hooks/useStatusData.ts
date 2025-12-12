import { useEffect, useMemo, useState } from "react";
import { SERVICES } from "../config/status.config";
import { getAdapterById } from "../adapters";
import type {
  Incident,
  ScheduledMaintenance,
  Service,
  StatusSnapshot,
} from "../types/status";

const CACHE_TTL_MS = 60_000;

interface CacheEntry {
  snapshots: StatusSnapshot[];
  incidents: Incident[];
  scheduled: ScheduledMaintenance[];
  fetchedAt: number;
}

const cache: CacheEntry = {
  snapshots: [],
  incidents: [],
  scheduled: [],
  fetchedAt: 0,
};

export interface UseStatusDataResult {
  loading: boolean;
  error?: string;
  snapshots: StatusSnapshot[];
  incidents: Incident[];
  scheduled: ScheduledMaintenance[];
  services: Service[];
  getServiceById(id: string): Service | undefined;
}

export function useStatusData(): UseStatusDataResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [snapshots, setSnapshots] = useState<StatusSnapshot[]>(cache.snapshots);
  const [incidents, setIncidents] = useState<Incident[]>(cache.incidents);
  const [scheduled, setScheduled] = useState<ScheduledMaintenance[]>(
    cache.scheduled,
  );

  useEffect(() => {
    const isFresh = Date.now() - cache.fetchedAt < CACHE_TTL_MS;
    if (isFresh && cache.snapshots.length) return;

    let isMounted = true;
    async function load() {
      setLoading(true);
      setError(undefined);
      try {
        const adapterGroups = SERVICES.reduce<Record<string, Service[]>>(
          (acc, service) => {
            const list = acc[service.adapter] ?? [];
            list.push(service);
            acc[service.adapter] = list;
            return acc;
          },
          {},
        );

        const snapshotPromises = Object.entries(adapterGroups).map(
          async ([adapterId, services]) => {
            const adapter = getAdapterById(adapterId);
            if (!adapter) {
              throw new Error(`Adapter ${adapterId} not registered`);
            }
            return adapter.getStatusSnapshots(
              services.map((svc) => svc.id),
              services,
            );
          },
        );

        const incidentPromises = Object.keys(adapterGroups).map(
          async (adapterId) => {
            const adapter = getAdapterById(adapterId);
            if (adapter?.getIncidents) {
              return adapter.getIncidents();
            }
            return [] as Incident[];
          },
        );

        const maintenancePromises = Object.keys(adapterGroups).map(
          async (adapterId) => {
            const adapter = getAdapterById(adapterId);
            if (adapter?.getScheduledMaintenance) {
              return adapter.getScheduledMaintenance();
            }
            return [] as ScheduledMaintenance[];
          },
        );

        const [snapshotResults, incidentResults, maintenanceResults] =
          await Promise.all([
            Promise.all(snapshotPromises),
            Promise.all(incidentPromises),
            Promise.all(maintenancePromises),
          ]);

        const mergedSnapshots = snapshotResults.flat();
        const mergedIncidents = incidentResults.flat();
        const mergedMaintenance = maintenanceResults.flat();

        cache.snapshots = mergedSnapshots;
        cache.incidents = mergedIncidents;
        cache.scheduled = mergedMaintenance;
        cache.fetchedAt = Date.now();

        if (isMounted) {
          setSnapshots(mergedSnapshots);
          setIncidents(mergedIncidents);
          setScheduled(mergedMaintenance);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Unknown error");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const getServiceById = useMemo(
    () => (id: string) => SERVICES.find((s) => s.id === id),
    [],
  );

  return {
    loading,
    error,
    snapshots,
    incidents,
    scheduled,
    services: SERVICES,
    getServiceById,
  };
}
