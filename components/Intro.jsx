import { NAME, ROLE, LOCATION, INTRO } from "../lib/data";

export default function Intro() {
  return (
    <section id="top" className="intro" aria-labelledby="name">
      <p className="eyebrow">{ROLE} · {LOCATION}</p>
      <h1 id="name">{NAME}</h1>
      <p className="lede">{INTRO}</p>
      <p className="intro-links">
        <a href="#experience">Experience</a>
        <span aria-hidden="true">·</span>
        <a href="#projects">Projects</a>
        <span aria-hidden="true">·</span>
        <a href="#contact">Contact</a>
      </p>
    </section>
  );
}
