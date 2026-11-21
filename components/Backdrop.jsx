"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const CursorGrid = dynamic(() => import("./CursorGrid"), { ssr: false });

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
  const backdrop = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [palette, setPalette] = useState(null);

  useEffect(() => {
    const intro = backdrop.current?.parentElement;
    if (!intro) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    function activate(event) {
      if (motion.matches || event.pointerType === "touch") return;
      setPalette(readPalette());
      setEnabled(true);
      intro.removeEventListener("pointermove", activate);
    }

    function syncMotion() {
      if (!motion.matches) return;
      setEnabled(false);
      intro.addEventListener("pointermove", activate, { passive: true });
    }

    intro.addEventListener("pointermove", activate, { passive: true });
    motion.addEventListener("change", syncMotion);
    return () => {
      intro.removeEventListener("pointermove", activate);
      motion.removeEventListener("change", syncMotion);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
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
  }, [enabled]);

  return (
    <div ref={backdrop} className="backdrop" aria-hidden="true">
      {enabled && (
        <CursorGrid
          cellSize={36}
          radius={165}
          highlight="area"
          gridStyle="dots"
          holdTime={500}
          fadeDuration={900}
          fillOpacity={0.045}
          gridOpacity={0.11}
          spotlight={1}
          clickPulse
          ambient={0}
          edgeFade={0.5}
          dpr={1}
          color={palette.color}
          gridColor={palette.gridColor}
        />
      )}
    </div>
  );
}
