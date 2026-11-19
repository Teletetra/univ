"use client";

import { useEffect, useRef } from "react";
import {
  generateIntensityData,
  type DoubleSlitParameters,
} from "@/physics/double-slit";

export default function InterferenceCanvas({
  params,
  range = 0.012,
}: {
  params: DoubleSlitParameters;
  range?: number;
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

      const data = generateIntensityData(params, range, 1200);

      // Plot background
      ctx.fillStyle = "#0b1224";
      ctx.fillRect(left, top, plotWidth, plotHeight);

      // Horizontal grid
      ctx.strokeStyle = "rgba(148, 163, 184, 0.12)";
      ctx.lineWidth = 1;
      for (let i = 0; i <= 4; i++) {
        const y = top + (plotHeight * i) / 4;
        ctx.beginPath();
        ctx.moveTo(left, y);
        ctx.lineTo(right, y);
        ctx.stroke();
      }

      // Vertical center axis
      ctx.strokeStyle = "rgba(255,255,255,0.25)";
      ctx.beginPath();
      ctx.moveTo(left + plotWidth / 2, top);
      ctx.lineTo(left + plotWidth / 2, bottom);
      ctx.stroke();

      // Convert data to plot coords
      const points = data.map((point) => ({
        x: left + ((point.x + range) / (2 * range)) * plotWidth,
        y: bottom - point.intensity * plotHeight,
      }));

      // Fill under curve
      ctx.beginPath();
      points.forEach((point, index) => {
        if (index === 0) ctx.moveTo(point.x, point.y);
        else ctx.lineTo(point.x, point.y);
      });
      ctx.lineTo(right, bottom);
      ctx.lineTo(left, bottom);
      ctx.closePath();

      const gradient = ctx.createLinearGradient(0, top, 0, bottom);
      gradient.addColorStop(0, "rgba(148,133,237,0.30)");
      gradient.addColorStop(1, "rgba(148,133,237,0.01)");
      ctx.fillStyle = gradient;
      ctx.fill();

      // Glow curve
      ctx.beginPath();
      points.forEach((point, index) => {
        if (index === 0) ctx.moveTo(point.x, point.y);
        else ctx.lineTo(point.x, point.y);
      });
      ctx.strokeStyle = "#9485ed";
      ctx.lineWidth = 2.2;
      ctx.shadowColor = "#9485ed";
      ctx.shadowBlur = 12;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Axis labels
      ctx.fillStyle = "#929fbd";
      ctx.font = "11px Inter, Arial, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(`${(-range * 1000).toFixed(0)} mm`, left, height - 12);
      ctx.fillText("0", left + plotWidth / 2, height - 12);
      ctx.fillText(`+${(range * 1000).toFixed(0)} mm`, right, height - 12);

      ctx.textAlign = "right";
      ctx.fillText("1.0", left - 8, top + 4);
      ctx.fillText("0.5", left - 8, top + plotHeight / 2);
      ctx.fillText("0", left - 8, bottom);
    };

    draw();

    const observer = new ResizeObserver(draw);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [params, range]);

  return (
    <div className="w-full overflow-hidden rounded-xl border border-[#26324b] bg-[#0b1224]">
      <div className="flex justify-between px-4 py-3">
        <span className="lab-label">Relative intensity distribution</span>
        <span className="text-xs text-[#b8a4ff]">LIVE MODEL</span>
      </div>
      <canvas
        ref={canvasRef}
        className="block h-[280px] w-full"
        role="img"
        aria-label="Calculated double-slit relative intensity distribution"
      />
    </div>
  );
}