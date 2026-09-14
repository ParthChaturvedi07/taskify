"use client";

import * as React from "react";
import { useEffect, useRef } from "react";

export function useDotField(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const REDUCE_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const MOUSE_R = 150, PUSH = 34;

    interface Dot {
      baseX: number; baseY: number;
      x: number; y: number;
      vx: number; vy: number;
      phase: number; speed: number; r: number;
    }
    let w = 0, h = 0, dots: Dot[] = [];
    const mouse = { x: -9999, y: -9999, active: false };

    function resize() {
      w = canvas!.width  = window.innerWidth;
      h = canvas!.height = window.innerHeight;
      const spacing = 46;
      dots = [];
      for (let y = 0; y < h + spacing; y += spacing) {
        for (let x = 0; x < w + spacing; x += spacing) {
          dots.push({
            baseX: x + (Math.random() - 0.5) * 10,
            baseY: y + (Math.random() - 0.5) * 10,
            x, y, vx: 0, vy: 0,
            phase: Math.random() * Math.PI * 2,
            speed: 0.15 + Math.random() * 0.25,
            r:     0.9  + Math.random() * 0.7,
          });
        }
      }
    }

    let rafId = 0;
    function draw(t: number) {
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        const drift = REDUCE_MOTION ? 0 : Math.sin(t * 0.00025 * d.speed + d.phase) * 14;
        let tx = d.baseX, ty = d.baseY + drift;

        if (mouse.active) {
          const dx = tx - mouse.x, dy = ty - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_R) {
            const force = 1 - dist / MOUSE_R;
            const ang = Math.atan2(dy, dx);
            tx += Math.cos(ang) * force * PUSH;
            ty += Math.sin(ang) * force * PUSH;
          }
        }
        d.x += (tx - d.x) * 0.12;
        d.y += (ty - d.y) * 0.12;

        const dtm   = mouse.active ? Math.hypot(d.x - mouse.x, d.y - mouse.y) : Infinity;
        const glow  = dtm < MOUSE_R ? (1 - dtm / MOUSE_R) * 0.6 : 0;
        const flick = REDUCE_MOTION ? 0.4 : 0.25 + 0.35 * (0.5 + 0.5 * Math.sin(t * 0.0006 + d.phase * 3));
        const alpha = Math.min(1, flick + glow);
        const rad   = d.r + glow * 1.6;

        ctx.beginPath();
        ctx.arc(d.x, d.y, rad, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.fill();
      }
      rafId = requestAnimationFrame(draw);
    }

    const onMove     = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; mouse.active = true; };
    const onLeave    = () => { mouse.active = false; };
    const onTouch    = (e: TouchEvent) => {
      if (e.touches[0]) { mouse.x = e.touches[0].clientX; mouse.y = e.touches[0].clientY; mouse.active = true; }
    };
    const onTouchEnd = () => { mouse.active = false; };

    window.addEventListener("mousemove",  onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("touchmove",  onTouch, { passive: true });
    window.addEventListener("touchend",   onTouchEnd);
    window.addEventListener("resize",     resize);

    resize();
    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove",  onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("touchmove",  onTouch);
      window.removeEventListener("touchend",   onTouchEnd);
      window.removeEventListener("resize",     resize);
    };
  }, []);
}

export function DotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useDotField(canvasRef);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        opacity: 0.55,
        pointerEvents: "none",
      }}
    />
  );
}
