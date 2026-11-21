import "./globals.css";
import { NAME, ROLE, SUMMARY } from "../lib/data";

export const metadata = {
  title: `${NAME} · ${ROLE}`,
  description: SUMMARY,
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          try {
            const theme = localStorage.getItem("portfolio-theme");
            if (theme === "light" || theme === "dark") document.documentElement.dataset.theme = theme;
          } catch {}
        ` }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
