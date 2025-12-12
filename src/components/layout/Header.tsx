import { NavLink } from "react-router-dom";
import { THEME } from "../../config/theme.config";
import { FEATURES } from "../../config/app.config";

interface HeaderProps {
  darkMode: boolean;
  onToggleTheme: () => void;
}

const navClasses = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
    isActive
      ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
      : "text-slate-700 hover:bg-slate-200 dark:text-slate-200 dark:hover:bg-slate-800"
  }`;

export function Header({ darkMode, onToggleTheme }: HeaderProps) {
  return (
    <header className="w-full border-b border-slate-200 bg-white/70 backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <img src={THEME.logoUrl} alt={THEME.companyName} className="h-9 w-9" />
          <div>
            <p className="text-lg font-semibold text-slate-900 dark:text-white">
              {THEME.companyName}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Status dashboard
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <nav className="flex items-center gap-1">
            <NavLink to="/" className={navClasses} end>
              Overview
            </NavLink>
            <NavLink to="/incidents" className={navClasses}>
              Incidents
            </NavLink>
            <NavLink to="/about" className={navClasses}>
              About
            </NavLink>
            {FEATURES.enableDemo && (
              <NavLink to="/demo" className={navClasses}>
                Demo
              </NavLink>
            )}
          </nav>
          <button
            onClick={onToggleTheme}
            className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            aria-label="Toggle theme"
          >
            {darkMode ? "Light mode" : "Dark mode"}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
