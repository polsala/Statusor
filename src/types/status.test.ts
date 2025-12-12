import { computeGlobalStatus, StatusSnapshot } from "./status";

describe("computeGlobalStatus", () => {
  it("returns operational when all services are operational", () => {
    const snapshots: StatusSnapshot[] = [
      { serviceId: "a", status: "operational", updatedAt: "2023-01-01T00:00:00Z" },
      { serviceId: "b", status: "operational", updatedAt: "2023-01-01T00:00:00Z" },
    ];
    const result = computeGlobalStatus(snapshots);
    expect(result.level).toBe("operational");
  });

  it("escalates to major outage when any service is down", () => {
    const snapshots: StatusSnapshot[] = [
      { serviceId: "a", status: "operational", updatedAt: "2023-01-01T00:00:00Z" },
      { serviceId: "b", status: "major_outage", updatedAt: "2023-01-01T00:00:00Z" },
    ];
    const result = computeGlobalStatus(snapshots);
    expect(result.level).toBe("major_outage");
  });
});
