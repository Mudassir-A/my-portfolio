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
  themeColor: "#faf6ee",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <noscript>
          <style>{".rv{opacity:1!important;transform:none!important}"}</style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
