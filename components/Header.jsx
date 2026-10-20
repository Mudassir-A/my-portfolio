"use client";
import { useEffect, useState } from "react";
import { NAME, SECTIONS } from "../lib/data";

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
  } catch (e) {}
}

export default function Header() {
  const [active, setActive] = useState("about");

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
    SECTIONS.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <header>
      <nav aria-label="Sections">
        <a className="brand" href="#about">{NAME}</a>
        {SECTIONS.map(([id, label]) => (
          <a key={id} className={`l${active === id ? " on" : ""}`} href={`#${id}`}>
            {label}
          </a>
        ))}
        <button id="theme" type="button" aria-label="Toggle theme" onClick={toggleTheme}>
          ◐
        </button>
      </nav>
    </header>
  );
}
