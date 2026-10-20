import { NAME, NAV, SOCIALS } from "../lib/data";

export default function Footer() {
  return (
    <footer>
      <div className="foot-grid">
        <div>
          <div className="foot-brand">
            {NAME}
            <span>.</span>
          </div>
          <p>Machine learning and agentic systems, from prototype to deployment.</p>
        </div>
        <div>
          <h4>explore</h4>
          <ul>
            {NAV.map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`}>{label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>connect</h4>
          <ul>
            {SOCIALS.map(([label, url]) => (
              <li key={label}>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="foot-bottom">
        <span>
          © {new Date().getFullYear()} {NAME}
        </span>
        <a href="#top">back to top ↑</a>
      </div>
    </footer>
  );
}