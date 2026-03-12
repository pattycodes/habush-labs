"use client";

import { useEffect, useRef } from "react";

const CELL = 10;
const FONT_SIZE = 9;
const ROTATION_SPEED = 0.5;

// Dense character ramp for smooth shading
const CHARS = " .·:∙∶▫▪◆■◈⊗●◉█";

// Amber liquid palette — brighter, richer
const liquidPalette: [number, number, number][] = [
  [220, 160, 55],
  [200, 140, 45],
  [180, 120, 38],
  [160, 100, 30],
  [140, 82, 24],
  [120, 66, 20],
  [100, 52, 16],
  [80, 40, 12],
  [60, 28, 10],
  [40, 18, 8],
];

// Glass palette
const glassPalette: [number, number, number][] = [
  [140, 130, 110],
  [110, 100, 85],
  [80, 72, 62],
  [55, 50, 42],
  [38, 34, 28],
  [24, 22, 18],
  [14, 12, 10],
  [8, 7, 6],
];

// Snake palette — olive/dark with highlights
const snakePalette: [number, number, number][] = [
  [160, 140, 60],
  [130, 115, 48],
  [105, 92, 38],
  [82, 72, 30],
  [62, 54, 24],
  [45, 38, 18],
  [30, 26, 14],
  [18, 16, 10],
];

function lerp3(p: [number, number, number][], t: number): [number, number, number] {
  const c = Math.max(0, Math.min(1, t));
  const idx = c * (p.length - 1);
  const i = Math.floor(idx);
  const f = idx - i;
  const a = p[Math.min(i, p.length - 1)];
  const b = p[Math.min(i + 1, p.length - 1)];
  return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f];
}

function smoothstep(e0: number, e1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
}

// Habushu jar — wide body, short neck (scaled down to fit with padding)
const JAR_SCALE = 0.55; // shrink entire jar to ~55% so it doesn't hit edges
function jarRadius(y: number): number {
  if (y < 0 || y > 1) return 0;
  let r = 0;
  if (y < 0.04) r = smoothstep(0, 0.04, y) * 0.40;
  else if (y < 0.07) r = 0.40;
  // Wide body with barrel curve
  else if (y < 0.60) {
    const t = (y - 0.07) / 0.53;
    r = 0.40 + Math.sin(t * Math.PI) * 0.04;
  }
  // Shoulder taper
  else if (y < 0.72) {
    const t = (y - 0.60) / 0.12;
    const e = t * t * (3 - 2 * t);
    r = 0.44 * (1 - e) + 0.11 * e;
  }
  // Neck
  else if (y < 0.80) r = 0.11;
  // Lip
  else if (y < 0.84) {
    const t = (y - 0.80) / 0.04;
    r = 0.11 + 0.035 * Math.sin(t * Math.PI);
  }
  // Cloth wrap — bulging, decorative
  else if (y < 0.94) {
    const t = (y - 0.84) / 0.10;
    r = 0.15 + Math.sin(t * Math.PI) * 0.08;
  }
  // Tied top
  else if (y < 1.0) {
    const t = (y - 0.94) / 0.06;
    r = 0.12 * (1 - t);
  }
  return r * JAR_SCALE;
}

// Snake as a 3D helix — much thicker, check both front and back faces
function snakeTest(nx: number, ny: number, theta: number): {
  hit: boolean; dist: number; phase: number; depth: number;
} {
  if (ny < 0.06 || ny > 0.58) return { hit: false, dist: 999, phase: 0, depth: 0 };

  const COILS = 5;
  const SAMPLES = 120;
  const THICKNESS = 0.045;

  let minDist = 999;
  let bestPhase = 0;
  let bestDepth = 0;
  let hit = false;

  for (let i = 0; i < SAMPLES; i++) {
    const t = i / SAMPLES;
    const sy = 0.08 + t * 0.48;
    const angle = t * COILS * Math.PI * 2 + theta;

    // Coil radius — scaled to fit inside smaller jar
    const coilR = (0.20 + Math.sin(t * Math.PI) * 0.10) * JAR_SCALE;
    const wobble = (Math.sin(t * 13) * 0.015 + Math.sin(t * 7) * 0.01) * JAR_SCALE;

    const sx = Math.cos(angle) * (coilR + wobble);
    const sz = Math.sin(angle) * (coilR + wobble);

    const dx = nx - sx;
    const dy = ny - sy;
    const d = Math.sqrt(dx * dx + dy * dy);

    // Thickness varies — fatter in middle, thinner at tail
    const thick = THICKNESS * JAR_SCALE * (0.5 + 0.5 * Math.sin(t * Math.PI));

    if (d < minDist) {
      minDist = d;
      bestPhase = t;
      bestDepth = sz;
    }

    if (d < thick) {
      hit = true;
      if (d < minDist) {
        minDist = d;
        bestPhase = t;
        bestDepth = sz;
      }
    }
  }

  return { hit, dist: minDist, phase: bestPhase, depth: bestDepth };
}

