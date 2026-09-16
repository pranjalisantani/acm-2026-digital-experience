"use client";

import { useEffect, useRef } from "react";

interface Node3D {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  radius: number;
  cluster: number; // 0: ambient, 1: foundation, 2: systems, 3: impact
  baseAlpha: number;
  pulseOffset: number;
  pulseSpeed: number;
}

interface NetworkCanvasProps {
  progress?: number; // 0 to 1 scroll scrub
  interactive?: boolean;
  nodeCount?: number;
  maxDistance?: number;
  className?: string;
}

export default function NetworkCanvas({
  progress = 0,
  interactive = true,
  className = "",
}: NetworkCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const progressRef = useRef(progress);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Camera state for smooth lerp
    const camera = {
      x: 0,
      y: 0,
      z: -300,
      rotX: 0,
      rotY: 0,
      fov: 380,
    };

    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      active: false,
    };

    let nodes: Node3D[] = [];

    const initNodes = () => {
      nodes = [];
      const count = 80;

      // Cluster centers in 3D world space
      const clusters = [
        { cx: 0, cy: 0, cz: 0 },       // 0: Ambient spread
        { cx: -40, cy: -20, cz: 180 },  // 1: Foundation
        { cx: 70, cy: 30, cz: 520 },   // 2: Systems
        { cx: -30, cy: 10, cz: 840 },   // 3: Impact / Future
      ];

      for (let i = 0; i < count; i++) {
        let cluster = 0;
        if (i < 20) cluster = 1;
        else if (i < 42) cluster = 2;
        else if (i < 64) cluster = 3;

        const c = clusters[cluster];
        const spreadX = cluster === 0 ? 600 : 180;
        const spreadY = cluster === 0 ? 450 : 140;
        const spreadZ = cluster === 0 ? 1000 : 160;

        nodes.push({
          x: c.cx + (Math.random() - 0.5) * spreadX,
          y: c.cy + (Math.random() - 0.5) * spreadY,
          z: c.cz + (Math.random() - 0.5) * spreadZ,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          vz: (Math.random() - 0.5) * 0.2,
          radius: Math.random() * 2.2 + 1.2,
          cluster,
          baseAlpha: Math.random() * 0.45 + 0.35,
          pulseOffset: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.02 + 0.015,
        });
      }
    };

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
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive || !canvas) return;
      const rect = canvas.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / width - 0.5;
      const ny = (e.clientY - rect.top) / height - 0.5;
      mouse.targetX = nx * 80;
      mouse.targetY = ny * 60;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.targetX = 0;
      mouse.targetY = 0;
      mouse.active = false;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    resize();
    initNodes();

    let time = 0;

    const render = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      // Interpolate mouse parallax
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      // Target camera based on progress (0 to 1)
      const p = Math.max(0, Math.min(1, progressRef.current));

      // Trajectory waypoints
      let targetX = 0;
      let targetY = 0;
      let targetZ = -280;

      if (p < 0.33) {
        // Hero to Beat 1 (Foundation)
        const sub = p / 0.33;
        targetX = -30 * sub;
        targetY = -15 * sub;
        targetZ = -280 + 380 * sub; // reaches ~100
      } else if (p < 0.68) {
        // Beat 1 to Beat 2 (Systems & Convergence)
        const sub = (p - 0.33) / 0.35;
        targetX = -30 + 90 * sub;
        targetY = -15 + 35 * sub;
        targetZ = 100 + 360 * sub; // reaches ~460
      } else {
        // Beat 2 to Beat 3 (Impact & Mandate)
        const sub = (p - 0.68) / 0.32;
        targetX = 60 - 75 * sub;
        targetY = 20 - 15 * sub;
        targetZ = 460 + 320 * sub; // reaches ~780
      }

      // Smooth camera lerp
      camera.x += (targetX + mouse.x - camera.x) * 0.08;
      camera.y += (targetY + mouse.y - camera.y) * 0.08;
      camera.z += (targetZ - camera.z) * 0.08;

      const cx = width / 2;
      const cy = height / 2;

      // Project nodes to 2D
      interface ProjectedNode {
        sx: number;
        sy: number;
        scale: number;
        alpha: number;
        radius: number;
        cluster: number;
        visible: boolean;
      }

      const projected: ProjectedNode[] = [];

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        // Slight natural floating drift
        n.x += n.vx;
        n.y += n.vy;
        n.z += n.vz;

        // Relative to camera
        const rx = n.x - camera.x;
        const ry = n.y - camera.y;
        const rz = n.z - camera.z;

        // Near-plane clipping and far fog
        if (rz < 40 || rz > 1400) {
          projected.push({
            sx: 0,
            sy: 0,
            scale: 0,
            alpha: 0,
            radius: 0,
            cluster: n.cluster,
            visible: false,
          });
          continue;
        }

        const scale = camera.fov / rz;
        const sx = cx + rx * scale;
        const sy = cy + ry * scale;

        // Pulse
        const pulse =
          Math.sin(time * n.pulseSpeed + n.pulseOffset) * 0.25 + 0.75;

        // Depth fog attenuation
        const depthFog = Math.max(0, 1 - (rz - 60) / 1100);
        const nearFade = Math.min(1, (rz - 40) / 80);
        const currentAlpha = n.baseAlpha * pulse * depthFog * nearFade;

        projected.push({
          sx,
          sy,
          scale,
          alpha: currentAlpha,
          radius: Math.max(0.6, n.radius * scale),
          cluster: n.cluster,
          visible: sx >= -50 && sx <= width + 50 && sy >= -50 && sy <= height + 50,
        });
      }

      // Draw connection lines between nearby projected nodes
      for (let i = 0; i < nodes.length; i++) {
        const p1 = projected[i];
        if (!p1.visible || p1.alpha <= 0.05) continue;

        for (let j = i + 1; j < nodes.length; j++) {
          const p2 = projected[j];
          if (!p2.visible || p2.alpha <= 0.05) continue;

          // 3D distance check for realism
          const dx3 = nodes[i].x - nodes[j].x;
          const dy3 = nodes[i].y - nodes[j].y;
          const dz3 = nodes[i].z - nodes[j].z;
          const dist3D = Math.sqrt(dx3 * dx3 + dy3 * dy3 + dz3 * dz3);

          const maxDist =
            nodes[i].cluster === nodes[j].cluster && nodes[i].cluster !== 0
              ? 160
              : 110;

          if (dist3D < maxDist) {
            const lineAlpha =
              (1 - dist3D / maxDist) * Math.min(p1.alpha, p2.alpha) * 0.75;

            ctx.beginPath();
            ctx.moveTo(p1.sx, p1.sy);
            ctx.lineTo(p2.sx, p2.sy);
            ctx.strokeStyle = `rgba(0, 240, 255, ${lineAlpha})`;
            ctx.lineWidth = Math.max(0.5, (p1.scale + p2.scale) * 0.4);
            ctx.stroke();
          }
        }
      }

      // Draw node particles
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        if (!p.visible || p.alpha <= 0.04) continue;

        ctx.beginPath();
        ctx.arc(p.sx, p.sy, p.radius, 0, Math.PI * 2);

        // Core cyan color with subtle pulse
        ctx.fillStyle = `rgba(0, 240, 255, ${p.alpha})`;
        ctx.shadowColor = "rgba(0, 240, 255, 0.6)";
        ctx.shadowBlur = p.radius > 2 ? 6 : 2;
        ctx.fill();
      }

      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [interactive]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-auto absolute inset-0 block h-full w-full ${className}`}
      style={{ opacity: 0.95 }}
    />
  );
}
