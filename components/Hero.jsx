import { NAME, SKILLS } from "../lib/data";
import NeuralNet from "./NeuralNet";

export default function Hero() {
  return (
    <section id="about" aria-label="about">
      <div className="hero">
        <div>
          <h1 className="script">hi, i'm {NAME}. i train models and build agents</h1>
          {/* <p className="lede">hi, i&apos;m {NAME}, i train models and build agents</p> */}
          <ul className="chips">
            {SKILLS.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
        <NeuralNet />
      </div>
    </section>
  );
}
