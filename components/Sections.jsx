"use client";
import { useState } from "react";
import Reveal from "./Reveal";
import {
  ABOUT,
  HOW_I_WORK,
  SKILL_GROUPS,
  PROJECTS,
  FILTERS,
  EDUCATION,
  EXPERIENCE,
  EMAIL,
  SOCIALS,
} from "../lib/data";

function Head({ n, tag, title, sub }) {
  return (
    <Reveal className="head">
      <div className="head-num">
        {n} <span>/ 06</span>
      </div>
      <span className="tag">{tag}</span>
      <h2>{title}</h2>
      {sub && <p className="sub">{sub}</p>}
    </Reveal>
  );
}

export function About() {
  return (
    <section id="about">
      <Head n="01" tag="about" title="The short version." />
      <div className="about-grid">
        <Reveal className="about-text">
          {ABOUT.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Reveal>
        <Reveal className="panel">
          <h3 className="panel-title">how i work</h3>
          <ol className="loop">
            {HOW_I_WORK.map(([title, desc], i) => (
              <li key={title}>
                <span className="n">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <b>{title}</b>
                  <p className="d">{desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}

export function Skills() {
  return (
    <section id="skills">
      <Head
        n="02"
        tag="skills"
        title="Tools I use to ship."
        sub="Grouped by what I use them for."
      />
      <div className="skill-grid">
        {SKILL_GROUPS.map((g, i) => (
          <Reveal className="panel" i={i} key={g.title}>
            <h3 className="panel-title">{g.title}</h3>
            <ul className="chips">
              {g.items.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Projects() {
  const [filter, setFilter] = useState("all");
  const list = filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.cat === filter);

  return (
    <section id="projects">
      <Head
        n="03"
        tag="projects"
        title="Things I've built."
        sub="Small, end-to-end projects. Click through for the code."
      />
      <div className="tabs" role="tablist">
        {FILTERS.map(([key, label]) => {
          const count =
            key === "all" ? PROJECTS.length : PROJECTS.filter((p) => p.cat === key).length;
          return (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={filter === key}
              className={`tab${filter === key ? " on" : ""}`}
              onClick={() => setFilter(key)}
            >
              {label}
              <i>{count}</i>
            </button>
          );
        })}
      </div>
      <div className="grid">
        {list.map((p, i) => (
          <Reveal
            as="a"
            i={i}
            key={p.title}
            className="card"
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
          >
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

function Timeline({ items }) {
  return (
    <ol className="tl">
      {items.map((e, i) => (
        <Reveal as="li" i={i} key={e.title}>
          <div className="meta">{e.place}</div>
          <h3>{e.title}</h3>
          <p>{e.text}</p>
        </Reveal>
      ))}
    </ol>
  );
}

export function Education() {
  return (
    <section id="education">
      <Head n="04" tag="education" title="Where it started." />
      <Timeline items={EDUCATION} />
    </section>
  );
}

export function Experience() {
  return (
    <section id="experience">
      <Head n="05" tag="experience" title="Where I work now." />
      <Timeline items={EXPERIENCE} />
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact">
      <Head
        n="06"
        tag="contact"
        title="Want to work together?"
        sub="Questions, feedback or a project in ML or LLMs? Email is the quickest way to reach me."
      />
      <Reveal className="contact">
        <a className="btn btn-primary btn-lg" href={`mailto:${EMAIL}`}>
          ✉ {EMAIL}
        </a>
        <div className="socials">
          {SOCIALS.map(([label, url]) => (
            <a key={label} className="btn" href={url} target="_blank" rel="noopener noreferrer">
              {label} ↗
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}