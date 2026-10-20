"use client";
import { useEffect, useState } from "react";
import { NAME, EMAIL, NAV } from "../lib/data";

function toggleTheme() {
  const root = document.documentElement;
  const current = root.getAttribute("data-theme");
  const dark = current
    ? current === "dark"
    : window.matchMedia("(prefers-color-scheme: dark)").matches;
  const next = dark ? "light" : "dark";
  root.setAttribute("data-theme", next);
  try {
    localStorage.setItem("theme", next);
  } catch (e) { }
}

export default function Header() {
  const [active, setActive] = useState("about");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const read = () => {
      const attr = document.documentElement.getAttribute("data-theme");
      setDark(attr ? attr === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches);
    };
    read();
    const mo = new MutationObserver(read);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", read);
    return () => {
      mo.disconnect();
      mq.removeEventListener("change", read);
    };
  }, []);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    NAV.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <header>
      <nav className="nav-pill" aria-label="Sections">
        <a className="brand" href="#top">
          {NAME}
          <span>.</span>
        </a>
        <div className="links">
          {NAV.map(([id, label]) => (
            <a key={id} className={`l${active === id ? " on" : ""}`} href={`#${id}`}>
              {label}
            </a>
          ))}
        </div>
        <button
          id="theme"
          type="button"
          aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          title={dark ? "Switch to light mode" : "Switch to dark mode"}
          onClick={toggleTheme}
        >
          {dark ? "☀" : "☾"}
        </button>
        <a className="btn btn-primary btn-sm" href={`mailto:${EMAIL}`}>
          say hi →
        </a>
      </nav>
    </header>
  );
}