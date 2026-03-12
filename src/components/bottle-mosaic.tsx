"use client";

import { useEffect, useRef } from "react";

const CELL = 14;
const FONT_SIZE = 12;
const ROTATION_SPEED = 0.6;

const CHARS = [" ", ".", "·", "∙", ":", "▪", "■", "◆", "◈", "⊗", "●", "◉"];

const palette: [number, number, number][] = [
  [100, 95, 85],
  [85, 80, 70],
  [70, 65, 50],
  [60, 52, 30],
  [50, 42, 20],
  [42, 32, 15],
  [35, 25, 12],
  [30, 20, 12],
  [28, 15, 14],
  [24, 14, 14],
  [20, 12, 12],
  [15, 8, 8],
  [10, 5, 5],
];

function getColor(t: number): [number, number, number] {
  const clamped = Math.max(0, Math.min(1, t));
  const idx = clamped * (palette.length - 1);
  const i = Math.floor(idx);
  const f = idx - i;
  const c1 = palette[Math.min(i, palette.length - 1)];
  const c2 = palette[Math.min(i + 1, palette.length - 1)];
  return [
    c1[0] + (c2[0] - c1[0]) * f,
    c1[1] + (c2[1] - c1[1]) * f,
    c1[2] + (c2[2] - c1[2]) * f,
  ];
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function bottleRadius(y: number): number {
  if (y < 0 || y > 1) return 0;
  // Base
  if (y < 0.05) return 0.28 + smoothstep(0, 0.05, y) * 0.02;
  // Body
  if (y < 0.55) return 0.3;
  // Shoulder
  if (y < 0.7) {
    const t = (y - 0.55) / 0.15;
    return 0.3 + (0.1 - 0.3) * (0.5 - 0.5 * Math.cos(t * Math.PI));
  }
  // Neck
  if (y < 0.88) return 0.1;
  // Lip
  if (y < 0.92) {
    const t = (y - 0.88) / 0.04;
    return 0.1 + 0.03 * Math.sin(t * Math.PI);
  }
  // Cap
  if (y < 0.98) return 0.11;
  return 0;
}

// Primary light (upper-right-front)
const lx = 0.5, ly = 0.3, lz = 0.8;
const lLen = Math.sqrt(lx * lx + ly * ly + lz * lz);
const lightDir = { x: lx / lLen, y: ly / lLen, z: lz / lLen };

// Fill light (left side, softer)
const flx = -0.6, fly = 0.1, flz = 0.5;
const flLen = Math.sqrt(flx * flx + fly * fly + flz * flz);
const fillLight = { x: flx / flLen, y: fly / flLen, z: flz / flLen };

// Background characters for atmosphere
const BG_CHARS = [".", "·", "∙", ":"];
const BG_DENSITY = 0.12; // fraction of background cells that get a character

export default function BottleMosaic() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      cols = Math.floor(rect.width / CELL);
      rows = Math.floor(rect.height / CELL);
      canvas.width = cols * CELL;
      canvas.height = rows * CELL;
    };

    resize();
    window.addEventListener("resize", resize);

    function draw(timestamp: number) {
      const dt = lastTime ? (timestamp - lastTime) / 1000 : 0.016;
      lastTime = timestamp;
      theta += ROTATION_SPEED * dt;

      const w = cols;
      const h = rows;
      if (w === 0 || h === 0) {
        animationId = requestAnimationFrame(draw);
        return;
      }

      ctx!.fillStyle = "#000";
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);
      ctx!.font = `${FONT_SIZE}px "Space Mono", monospace`;
      ctx!.textAlign = "center";
      ctx!.textBaseline = "middle";

      const cosT = Math.cos(theta);
      const sinT = Math.sin(theta);

      // Bottle is centered horizontally, spans most of vertical space
      const bottleScale = 0.85;
      const centerX = w / 2;
      const bottleHeight = h * bottleScale;
      const offsetY = (h - bottleHeight) / 2;

      // Seed for stable background pattern
      const seed = 42;
      let rng = seed;

      for (let row = 0; row < h; row++) {
        const ny = 1 - (row - offsetY) / bottleHeight;

        for (let col = 0; col < w; col++) {
          const dx = col - centerX;
          const nx = dx / bottleHeight;

          const R = (ny >= 0 && ny <= 1) ? bottleRadius(ny) : 0;
          const isBottle = R > 0 && Math.abs(nx) <= R;

          if (isBottle) {
            // --- BOTTLE RENDERING ---
            const nxNorm = nx / R;
            const nzNorm = Math.sqrt(Math.max(0, 1 - nxNorm * nxNorm));

            // Rotate normal by theta for spinning effect
            const rnx = nxNorm * cosT - nzNorm * sinT;
            const rnz = nxNorm * sinT + nzNorm * cosT;

            // Key light (diffuse)
            const diffuse = Math.max(
              0,
              rnx * lightDir.x + 0 * lightDir.y + rnz * lightDir.z
            );

            // Fill light (softer, from left)
            const fill = Math.max(
              0,
              rnx * fillLight.x + 0 * fillLight.y + rnz * fillLight.z
            ) * 0.4;

            // Specular (Blinn-Phong)
            const hx = lightDir.x;
            const hz = lightDir.z + 1;
            const hLen = Math.sqrt(hx * hx + hz * hz);
            const spec = Math.pow(
              Math.max(0, (rnx * hx + rnz * hz) / hLen),
              16
            );

            // Rim / Fresnel (both edges glow)
            const rim = Math.pow(1 - Math.abs(nzNorm), 2.5) * 0.4;

            // Label pattern — visible stripes on the body
            let labelBrightness = 0;
            if (ny > 0.12 && ny < 0.48) {
              const phi = Math.atan2(rnz, rnx);
              const stripe = Math.sin(phi * 5) * 0.5 + 0.5;
              labelBrightness = stripe * 0.18;
            }

            const brightness = Math.min(
              1,
              0.22 + diffuse * 0.45 + fill + spec * 0.3 + rim + labelBrightness
            );

            // Character selection
            const charIdx = Math.floor(brightness * (CHARS.length - 1));
            const ch = CHARS[Math.min(charIdx, CHARS.length - 1)];
            if (ch === " ") continue;

            // Color: vertical position + brightness modulation
            const colorT = (1 - ny) * 0.6 + (1 - brightness) * 0.25;
            const [r, g, b] = getColor(colorT);

            const dither = (Math.random() - 0.5) * 6;
            ctx!.fillStyle = `rgb(${Math.max(0, Math.min(255, r + dither)) | 0},${Math.max(0, Math.min(255, g + dither)) | 0},${Math.max(0, Math.min(255, b + dither)) | 0})`;
            ctx!.fillText(ch, col * CELL + CELL / 2, row * CELL + CELL / 2);
          } else {
            // --- BACKGROUND ATMOSPHERE ---
            rng = ((row * 311 + col * 173 + seed) * 16807) % 2147483647;
            const rand1 = rng / 2147483647;
            if (rand1 > BG_DENSITY) continue;

            rng = (rng * 16807) % 2147483647;
            const rand2 = rng / 2147483647;
            const bgChar = BG_CHARS[Math.floor(rand2 * BG_CHARS.length)];

            // Animate brightness with slow wave
            const wave =
              Math.sin(col * 0.15 + theta * 0.8) * 0.2 +
              Math.sin(row * 0.12 - theta * 0.5) * 0.15 +
              Math.sin((col + row) * 0.08 + theta * 0.3) * 0.15;
            const bgBrightness = 0.1 + wave * 0.4;
            if (bgBrightness < 0.04) continue;

            // Color based on position (same gradient, but very muted)
            const bgNy = row / h;
            const colorT = bgNy * 0.6 + 0.4;
            const [r, g, b] = getColor(colorT);
            const alpha = Math.max(0.05, Math.min(0.25, bgBrightness));

            ctx!.fillStyle = `rgba(${r | 0},${g | 0},${b | 0},${alpha.toFixed(2)})`;
            ctx!.fillText(bgChar, col * CELL + CELL / 2, row * CELL + CELL / 2);
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    }

    animationId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
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
