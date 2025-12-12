const BASE_PATH = import.meta.env.BASE_URL ?? "/";

export const THEME = {
  companyName: "Example Corp",
  logoUrl: `${BASE_PATH}logo.svg`,
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
This status page provides real-time and historical information about the availability of Example Corp services.
If you are experiencing an issue that is not reported here, please contact support.
    `,
  },
};
