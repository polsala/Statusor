import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { THEME } from "../../config/theme.config";
import Footer from "./Footer";
import Header from "./Header";

const STORAGE_KEY = "statusor:theme";

type ThemeMode = "light" | "dark";

export function PageLayout() {
  const [mode, setMode] = useState<ThemeMode>(THEME.darkModeDefault ? "dark" : "light");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
    if (stored) {
      setMode(stored);
    } else {
      setMode(THEME.darkModeDefault ? "dark" : "light");
    }
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    root.style.setProperty("--primary", THEME.primaryColor);
    root.style.setProperty("--accent", THEME.accentColor);
    root.classList.toggle("dark", mode === "dark");
    root.classList.toggle("light", mode === "light");
    localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-50">
      <Header darkMode={mode === "dark"} onToggleTheme={() => setMode((prev) => (prev === "dark" ? "light" : "dark"))} />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-8 md:py-12">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default PageLayout;
