import type { Service } from "../types/status";

const BASE_PATH = import.meta.env.BASE_URL ?? "/";

export const SERVICES: Service[] = [
  {
    id: "api-core",
    name: "Core API",
    description: "Main API that powers the platform.",
    group: "Backend",
    icon: "api",
    adapter: "static_json",
    adapterConfig: {
      url: `${BASE_PATH}data/api-core-status.json`,
    },
    slaTarget: 99.9,
  },
  {
    id: "webapp",
    name: "Web Application",
    description: "Customer-facing web application.",
    group: "Frontend",
    icon: "globe",
    adapter: "static_json",
    adapterConfig: {
      url: `${BASE_PATH}data/webapp-status.json`,
    },
    slaTarget: 99.5,
  },
  {
    id: "auth",
    name: "Authentication",
    description: "Identity and session service.",
    group: "Backend",
    icon: "shield",
    adapter: "static_json",
    adapterConfig: {
      url: `${BASE_PATH}data/auth-status.json`,
    },
    slaTarget: 99.9,
  },
];
