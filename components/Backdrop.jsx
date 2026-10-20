"use client";
import { useEffect, useState } from "react";
import CursorGrid from "./CursorGrid";

const HEX = /^#[0-9a-f]{6}$/i;

function readPalette() {
  const s = getComputedStyle(document.documentElement);
  const pick = (name, fallback) => {
    const v = s.getPropertyValue(name).trim();
    return HEX.test(v) ? v : fallback;
  };
  return {
    color: pick("--acc", "#2563eb"),
    gridColor: pick("--mute", "#55627a"),
  };
}

export default function Backdrop() {
  const [palette, setPalette] = useState(() =>
    typeof document !== "undefined" ? readPalette() : { color: "#2563eb", gridColor: "#55627a" }
  );

  useEffect(() => {
    const sync = () => setPalette(readPalette());
    sync();

    const mo = new MutationObserver(sync);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", sync);

    return () => {
      mo.disconnect();
      mq.removeEventListener("change", sync);
    };
  }, []);

  return (
    <div className="backdrop" aria-hidden="true">
      <CursorGrid
        cellSize={44}
        radius={200}
        highlight="area"
        gridStyle="lines"
        holdTime={500}
        fadeDuration={900}
        fillOpacity={0.05}
        gridOpacity={0.14}
        spotlight={1}
        clickPulse
        ambient={0.35}
        edgeFade={0.25}
        color={palette.color}
        gridColor={palette.gridColor}
      />
    </div>
  );
}