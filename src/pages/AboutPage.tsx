import { THEME } from "../config/theme.config";

export function AboutPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-wide text-slate-500 dark:text-slate-400">
          About
        </p>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
          {THEME.aboutPage.title}
        </h1>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
        <div className="space-y-3 text-base leading-relaxed text-slate-700 dark:text-slate-200">
          {THEME.aboutPage.body
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean)
            .map((line) => (
              <p key={line}>{line}</p>
            ))}
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/60">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Links
            </h3>
            <ul className="mt-2 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <li>
                Website: <a className="text-blue-600 dark:text-blue-400" href={THEME.links.website}>{THEME.links.website}</a>
              </li>
              <li>
                Support: <a className="text-blue-600 dark:text-blue-400" href={THEME.links.support}>{THEME.links.support}</a>
              </li>
              <li>
                Docs: <a className="text-blue-600 dark:text-blue-400" href={THEME.links.docs}>{THEME.links.docs}</a>
              </li>
            </ul>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/60">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Reliability principles
            </h3>
            <ul className="mt-2 list-disc space-y-2 pl-4 text-sm text-slate-600 dark:text-slate-300">
              <li>Transparent communication on every incident.</li>
              <li>Clear ownership mapped to each service.</li>
              <li>Continuous improvement through postmortems.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
