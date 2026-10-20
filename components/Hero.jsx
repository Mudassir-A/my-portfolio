import { NAME, TAGLINE, SKILLS, EMAIL } from "../lib/data";
import NeuralNet from "./NeuralNet";

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div>
        <p className="hey">hey, I&apos;m</p>
        <h1>
          {NAME}
          <span className="dot">.</span>
        </h1>
        <p className="lede">
          {TAGLINE} I work on <b>NLP</b>, <b>RAG</b> and <b>agentic AI</b>, and I care most about
          systems people can trust.
        </p>
        <div className="cta">
          <a className="btn btn-primary" href="#projects">
            see the work →
          </a>
          <a className="btn" href={`mailto:${EMAIL}`}>
            email me
          </a>
        </div>
        <ul className="chips">
          {SKILLS.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>
      <div className="hero-art">
        <NeuralNet />
      </div>
    </section>
  );
}