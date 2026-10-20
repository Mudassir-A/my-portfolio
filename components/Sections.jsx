"use client";
import { useEffect, useRef } from "react";
import Reveal from "./Reveal";
import { PROJECTS, EDUCATION, EXPERIENCE, EMAIL } from "../lib/data";

function Timeline({ items }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let tick = false;
    const update = () => {
      tick = false;
      const r = el.getBoundingClientRect();
      const p = Math.max(0, Math.min(1, (window.innerHeight * 0.7 - r.top) / r.height));
      el.style.setProperty("--p", String(p));
    };
    const onScroll = () => {
      if (!tick) {
        tick = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <ul className="tl" ref={ref}>
      {items.map((e, i) => (
        <Reveal as="li" i={i} key={e.title}>
          <h3>{e.title}</h3>
          <div className="meta">{e.place}</div>
          <p>{e.text}</p>
        </Reveal>
      ))}
    </ul>
  );
}

export function Projects() {
  return (
    <section id="projects" aria-label="projects">
      <Reveal as="h2">projects</Reveal>
      <div className="grid">
        {PROJECTS.map((p, i) => (
          <Reveal as="a" i={i} key={p.title} className="card" href={p.url} target="_blank" rel="noopener noreferrer">
            <span className="k">{p.kind}</span>
            <h3>{p.title}</h3>
            <p>{p.text}</p>
            <span className="go">view on github ↗</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Education() {
  return (
    <section id="education" aria-label="education">
      <Reveal as="h2">education</Reveal>
      <Timeline items={EDUCATION} />
    </section>
  );
}

export function Experience() {
  return (
    <section id="experience" aria-label="experience">
      <Reveal as="h2">experience</Reveal>
      <Timeline items={EXPERIENCE} />
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" aria-label="contact">
      <Reveal as="h2">contact</Reveal>
      <Reveal className="contact">
        <p>question, correction or collaboration on ml? send a note.</p>
        <a className="mail" href={`mailto:${EMAIL}`}>{EMAIL}</a>
      </Reveal>
    </section>
  );
}
