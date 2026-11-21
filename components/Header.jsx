"use client";
import { useEffect, useState } from "react";
import { NAME, NAV } from "../lib/data";
import ThemeToggle from "./ThemeToggle";
import ScrollBar from "./ScrollBar";

export default function Header() {
  const [active, setActive] = useState("");

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    NAV.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <header className="site-header">
      <nav className="nav" aria-label="Sections">
        <a className="brand" href="#top">{NAME}</a>
        <ul className="nav-links">
          {NAV.map(([id, label]) => (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={active === id ? "true" : undefined}
                className={active === id ? "on" : undefined}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <ThemeToggle />
      </nav>
      <ScrollBar />
    </header>
  );
}
