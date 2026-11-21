import Reveal from "./Reveal";
import {
  SUMMARY,
  SKILLS,
  EXPERIENCE,
  EDUCATION,
  PROJECTS,
  CERTIFICATIONS,
  EMAIL,
  PHONE,
  PHONE_HREF,
  LINKEDIN,
  GITHUB,
} from "../lib/data";

function Section({ id, title, children }) {
  return (
    <Reveal as="section" id={id} className="section" aria-labelledby={`${id}-h`}>
      <h2 id={`${id}-h`}>{title}</h2>
      {children}
    </Reveal>
  );
}

function Points({ items }) {
  return (
    <ul className="points">
      {items.map((p) => (
        <li key={p}>{p}</li>
      ))}
    </ul>
  );
}

export function Summary() {
  return (
    <Section id="summary" title="Profile Summary">
      <p className="prose">{SUMMARY}</p>
    </Section>
  );
}

export function Skills() {
  return (
    <Section id="skills" title="Technical Skills">
      <dl className="skills">
        {SKILLS.map(([group, items]) => (
          <div key={group} className="skill-row">
            <dt>{group}</dt>
            <dd>{items}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

export function Experience() {
  return (
    <Section id="experience" title="Work Experience">
      <ol className="entries">
        {EXPERIENCE.map((e) => (
          <li key={e.org} className="entry">
            <div className="entry-head">
              <h3>{e.role}</h3>
              <span className="meta">{e.period}</span>
            </div>
            <p className="sub">{e.org}, {e.place}</p>
            <Points items={e.points} />
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function Education() {
  return (
    <Section id="education" title="Education">
      <ol className="entries">
        {EDUCATION.map((e) => (
          <li key={e.degree} className="entry">
            <div className="entry-head">
              <h3>{e.degree}</h3>
              <span className="meta">{e.year}</span>
            </div>
            <p className="sub">{e.school} · {e.score}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function Projects() {
  return (
    <Section id="projects" title="Projects">
      <ol className="entries">
        {PROJECTS.map((p) => (
          <li key={p.title} className="entry">
            <div className="entry-head">
              <h3>{p.title}</h3>
              <span className="meta">{p.date}</span>
            </div>
            <p className="sub">
              {p.stack}
              {p.url && (
                <>
                  {" · "}
                  <a href={p.url} target="_blank" rel="noopener noreferrer">
                    Link<span className="sr"> to {p.title} (opens in new tab)</span>
                  </a>
                </>
              )}
            </p>
            <Points items={p.points} />
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function Certifications() {
  return (
    <Section id="certifications" title="Certifications">
      <ul className="entries plain">
        {CERTIFICATIONS.map(([name, issuer]) => (
          <li key={name} className="entry">
            <div className="entry-head">
              <h3>{name}</h3>
              <span className="meta">{issuer}</span>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function Contact() {
  return (
    <Section id="contact" title="Contact Details">
      <dl className="skills">
        <div className="skill-row">
          <dt>Email</dt>
          <dd><a href={`mailto:${EMAIL}`}>{EMAIL}</a></dd>
        </div>
        <div className="skill-row">
          <dt>Phone</dt>
          <dd><a href={`tel:${PHONE_HREF}`}>{PHONE}</a></dd>
        </div>
        <div className="skill-row">
          <dt>LinkedIn</dt>
          <dd><a href={LINKEDIN.url} target="_blank" rel="noopener noreferrer">{LINKEDIN.label}</a></dd>
        </div>
        <div className="skill-row">
          <dt>GitHub</dt>
          <dd><a href={GITHUB.url} target="_blank" rel="noopener noreferrer">{GITHUB.label}</a></dd>
        </div>
      </dl>
    </Section>
  );
}