// Snake head — diamond/triangular, at top of last coil
function headTest(nx: number, ny: number, theta: number): {
  isHead: boolean; isEye: boolean; isTongue: boolean;
} {
  const t = 1.0; // end of snake
  const angle = t * 5 * Math.PI * 2 + theta;
  const hx = Math.cos(angle) * 0.14 * JAR_SCALE;
  const hz = Math.sin(angle);
  const hy = 0.54;

  // Hide head when facing away
  if (hz < -0.1) return { isHead: false, isEye: false, isTongue: false };

  const dx = nx - hx;
  const dy = ny - hy;

  // Diamond head shape
  const headW = 0.06 * JAR_SCALE;
  const headH = 0.035 * JAR_SCALE;
  if (Math.abs(dx) / headW + Math.abs(dy) / headH < 1) {
    // Eyes — two dots near top of head
    const eyeSpacing = 0.025 * JAR_SCALE;
    const eyeY = hy + 0.008 * JAR_SCALE;
    const isLeftEye = Math.abs(nx - (hx - eyeSpacing)) < 0.008 * JAR_SCALE && Math.abs(ny - eyeY) < 0.008 * JAR_SCALE;
    const isRightEye = Math.abs(nx - (hx + eyeSpacing)) < 0.008 * JAR_SCALE && Math.abs(ny - eyeY) < 0.008 * JAR_SCALE;
    if (isLeftEye || isRightEye) return { isHead: true, isEye: true, isTongue: false };
    return { isHead: true, isEye: false, isTongue: false };
  }

  // Forked tongue — extends forward from head
  const dir = Math.sign(Math.cos(angle)) || 1;
  const tx = (nx - hx) * dir;
  const ty = ny - hy;
  if (tx > 0.02 * JAR_SCALE && tx < 0.08 * JAR_SCALE) {
    const forkSpread = (tx - 0.02 * JAR_SCALE) * 0.5;
    if (Math.abs(ty) < 0.005 * JAR_SCALE || // stem
        (tx > 0.04 * JAR_SCALE && (Math.abs(ty - forkSpread) < 0.005 * JAR_SCALE || Math.abs(ty + forkSpread) < 0.005 * JAR_SCALE))) {
      return { isHead: false, isEye: false, isTongue: true };
    }
  }

  return { isHead: false, isEye: false, isTongue: false };
}

// Lighting
const lightDir = (() => {
  const x = 0.5, y = 0.3, z = 0.85;
  const l = Math.sqrt(x * x + y * y + z * z);
  return { x: x / l, y: y / l, z: z / l };
})();

const fillDir = (() => {
  const x = -0.6, y = 0.1, z = 0.5;
  const l = Math.sqrt(x * x + y * y + z * z);
  return { x: x / l, y: y / l, z: z / l };
})();

const BG_CHARS = ".·:∙∶+×◇◆▫▪■●◈⊗";
const BG_DENSITY = 0.96; // near-total fill

