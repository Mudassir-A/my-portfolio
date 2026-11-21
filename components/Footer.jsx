import { NAME } from "../lib/data";

export default function Footer() {
  return (
    <footer className="site-footer">
      <span>© {new Date().getFullYear()} {NAME}</span>
      <a href="#top">Back to top ↑</a>
    </footer>
  );
}
