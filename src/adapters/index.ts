import { httpPingAdapter } from "./httpPingAdapter";
import { staticJsonAdapter } from "./staticJsonAdapter";
import type { StatusAdapter } from "./types";

export const ADAPTERS: Record<string, StatusAdapter> = {
  http_ping: httpPingAdapter,
  static_json: staticJsonAdapter,
};

export function getAdapterById(id: string): StatusAdapter | undefined {
  return ADAPTERS[id];
}
