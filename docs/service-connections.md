# Service Connections & Adapters

Services are defined in `src/config/status.config.ts`. Each service chooses an adapter that knows how to fetch its status.

## Add or edit a service
```ts
export const SERVICES = [
  {
    id: "api-core",
    name: "Core API",
    description: "Main API powering the platform.",
    group: "Backend",           // display group
    icon: "api",                // see icons under src/components/icons
    adapter: "static_json",     // choose how status is fetched
    adapterConfig: {
      url: "/data/api-core-status.json",
    },
    slaTarget: 99.9,
  },
  {
    id: "auth",
    name: "Authentication",
    adapter: "http_ping",
    adapterConfig: {
      url: "https://auth.example.com/healthz",
      expectedStatus: 200,      // optional, defaults to 200
      timeoutMs: 4000,          // optional, defaults to 5000
    },
  },
];
```

- `id` must be unique and stable; it ties incidents/maintenance records to the service.
- `adapter` must match a key in `src/adapters/index.ts`.
- `adapterConfig` is adapter-specific.
- `group` controls display grouping; omit it to keep a service ungrouped.

## Static JSON adapter (`static_json`)
Best for static hosting or when you have an existing JSON feed.

**Config**: set `adapter: "static_json"` and provide a `url` pointing to JSON with one of these shapes:
```json
{
  "status": "operational",
  "updatedAt": "2024-02-01T12:30:00Z",
  "uptimeLast30d": 99.97
}
```
or
```json
{
  "snapshots": [
    { "serviceId": "api-core", "status": "operational", "updatedAt": "2024-02-01T12:30:00Z" }
  ],
  "incidents": [
    { "id": "incident-1", "title": "API outage", "status": "resolved", "startedAt": "2024-02-01T12:00:00Z" }
  ],
  "scheduled": [
    { "id": "maint-1", "title": "DB upgrade", "startAt": "2024-02-05T02:00:00Z", "endAt": "2024-02-05T04:00:00Z" }
  ]
}
```

- Example files live in `public/data/`; you can host them anywhere reachable by the browser.
- When a fetch fails, the adapter marks the service as `major_outage` and logs the error to the console.

## HTTP ping adapter (`http_ping`)
Pings an HTTP endpoint and sets status based on the response code.

**Config**:
```ts
adapter: "http_ping",
adapterConfig: {
  url: "https://api.example.com/healthz",
  expectedStatus: 200,  // treated as operational
  timeoutMs: 5000,      // abort after this many ms
}
```

- Any non-expected status yields `degraded`; network errors/timeouts yield `major_outage`.
- Use lightweight health endpoints; avoid endpoints that require auth or mutate data.

## Adding a new adapter
1) Create `src/adapters/<yourAdapter>.ts` implementing `StatusAdapter` (`src/adapters/types.ts`).
2) Register it in `src/adapters/index.ts` with a unique id string.
3) Reference the new adapter id inside services in `status.config.ts`.

## Tips for reliable connections
- Keep adapter URLs absolute in production to avoid base-path issues.
- If hosting under a subpath, leverage `import.meta.env.BASE_URL` when building URLs (see existing configs).
- Group related services so customers can scan health by domain (e.g., Backend, Customer Experience, Internal).
