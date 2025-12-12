import { useMemo } from "react";
import type { Service, StatusSnapshot } from "../types/status";
import ServiceCard from "./ServiceCard";

interface StatusOverviewProps {
  services: Service[];
  snapshots: StatusSnapshot[];
}

export function StatusOverview({ services, snapshots }: StatusOverviewProps) {
  const grouped = useMemo(() => {
    return services.reduce<Record<string, Service[]>>((acc, service) => {
      const group = service.group ?? "Other";
      acc[group] = acc[group] ? [...acc[group], service] : [service];
      return acc;
    }, {});
  }, [services]);

  return (
    <div className="flex flex-col gap-8">
      {Object.entries(grouped).map(([group, servicesInGroup]) => (
        <div key={group} className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              {group}
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent dark:from-slate-800" />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {servicesInGroup.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                snapshot={snapshots.find((snap) => snap.serviceId === service.id)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatusOverview;
