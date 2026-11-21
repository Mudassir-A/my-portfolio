import { Fragment } from "react";
import Backdrop from "./Backdrop";
import { NAME, ROLE, LOCATION, INTRO } from "../lib/data";

export default function Intro() {
  return (
    <section id="top" className="intro" aria-labelledby="name">
      <Backdrop />
      <p className="eyebrow">{ROLE} · {LOCATION}</p>
      <h1 id="name" aria-label={NAME}>
        {NAME.split(" ").map((word, index) => (
          <Fragment key={word}>
            {index > 0 && " "}
            <span className="name-word" aria-hidden="true" style={{ "--word": index }}>
              <span>{word}</span>
            </span>
          </Fragment>
        ))}
      </h1>
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
