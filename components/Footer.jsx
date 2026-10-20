import { NAME, SOCIALS } from "../lib/data";

export default function Footer() {
  return (
    <footer>
      <ul>
        {SOCIALS.map(([label, url]) => (
          <li key={label}>
            <a href={url} target="_blank" rel="noopener noreferrer">{label}</a>
          </li>
        ))}
      </ul>
      <span>© {new Date().getFullYear()} {NAME}</span>
    </footer>
  );
}
