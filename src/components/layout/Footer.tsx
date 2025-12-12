import { THEME } from "../../config/theme.config";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/60 backdrop-blur dark:border-slate-800 dark:bg-slate-900/60">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-6 text-sm text-slate-500 dark:text-slate-400 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-medium text-slate-700 dark:text-slate-200">
            {THEME.companyName}
          </p>
          <p>Tracking uptime and reliability with transparency.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <a href={THEME.links.website} className="hover:text-slate-900 dark:hover:text-white">
            Website
          </a>
          <a href={THEME.links.support} className="hover:text-slate-900 dark:hover:text-white">
            Support
          </a>
          <a href={THEME.links.docs} className="hover:text-slate-900 dark:hover:text-white">
            Docs
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
