/** @jsx createElement */
import { createElement } from "./jsx-runtime";
import type { DataPoint } from "./data-service";

export type ChartType = "bar" | "line" | "pie";

export interface ChartProps {
  type: ChartType;
  data: DataPoint[];
  width?: number;
  height?: number;
  padding?: number;
}

export const Chart = ({ type, data, width = 640, height = 300, padding = 28 }: ChartProps) => {
  const draw = (canvas: HTMLCanvasElement | null) => {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // helpers
    const xs = data.map((d) => d.t);
    const ys = data.map((d) => d.value);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(0, Math.min(...ys));
    const maxY = Math.max(...ys);

    const W = width, H = height;
    const plotW = W - padding * 2;
    const plotH = H - padding * 2;

    const xScale = (t: number) =>
      padding + (plotW * (t - minX)) / (maxX - minX || 1);
    const yScale = (v: number) =>
      H - padding - (plotH * (v - minY)) / (maxY - minY || 1);

    // axes
    ctx.strokeStyle = "#ddd";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, H - padding);
    ctx.lineTo(W - padding, H - padding);
    ctx.stroke();

    if (type === "line") {
      // line
      ctx.strokeStyle = "#3b82f6";
      ctx.lineWidth = 2;
      ctx.beginPath();
      data.forEach((d, i) => {
        const x = xScale(d.t);
        const y = yScale(d.value);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // points
      ctx.fillStyle = "#1d4ed8";
      data.forEach((d) => {
        const x = xScale(d.t), y = yScale(d.value);
        ctx.beginPath();
        ctx.arc(x, y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });
    } else if (type === "bar") {
      ctx.fillStyle = "#10b981";
      const n = data.length || 1;
      const barW = plotW / n * 0.9;
      data.forEach((d, i) => {
        const x = padding + (plotW / n) * i + (plotW / n - barW) / 2;
        const y = yScale(d.value);
        const y0 = yScale(0);
        const h = y0 - y;
        ctx.fillRect(x, Math.min(y, y0), barW, Math.abs(h));
      });
    } else if (type === "pie") {
      // super simple pie by category sum
      const totals = new Map<string, number>();
      data.forEach((d) => totals.set(d.category, (totals.get(d.category) ?? 0) + d.value));
      const sum = Array.from(totals.values()).reduce((a, b) => a + b, 0) || 1;
      const cx = W / 2, cy = H / 2, r = Math.min(plotW, plotH) / 2;
      const palette = ["#ef4444", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6"];
      let start = -Math.PI / 2;
      let idx = 0;
      totals.forEach((val) => {
        const ang = (val / sum) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.fillStyle = palette[idx++ % palette.length];
        ctx.arc(cx, cy, r, start, start + ang);
        ctx.closePath();
        ctx.fill();
        start += ang;
      });
    }
  };

  return (
    <canvas
      width={width}
      height={height}
      ref={(el: HTMLCanvasElement) => draw(el)}
      style={{ backgroundColor: "#fff", borderRadius: 8, boxShadow: "0 1px 4px rgba(0,0,0,.08)" }}
    />
  );
};
