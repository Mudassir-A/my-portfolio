"use client";
import { useEffect, useRef } from "react";

const LAYERS = [4, 6, 6, 3]; // input, hidden, hidden, output
const STEP = 190; // ms a signal takes to cross one layer
const DECAY = 420; // ms a node glow takes to fade

export default function NeuralNet() {
  const canvasRef = useRef(null);
  const fireAll = useRef(() => {});

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const cx = cv.getContext("2d");
    if (!cx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0;
    let H = 0;
    let layers = [];
    let nodes = [];
    let pulses = [];
    let colors = { acc: "#6b4cff", acc2: "#e0498f", line: "#dcd8ec", surface: "#ffffff" };
    let raf = 0;
    let last = 0;
    let hot = null;
    let hoverCool = 0;
    let disposed = false;
    const ptr = { x: 0, y: 0, tx: 0, ty: 0, infl: 0, target: 0 };

    /* ---------- setup ---------- */
    function readColors() {
      const s = getComputedStyle(document.documentElement);
      const g = (k, d) => s.getPropertyValue(k).trim() || d;
      colors = {
        acc: g("--acc", colors.acc),
        acc2: g("--acc2", colors.acc2),
        line: g("--line", colors.line),
        surface: g("--surface", colors.surface),
      };
    }

    function layout() {
      const r = cv.getBoundingClientRect();
      if (!r.width || !r.height) return;
      W = r.width;
      H = r.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
      cx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const prev = layers;
      layers = LAYERS.map((count, l) =>
        Array.from({ length: count }, (_, i) => {
          const bx = W * (0.12 + (0.76 * l) / (LAYERS.length - 1));
          const by = (H * (i + 1)) / (count + 1);
          const old = prev[l] && prev[l][i];
          return { l, i, bx, by, x: bx, y: by, vx: 0, vy: 0, ev: old ? old.ev : [] };
        })
      );
      nodes = layers.flat();
    }

    /* ---------- geometry ---------- */
    // Edges are curves whose middle is pushed away from the cursor.
    function ctrl(a, b) {
      const mx = (a.x + b.x) / 2;
      const my = (a.y + b.y) / 2;
      if (ptr.infl < 0.001) return [mx, my];
      const dx = mx - ptr.x;
      const dy = my - ptr.y;
      const d = Math.hypot(dx, dy);
      const R = W * 0.34;
      if (d >= R) return [mx, my];
      const s = 1 - d / R;
      const push = s * s * W * 0.12 * ptr.infl;
      const ux = d > 0.001 ? dx / d : 0;
      const uy = d > 0.001 ? dy / d : -1;
      return [mx + ux * push, my + uy * push];
    }

    function qpt(a, b, c, t) {
      const u = 1 - t;
      return [
        u * u * a.x + 2 * u * t * c[0] + t * t * b.x,
        u * u * a.y + 2 * u * t * c[1] + t * t * b.y,
      ];
    }

    function activation(n, now) {
      let v = 0;
      for (let k = 0; k < n.ev.length; k++) {
        const dt = now - n.ev[k];
        if (dt >= 0) {
          const x = dt < 60 ? dt / 60 : Math.exp(-(dt - 60) / DECAY);
          if (x > v) v = x;
        }
      }
      return v;
    }

    function hit(x, y) {
      const lim = Math.max(24, W * 0.06);
      let best = null;
      let bd = Infinity;
      for (const n of nodes) {
        const d = Math.min(Math.hypot(n.x - x, n.y - y), Math.hypot(n.bx - x, n.by - y));
        if (d < lim && d < bd) {
          best = n;
          bd = d;
        }
      }
      return best;
    }

    /* ---------- firing ---------- */
    // Sends a signal forward from the given nodes to the output layer.
    function fireFrom(starts) {
      if (!layers.length || !starts.length) return;
      const t0 = performance.now();
      let cur = starts;
      cur.forEach((n) => n.ev.push(t0));
      const last = layers.length - 1;
      for (let l = starts[0].l + 1; l <= last; l++) {
        const t = t0 + (l - starts[0].l) * STEP;
        let next = l === last ? layers[l] : layers[l].filter(() => Math.random() < 0.75);
        if (!next.length) next = [layers[l][Math.floor(Math.random() * layers[l].length)]];
        cur.forEach((a) => next.forEach((b) => pulses.push({ a, b, start: t - STEP })));
        next.forEach((b) => b.ev.push(t));
        cur = next;
      }
      kick();
    }
    fireAll.current = () => fireFrom(layers[0]);

    /* ---------- animation ---------- */
    function step(dt) {
      ptr.infl += (ptr.target - ptr.infl) * Math.min(1, dt * 8);
      if (Math.abs(ptr.target - ptr.infl) < 0.002) ptr.infl = ptr.target;
      const k = Math.min(1, dt * 20);
      ptr.x += (ptr.tx - ptr.x) * k;
      ptr.y += (ptr.ty - ptr.y) * k;

      const R = W * 0.3;
      const A = W * 8;
      const damp = Math.exp(-10 * dt);
      let moving = false;
      for (const n of nodes) {
        let ax = (n.bx - n.x) * 90;
        let ay = (n.by - n.y) * 90;
        if (ptr.infl > 0) {
          const dx = n.x - ptr.x;
          const dy = n.y - ptr.y;
          const d = Math.hypot(dx, dy);
          if (d < R) {
            const s = 1 - d / R;
            const f = s * s * A * ptr.infl;
            const ux = d > 0.001 ? dx / d : 1;
            const uy = d > 0.001 ? dy / d : 0;
            ax += ux * f;
            ay += uy * f;
          }
        }
        n.vx = (n.vx + ax * dt) * damp;
        n.vy = (n.vy + ay * dt) * damp;
        n.x += n.vx * dt;
        n.y += n.vy * dt;
        if (
          Math.abs(n.x - n.bx) > 0.05 || Math.abs(n.y - n.by) > 0.05 ||
          Math.abs(n.vx) > 0.05 || Math.abs(n.vy) > 0.05
        ) {
          moving = true;
        } else {
          n.x = n.bx;
          n.y = n.by;
          n.vx = 0;
          n.vy = 0;
        }
      }
      return moving;
    }

    function draw(now) {
      if (!W || !H) return;
      cx.clearRect(0, 0, W, H);
      cx.lineWidth = 1;

      // resting edges
      cx.strokeStyle = colors.line;
      cx.globalAlpha = 1;
      for (let l = 0; l < layers.length - 1; l++) {
        for (const a of layers[l]) {
          for (const b of layers[l + 1]) {
            const c = ctrl(a, b);
            cx.beginPath();
            cx.moveTo(a.x, a.y);
            cx.quadraticCurveTo(c[0], c[1], b.x, b.y);
            cx.stroke();
          }
        }
      }

      // lit edges and travelling signal dots
      cx.strokeStyle = colors.acc2;
      cx.fillStyle = colors.acc2;
      cx.lineWidth = 1.6;
      for (const p of pulses) {
        const t = (now - p.start) / STEP;
        if (t < 0) continue;
        const fade = t <= 1 ? 0.35 + 0.4 * t : Math.max(0, 0.75 - (t - 1) * (STEP / 450) * 0.75);
        if (fade <= 0) continue;
        const c = ctrl(p.a, p.b);
        cx.globalAlpha = fade;
        cx.beginPath();
        cx.moveTo(p.a.x, p.a.y);
        cx.quadraticCurveTo(c[0], c[1], p.b.x, p.b.y);
        cx.stroke();
        if (t <= 1) {
          const q = qpt(p.a, p.b, c, t);
          cx.globalAlpha = 1;
          cx.beginPath();
          cx.arc(q[0], q[1], Math.max(2.5, W * 0.009), 0, Math.PI * 2);
          cx.fill();
        }
      }
      cx.globalAlpha = 1;

      // nodes
      const r = Math.max(6, W * 0.024);
      cx.lineWidth = 2;
      for (const n of nodes) {
        const v = activation(n, now);
        if (v > 0.02) {
          cx.fillStyle = colors.acc2;
          cx.globalAlpha = v * 0.3;
          cx.beginPath();
          cx.arc(n.x, n.y, r * (1.7 + v * 0.6), 0, Math.PI * 2);
          cx.fill();
          cx.globalAlpha = 1;
        }
        const on = v > 0.1;
        cx.fillStyle = on ? colors.acc2 : colors.surface;
        cx.strokeStyle = on ? colors.acc2 : colors.acc;
        cx.beginPath();
        cx.arc(n.x, n.y, r, 0, Math.PI * 2);
        cx.fill();
        cx.stroke();
        if (n === hot) {
          cx.strokeStyle = colors.acc;
          cx.lineWidth = 1.5;
          cx.beginPath();
          cx.arc(n.x, n.y, r + 5, 0, Math.PI * 2);
          cx.stroke();
          cx.lineWidth = 2;
        }
      }
    }

    function frame(ts) {
      raf = 0;
      if (disposed) return;
      const dt = Math.min(Math.max((ts - last) / 1000, 0.001), 0.033);
      last = ts;
      const now = performance.now();

      pulses = pulses.filter((p) => now < p.start + STEP + 500);
      let evLeft = false;
      for (const n of nodes) {
        if (n.ev.length) {
          n.ev = n.ev.filter((e) => now - e < 2500);
          if (n.ev.length) evLeft = true;
        }
      }
      const moving = step(dt);
      draw(now);

      if (moving || evLeft || pulses.length || ptr.infl > 0.002 || ptr.target > 0) {
        raf = requestAnimationFrame(frame);
      }
    }

    function kick() {
      if (raf || disposed) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }

    /* ---------- pointer input ---------- */
    function rel(e) {
      const r = cv.getBoundingClientRect();
      return [e.clientX - r.left, e.clientY - r.top];
    }
    const wantsRepel = (e) => !reduce && (e.pointerType === "mouse" || e.pointerType === "pen");

    function onEnter(e) {
      const [x, y] = rel(e);
      ptr.x = ptr.tx = x;
      ptr.y = ptr.ty = y;
      if (wantsRepel(e)) ptr.target = 1;
      if (e.pointerType === "mouse") {
        const now = performance.now();
        if (now > hoverCool) {
          hoverCool = now + 900;
          fireFrom(layers[0]); // hover: input layer -> output layer
        }
      }
      kick();
    }
    function onMove(e) {
      const [x, y] = rel(e);
      ptr.tx = x;
      ptr.ty = y;
      if (wantsRepel(e)) ptr.target = 1;
      const h = hit(x, y);
      if (h !== hot) {
        hot = h;
        cv.style.cursor = h ? "pointer" : "crosshair";
      }
      kick();
    }
    function onLeave() {
      ptr.target = 0;
      hot = null;
      cv.style.cursor = "crosshair";
      kick();
    }
    function onClick(e) {
      const [x, y] = rel(e);
      const n = hit(x, y);
      fireFrom(n ? [n] : layers[0]); // click a node: fire from that node
    }

    /* ---------- boot ---------- */
    readColors();
    layout();
    kick();

    cv.addEventListener("pointerenter", onEnter);
    cv.addEventListener("pointermove", onMove);
    cv.addEventListener("pointerleave", onLeave);
    cv.addEventListener("click", onClick);

    const ro = typeof ResizeObserver !== "undefined"
      ? new ResizeObserver(() => { layout(); kick(); })
      : null;
    if (ro) ro.observe(cv);

    const mo = new MutationObserver(() => { readColors(); kick(); });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onScheme = () => { readColors(); kick(); };
    if (mq.addEventListener) mq.addEventListener("change", onScheme);
    else if (mq.addListener) mq.addListener(onScheme);

    const intro = setTimeout(() => fireFrom(layers[0]), 900);

    return () => {
      disposed = true;
      clearTimeout(intro);
      if (raf) cancelAnimationFrame(raf);
      cv.removeEventListener("pointerenter", onEnter);
      cv.removeEventListener("pointermove", onMove);
      cv.removeEventListener("pointerleave", onLeave);
      cv.removeEventListener("click", onClick);
      if (ro) ro.disconnect();
      mo.disconnect();
      if (mq.removeEventListener) mq.removeEventListener("change", onScheme);
      else if (mq.removeListener) mq.removeListener(onScheme);
    };
  }, []);

  return (
    <div className="net">
      <canvas
        ref={canvasRef}
        id="cv"
        role="img"
        aria-label="Interactive neural network diagram. Hover to fire the whole network, click a node to fire from it."
      />
      <p>
        [{LAYERS.join(", ")}] · hover to fire · click a node{" "}
        <button type="button" className="fire" onClick={() => fireAll.current()}>
          fire
        </button>
      </p>
    </div>
  );
}
