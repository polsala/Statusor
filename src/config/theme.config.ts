const BASE_PATH = import.meta.env.BASE_URL ?? "/";

export const THEME = {
  companyName: "Example Corp",
  logoUrl: "/logo.svg",
  primaryColor: "#2563eb",
  accentColor: "#22c55e",
  darkModeDefault: true,
  links: {
    website: "https://status.statusor.invalid",
    support: "mailto:support@statusor.invalid",
    docs: "https://docs.statusor.invalid",
  },
  aboutPage: {
    title: "About this status page",
    body: `
Status for Example Corp
    `,
  },
};

export default THEME;