export default function BottleMosaic() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let theta = 0;
    let cols = 0;
    let rows = 0;
    let lastTime = 0;

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      cols = Math.floor(rect.width / CELL);
      rows = Math.floor(rect.height / CELL);
      canvas.width = cols * CELL;
      canvas.height = rows * CELL;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouse);

    function draw(timestamp: number) {
      const dt = lastTime ? (timestamp - lastTime) / 1000 : 0.016;
      lastTime = timestamp;
      theta += ROTATION_SPEED * dt;

      const w = cols;
      const h = rows;
      if (w === 0 || h === 0) { animationId = requestAnimationFrame(draw); return; }

      ctx!.fillStyle = "#000";
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);
      ctx!.font = `${FONT_SIZE}px "Space Mono", monospace`;
      ctx!.textAlign = "center";
      ctx!.textBaseline = "middle";

      const cosT = Math.cos(theta);
      const sinT = Math.sin(theta);
      const tiltX = (mouseRef.current.x - 0.5) * 0.1;

      const scale = 0.75;
      const cx = w / 2;
      const bh = h * scale;
      const oy = (h - bh) / 2;

      // Liquid surface
      const liqTop = 0.58;
      const slosh = Math.sin(theta * 2) * 0.015 + Math.sin(theta * 3) * 0.008;

      for (let row = 0; row < h; row++) {
        const ny = 1 - (row - oy) / bh;

        for (let col = 0; col < w; col++) {
          const nx = (col - cx) / bh;
          const R = (ny >= 0 && ny <= 1) ? jarRadius(ny) : 0;
          if (R <= 0 || Math.abs(nx) > R) {
            // Dense animated mosaic background
            const rng = ((row * 311 + col * 173 + 42) * 16807) % 2147483647;
            const rngNorm = rng / 2147483647;
            if (rngNorm > BG_DENSITY) continue;

            const r3 = ((rng * 48271) % 2147483647) / 2147483647;

            // Animated character cycling — chars shift over time based on position
            const charWave = Math.sin(col * 0.15 + row * 0.1 + theta * 2) * 0.5 + 0.5;
            const charIdx = Math.floor((r3 + charWave) * BG_CHARS.length) % BG_CHARS.length;
            const bgCh = BG_CHARS[charIdx];

            // Multiple overlapping animated waves — all integer theta multiples for seamless loop
            const wave1 = Math.sin(col * 0.12 + theta) * 0.18;
            const wave2 = Math.sin(row * 0.10 - theta) * 0.15;
            const wave3 = Math.sin((col + row) * 0.06 + theta * 2) * 0.13;
            const wave4 = Math.sin((col - row) * 0.08 + theta * 3) * 0.10;
            const wave5 = Math.sin(col * 0.04 + row * 0.03 + theta * 2) * 0.08;
            // Ripple from center
            const dcx = col - w / 2;
            const dcy = row - h / 2;
            const distC = Math.sqrt(dcx * dcx + dcy * dcy);
            const ripple = Math.sin(distC * 0.08 - theta * 2) * 0.12;

            const wave = wave1 + wave2 + wave3 + wave4 + wave5 + ripple;

            // Vignette — darker edges
            const vx = dcx / w;
            const vy = dcy / h;
            const vignette = 1 - Math.sqrt(vx * vx + vy * vy) * 0.5;

            // Brightness: high base for dense fill + waves
            const bgB = Math.max(0.12, Math.min(0.75, 0.40 + wave * 0.6 + vignette * 0.15 + (r3 - 0.5) * 0.08));

            // Animated color — hue shifts with waves
            const vertT = row / h;
            const hueShift = Math.sin(col * 0.05 + theta) * 0.15 + Math.sin(row * 0.04 - theta) * 0.1;
            const colorT = Math.max(0, Math.min(1, vertT + hueShift));

            let cr: number, cg: number, cb: number;
            if (colorT < 0.3) {
              // Deep red zone
              const t = colorT / 0.3;
              cr = 110 + t * 50; cg = 38 + t * 25; cb = 38 - t * 8;
            } else if (colorT < 0.6) {
              // Orange zone
              const t = (colorT - 0.3) / 0.3;
              cr = 160 + t * 40; cg = 63 + t * 45; cb = 30 - t * 5;
            } else {
              // Bright amber zone
              const t = (colorT - 0.6) / 0.4;
              cr = 200 + t * 20; cg = 108 + t * 50; cb = 25 + t * 10;
            }

            cr = Math.min(255, (cr * bgB) | 0);
            cg = Math.min(255, (cg * bgB) | 0);
            cb = Math.min(255, (cb * bgB) | 0);

            ctx!.fillStyle = `rgb(${cr},${cg},${cb})`;
            ctx!.fillText(bgCh, col * CELL + CELL / 2, row * CELL + CELL / 2);
            continue;
          }

          // Inside jar
          const nxN = nx / R;
          const nzN = Math.sqrt(Math.max(0, 1 - nxN * nxN));

          const rnx = nxN * cosT - nzN * sinT + tiltX;
          const rnz = nxN * sinT + nzN * cosT;

          // Lighting
          const diff = Math.max(0, rnx * lightDir.x + rnz * lightDir.z);
          const fillL = Math.max(0, rnx * fillDir.x + rnz * fillDir.z) * 0.3;
          const hx2 = lightDir.x, hz2 = lightDir.z + 1;
          const hL = Math.sqrt(hx2 * hx2 + hz2 * hz2);
          const specDot = Math.max(0, (rnx * hx2 + rnz * hz2) / hL);
          const spec = Math.pow(specDot, 18);
          const spec2 = Math.pow(specDot, 4) * 0.1;
          const rim = Math.pow(1 - Math.abs(nzN), 2.5) * 0.4;

          const liqLevel = liqTop + slosh * nxN;
          const inLiquid = ny < liqLevel && ny > 0.05 && ny < 0.60;
          const isCloth = ny > 0.84 && ny < 0.97;

          // Snake checks
          const snake = snakeTest(nx, ny, theta);
          const head = headTest(nx, ny, theta);

          let brightness: number;
          let r: number, g: number, b: number;

          if (head.isTongue && inLiquid) {
            // Tongue — bright red
            brightness = 0.8;
            r = 200; g = 50; b = 35;
          } else if (head.isEye) {
            // Eyes — bright yellow
            brightness = 1.0;
            r = 220; g = 200; b = 50;
          } else if ((head.isHead || snake.hit) && inLiquid) {
            // Snake body
            const snakeLight = 0.35 + diff * 0.3 + spec * 0.15 + rim * 0.25;
            // Scale shimmer
            const shimmer = Math.sin(snake.phase * 80 + theta) * 0.12 +
              Math.sin(snake.phase * 40) * 0.08;
            // Depth — back coils darker
            const depthFade = snake.depth > 0 ? 1.0 : 0.6;
            brightness = Math.min(1, (snakeLight + shimmer) * depthFade);

            // Color bands on snake
            const bandT = (Math.sin(snake.phase * 25) + 1) * 0.5;
            if (bandT > 0.7) {
              // Light band
              const ct = (1 - brightness) * 0.3;
              [r, g, b] = lerp3(snakePalette, ct);
            } else {
              // Dark band
              const ct = 0.3 + (1 - brightness) * 0.4;
              [r, g, b] = lerp3(snakePalette, ct);
            }

            if (head.isHead) {
              brightness = Math.min(1, brightness + 0.15);
              [r, g, b] = lerp3(snakePalette, (1 - brightness) * 0.25);
            }
          } else if (isCloth) {
            // Cloth/ribbon wrap — bold and visible
            const phi = Math.atan2(rnz, rnx);
            const pattern = Math.sin(phi * 5 + ny * 50) * 0.3 + Math.sin(phi * 8 - ny * 30) * 0.2;
            brightness = Math.min(1, 0.55 + diff * 0.25 + pattern * 0.3 + rim * 0.2);

            const clothT = (Math.sin(phi * 4 + ny * 25) + 1) * 0.5;
            if (clothT > 0.65) {
              // Red
              r = (200 * brightness) | 0; g = (60 * brightness) | 0; b = (45 * brightness) | 0;
            } else if (clothT > 0.35) {
              // Gold
              r = (220 * brightness) | 0; g = (175 * brightness) | 0; b = (55 * brightness) | 0;
            } else {
              // Deep red
              r = (165 * brightness) | 0; g = (50 * brightness) | 0; b = (40 * brightness) | 0;
            }
          } else if (inLiquid) {
            // Amber liquid — significantly brighter base
            const caustic = Math.sin(nxN * 5 + theta * 3) * 0.05 + Math.sin(ny * 8 - theta * 2) * 0.04;
            const edgeDark = nxN * nxN * 0.1;

            brightness = Math.min(1,
              0.40 + diff * 0.25 + fillL + spec * 0.2 + spec2 + rim * 0.5 + caustic - edgeDark
            );

            // Meniscus
            if (Math.abs(ny - liqLevel) < 0.025) brightness += 0.12;

            // Glow near snake
            if (snake.dist < 0.12) brightness += (0.12 - snake.dist) * 1.2;

            const ct = (1 - ny / 0.60) * 0.35 + (1 - brightness) * 0.25;
            [r, g, b] = lerp3(liquidPalette, ct);
          } else {
            // Glass — above liquid / neck — needs to be visible to show jar shape
            brightness = Math.min(1, 0.30 + diff * 0.2 + spec * 0.4 + spec2 + rim * 0.6);

            // Neck/shoulder gets extra brightness so outline is clear
            if (ny > 0.60 && ny < 0.84) {
              // Outline the glass edges more
              const edgeness = Math.pow(Math.abs(nxN), 4);
              brightness += edgeness * 0.3;
            }

            const ct = 0.15 + (1 - brightness) * 0.4;
            [r, g, b] = lerp3(glassPalette, ct);
          }

          // Map brightness to character
          const ci = Math.floor(brightness * (CHARS.length - 1));
          const ch = CHARS[Math.min(ci, CHARS.length - 1)];
          if (ch === " ") continue;

          const d = (Math.random() - 0.5) * 3;
          ctx!.fillStyle = `rgb(${Math.max(0, Math.min(255, r + d)) | 0},${Math.max(0, Math.min(255, g + d)) | 0},${Math.max(0, Math.min(255, b + d)) | 0})`;
          ctx!.fillText(ch, col * CELL + CELL / 2, row * CELL + CELL / 2);
        }
      }

      animationId = requestAnimationFrame(draw);
    }

    animationId = requestAnimationFrame(draw);
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: "block" }}
    />
  );
}
