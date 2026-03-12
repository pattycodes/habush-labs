"use client";

import { useEffect, useRef } from "react";

export default function WaveBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    let mouseX = -999;
    let mouseY = -999;
    let mouseActive = false;

    const BLOCK = 12;
    const MOUSE_RADIUS = 20;

    let displaceX: Float32Array;
    let displaceY: Float32Array;
    let gridW = 0;
    let gridH = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) / BLOCK;
      mouseY = (e.clientY - rect.top) / BLOCK;
      mouseActive = true;
    };

    const handleMouseLeave = () => {
      mouseActive = false;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      gridW = Math.ceil(rect.width / BLOCK);
      gridH = Math.ceil(rect.height / BLOCK);
      canvas.width = gridW;
      canvas.height = gridH;
      ctx.imageSmoothingEnabled = false;
      displaceX = new Float32Array(gridW * gridH);
      displaceY = new Float32Array(gridW * gridH);
    };

    resize();
    window.addEventListener("resize", resize);

    const palette: number[][] = [
      [55, 28, 10],
      [65, 32, 8],
      [70, 35, 8],
      [62, 28, 6],
      [52, 22, 6],
      [44, 18, 6],
      [36, 14, 5],
      [28, 10, 5],
      [22, 8, 4],
      [16, 6, 4],
      [12, 5, 3],
      [8, 4, 3],
      [5, 3, 2],
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

    function waveNoise(x: number, y: number, t: number) {
      return (
        Math.sin(x * 0.3 + t * 0.7) * 0.25 +
        Math.sin(x * 0.7 - t * 0.4 + y * 0.2) * 0.2 +
        Math.cos(x * 0.15 + t * 0.3) * 0.35 +
        Math.sin(y * 0.4 + t * 0.5 + x * 0.1) * 0.15 +
        Math.cos(x * 0.5 + y * 0.3 - t * 0.6) * 0.15
      );
    }

    function draw() {
      const w = gridW;
      const h = gridH;
      if (w === 0 || h === 0) {
        animationId = requestAnimationFrame(draw);
        return;
      }

      // Decay displacement
      for (let i = 0; i < w * h; i++) {
        displaceX[i] *= 0.92;
        displaceY[i] *= 0.92;
      }

      // Mouse force
      if (mouseActive) {
        const r = MOUSE_RADIUS;
        const startX = Math.max(0, Math.floor(mouseX - r));
        const endX = Math.min(w - 1, Math.ceil(mouseX + r));
        const startY = Math.max(0, Math.floor(mouseY - r));
        const endY = Math.min(h - 1, Math.ceil(mouseY + r));

        for (let py = startY; py <= endY; py++) {
          for (let px = startX; px <= endX; px++) {
            const dx = px - mouseX;
            const dy = py - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < r && dist > 0.1) {
              const strength = 1 - dist / r;
              const eased = strength * strength * strength;
              const force = eased * 12;

              const dirX = dx / dist;
              const dirY = dy / dist;

              const idx = py * w + px;
              displaceX[idx] += dirX * force;
              displaceY[idx] += dirY * force;

              const maxDisp = 15;
              displaceX[idx] = Math.max(-maxDisp, Math.min(maxDisp, displaceX[idx]));
              displaceY[idx] = Math.max(-maxDisp, Math.min(maxDisp, displaceY[idx]));
            }
          }
        }
      }

      const imageData = ctx!.createImageData(w, h);
      const data = imageData.data;

      for (let py = 0; py < h; py++) {
        for (let px = 0; px < w; px++) {
          const fieldIdx = py * w + px;

          const sampleX = px + displaceX[fieldIdx];
          const sampleY = py + displaceY[fieldIdx];

          const sampleNx = sampleX / w;
          const sampleNy = sampleY / h;

          const baseT = sampleNy;
          const distortion = waveNoise(sampleX, sampleY, time) * 0.35;
          const diagonal = Math.sin(sampleNx * 2 + sampleNy * 1.5 + time * 0.4) * 0.08;

          const t = baseT + distortion + diagonal;
          const [r, g, b] = getColor(t);

          const dither = (Math.random() - 0.5) * 8;

          const idx = fieldIdx * 4;
          data[idx] = Math.max(0, Math.min(255, r + dither));
          data[idx + 1] = Math.max(0, Math.min(255, g + dither));
          data[idx + 2] = Math.max(0, Math.min(255, b + dither));
          data[idx + 3] = 255;
        }
      }

      ctx!.putImageData(imageData, 0, 0);

      time += 0.025;
      animationId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{
        display: "block",
        imageRendering: "pixelated",
      }}
    />
  );
}
