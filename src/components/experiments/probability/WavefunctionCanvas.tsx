"use client";

import { useEffect, useRef } from "react";
import {
  generateWavefunction,
  classicalTurning,
} from "@/physics/harmonic-oscillator";

export default function WavefunctionCanvas({
  n,
  showPsi,
  showClassical,
}: {
  n: number;
  showPsi: boolean;
  showClassical: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const left = 48;
      const right = width - 18;
      const top = 20;
      const bottom = height - 38;
      const plotWidth = right - left;
      const plotHeight = bottom - top;

      const range = 12;
      const data = generateWavefunction(n, range, 500);
      const a = classicalTurning(n);

      // Plot background
      ctx.fillStyle = "#0b1224";
      ctx.fillRect(left, top, plotWidth, plotHeight);

      // Grid
      ctx.strokeStyle = "rgba(148, 163, 184, 0.1)";
      ctx.lineWidth = 1;
      for (let i = 0; i <= 4; i++) {
        const y = top + (plotHeight * i) / 4;
        ctx.beginPath();
        ctx.moveTo(left, y);
        ctx.lineTo(right, y);
        ctx.stroke();
      }

      // Classical turning points
      const toX = (xi: number) =>
        left + ((xi + range) / (2 * range)) * plotWidth;

      const turningLeft = toX(-a);
      const turningRight = toX(a);

      ctx.strokeStyle = "rgba(214, 185, 154, 0.25)";
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(turningLeft, top);
      ctx.lineTo(turningLeft, bottom);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(turningRight, top);
      ctx.lineTo(turningRight, bottom);
      ctx.stroke();
      ctx.setLineDash([]);

      // Center axis
      ctx.strokeStyle = "rgba(255,255,255,0.2)";
      ctx.beginPath();
      ctx.moveTo(toX(0), top);
      ctx.lineTo(toX(0), bottom);
      ctx.stroke();

      // Classical probability density (dashed, warm)
      if (showClassical) {
        ctx.beginPath();
        data.forEach((point, i) => {
          const x = toX(point.xi);
          const y = bottom - point.classical * plotHeight * 0.9;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.strokeStyle = "rgba(214, 185, 154, 0.55)";
        ctx.lineWidth = 1.5;
        ctx.setLineDash([3, 3]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // |ψ|² fill
      ctx.beginPath();
      data.forEach((point, i) => {
        const x = toX(point.xi);
        const y = bottom - point.density * plotHeight * 0.9;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.lineTo(right, bottom);
      ctx.lineTo(left, bottom);
      ctx.closePath();

      const gradient = ctx.createLinearGradient(0, top, 0, bottom);
      gradient.addColorStop(0, "rgba(148, 133, 237, 0.35)");
      gradient.addColorStop(1, "rgba(148, 133, 237, 0.02)");
      ctx.fillStyle = gradient;
      ctx.fill();

      // |ψ|² curve
      ctx.beginPath();
      data.forEach((point, i) => {
        const x = toX(point.xi);
        const y = bottom - point.density * plotHeight * 0.9;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.strokeStyle = "#9485ed";
      ctx.lineWidth = 2;
      ctx.shadowColor = "#9485ed";
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // ψ (not squared) if toggled
      if (showPsi) {
        ctx.beginPath();
        data.forEach((point, i) => {
          const x = toX(point.xi);
          const y = bottom - (point.psi * 0.5 + 0.5) * plotHeight;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.strokeStyle = "rgba(184, 164, 255, 0.65)";
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      // Axis labels
      ctx.fillStyle = "#929fbd";
      ctx.font = "11px Inter, Arial, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("-12", left, height - 12);
      ctx.fillText("0", toX(0), height - 12);
      ctx.fillText("+12", right, height - 12);

      ctx.textAlign = "right";
      ctx.fillText("1.0", left - 8, top + 4);
      ctx.fillText("0.5", left - 8, top + plotHeight / 2);
      ctx.fillText("0", left - 8, bottom);

      // Legend inside plot
      ctx.textAlign = "left";
      ctx.font = "10px Inter, Arial, sans-serif";
      ctx.fillStyle = "#9485ed";
      ctx.fillText("|ψₙ|²", left + 10, top + 16);
      if (showPsi) {
        ctx.fillStyle = "#b8a4ff";
        ctx.fillText("ψₙ", left + 10, top + 30);
      }
      if (showClassical) {
        ctx.fillStyle = "#d6b99a";
        ctx.fillText("classical", left + 10, top + 44);
      }
    };

    draw();
    const observer = new ResizeObserver(draw);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [n, showPsi, showClassical]);

  return (
    <div className="w-full overflow-hidden rounded-xl border border-[#26324b] bg-[#0b1224]">
      <div className="flex justify-between px-4 py-3">
        <span className="lab-label">Probability density · |ψₙ(ξ)|²</span>
        <span className="text-xs text-[#b8a4ff]">n = {n}</span>
      </div>
      <canvas
        ref={canvasRef}
        className="block h-[300px] w-full"
        role="img"
        aria-label={`Quantum harmonic oscillator probability density for level n=${n}`}
      />
    </div>
  );
}