"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const system = window.matchMedia("(prefers-color-scheme: dark)");
    const root = document.documentElement;

    function sync() {
      const isDark = root.dataset.theme === "dark" ||
        (!root.dataset.theme && system.matches);
      setDark(isDark);
    }

    function syncStorage(event) {
      if (event.key !== "portfolio-theme" && event.key !== null) return;
      const theme = event.newValue;
      if (theme === "light" || theme === "dark") root.dataset.theme = theme;
      else delete root.dataset.theme;
      sync();
    }

    sync();
    system.addEventListener("change", sync);
    window.addEventListener("storage", syncStorage);
    return () => {
      system.removeEventListener("change", sync);
      window.removeEventListener("storage", syncStorage);
    };
  }, []);

  function toggleTheme() {
    const root = document.documentElement;
    const current = root.dataset.theme ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const theme = current === "dark" ? "light" : "dark";
    root.dataset.theme = theme;
    setDark(theme === "dark");
    try {
      localStorage.setItem("portfolio-theme", theme);
    } catch {
      // Switching still works when storage is unavailable.
    }
  }

  return (
    <button className="theme-toggle" type="button" aria-label="Dark mode" aria-pressed={dark} onClick={toggleTheme}>
      <svg className="theme-sun" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
      </svg>
      <svg className="theme-moon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.8 14.2A9 9 0 0 1 9.8 3.2a9 9 0 1 0 11 11Z" />
      </svg>
    </button>
  );
}
