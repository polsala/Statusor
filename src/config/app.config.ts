const BASE_PATH = import.meta.env.BASE_URL ?? "/";

// Demo is off by default. It can be enabled via env flags or when serving the
// repo's GitHub Pages demo (base path contains /Statusor/).
const demoEnvFlag =
  import.meta.env.VITE_ENABLE_DEMO === "true" ||
  import.meta.env.VITE_DEMO_MODE === "true";
const demoRepoBasePath = BASE_PATH.includes("/Statusor/");

export const FEATURES = {
  enableDemo: Boolean(demoEnvFlag || demoRepoBasePath),
};

export default FEATURES;
