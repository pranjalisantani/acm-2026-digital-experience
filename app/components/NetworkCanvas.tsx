"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  pulseSpeed: number;
  pulseOffset: number;
}

interface NetworkCanvasProps {
  interactive?: boolean;
  nodeCount?: number;
  maxDistance?: number;
  className?: string;
}

export default function NetworkCanvas({
  interactive = true,
  nodeCount = 55,
  maxDistance = 140,
  className = "",
}: NetworkCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const mouse = {
      x: -1000,
      y: -1000,
      radius: 180,
      active: false,
    };

    let nodes: Node[] = [];

    const resize = () => {
      if (!canvas) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.parentElement?.clientHeight || window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      initNodes();
    };

    const initNodes = () => {
      nodes = [];
      const densityCount = Math.floor((width * height) / 22000);
      const totalNodes = Math.max(35, Math.min(nodeCount, densityCount));

      for (let i = 0; i < totalNodes; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          radius: Math.random() * 1.8 + 1.2,
          baseAlpha: Math.random() * 0.5 + 0.35,
          pulseSpeed: Math.random() * 0.02 + 0.01,
          pulseOffset: Math.random() * Math.PI * 2,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive || !canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    resize();

    let time = 0;

    const render = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      // Update and draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Update positions
        node.x += node.vx;
        node.y += node.vy;

        // Bounce on boundary
        if (node.x <= 0 || node.x >= width) node.vx *= -1;
        if (node.y <= 0 || node.y >= height) node.vy *= -1;

        // Mouse interaction: subtle magnetic drift
        if (mouse.active) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (1 - dist / mouse.radius) * 0.04;
            node.x += dx * force;
            node.y += dy * force;
          }
        }

        // Pulsing glow
        const pulse = Math.sin(time * node.pulseSpeed + node.pulseOffset) * 0.2 + 0.8;
        const currentAlpha = Math.min(1, node.baseAlpha * pulse);

        const isLight = typeof document !== "undefined" && document.documentElement.classList.contains("light");
        const cyanRgb = isLight ? "2, 132, 199" : "0, 240, 255";
        const accentRgb = isLight ? "3, 105, 161" : "56, 189, 248";

        // Draw node core
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${cyanRgb}, ${currentAlpha})`;
        ctx.shadowColor = `rgba(${cyanRgb}, ${isLight ? 0.4 : 0.7})`;
        ctx.shadowBlur = isLight ? 4 : 8;
        ctx.fill();

        // Connect with other nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * (isLight ? 0.35 : 0.28);
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(${cyanRgb}, ${lineAlpha})`;
            ctx.lineWidth = isLight ? 1 : 0.85;
            ctx.shadowBlur = 0;
            ctx.stroke();
          }
        }

        // Connect with cursor if in range
        if (mouse.active) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const lineAlpha = (1 - dist / mouse.radius) * 0.42;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(${accentRgb}, ${lineAlpha})`;
            ctx.lineWidth = 1.1;
            ctx.shadowColor = `rgba(${cyanRgb}, 0.5)`;
            ctx.shadowBlur = 4;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [interactive, nodeCount, maxDistance]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-auto absolute inset-0 block h-full w-full ${className}`}
      style={{ opacity: 0.92 }}
    />
  );
}
