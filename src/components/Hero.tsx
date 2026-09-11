"use client";

import * as React from "react";
import { useEffect, useRef, useLayoutEffect } from "react";
import gsap from "gsap";

/* ─────────────────────────────────────────────
   Card data
───────────────────────────────────────────── */
const FAN_CARDS = [
  {
    name: "NOCTURNE", sub: "Focus mode",
    src: "/images/card1.png",
    alt: "Gaming setup",
  },
  {
    name: "CIPHER", sub: "Daily streak",
    src: "/images/card2.png",
    alt: "VR Headset",
  },
  {
    name: "RELAY", sub: "Quick tasks",
    src: "/images/card3.png",
    alt: "Arcade",
  },
  {
    name: "AERO", sub: "Featured",
    src: "/images/card4.png",
    alt: "Esports",
  },
  {
    name: "SIGNAL", sub: "New drop",
    src: "/images/card5.png",
    alt: "Arcade 2",
  },
] as const;

/* ─────────────────────────────────────────────
   Fan carousel constants
───────────────────────────────────────────── */
const N           = FAN_CARDS.length; // 7
const CARD_W      = 440;   // px — card width
const CARD_H      = 500;   // px — card height
const SLOT_COUNT  = 7;     // visible slots: offsets -3 … +3
const HALF        = 3;     // Math.floor(SLOT_COUNT / 2)
// Arc radius: cards follow a circular path, centre = top, edges dip down
const ARC_R       = 680;   // px — radius of the arc
const X_STEP      = 240;   // horizontal spread per offset (px)
const SCALE_STEP  = 0.07;  // scale decrease per offset
const AUTO_SPEED  = 0.22 / 60; // cards per frame (≈ 0.22 card/sec)
const DRAG_SENSE  = 190;   // px drag = 1 card
const SNAP_K      = 0.14;  // spring stiffness for snap-to-nearest

/* ─────────────────────────────────────────────
   Dot-field canvas hook
───────────────────────────────────────────── */
function useDotField(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/* ─────────────────────────────────────────────
   Hero
───────────────────────────────────────────── */
export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useDotField(canvasRef);

  /* ── Fan carousel refs ── */
  const slotRefs = useRef<(HTMLDivElement    | null)[]>([]);
  const imgRefs  = useRef<(HTMLImageElement  | null)[]>([]);
  const rewardsRef = useRef<HTMLSpanElement | null>(null);

  /* ── Pixel glitch effect for REWARDS ── */
  useLayoutEffect(() => {
    const el = rewardsRef.current;
    if (!el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      // Reset the animated CSS variables before the timeline starts.
      gsap.set(el, {
        "--glitch-x": 0,
        "--glitch-y": 0,
        "--glitch-skew": 0,
        "--glitch-top-1": "0%",
        "--glitch-bottom-1": "100%",
        "--glitch-top-2": "0%",
        "--glitch-bottom-2": "100%",
        "--glitch-opacity": 0,
      });

      // Short bursts rather than a constant shake: this keeps the heading readable
      // while still giving it a convincing digital/pixel-glitch character.
      const glitch = gsap.timeline({ repeat: -1, repeatDelay: 2.8 });

      glitch
        .to(el, {
          duration: 0.035,
          "--glitch-x": -3,
          "--glitch-y": 1,
          "--glitch-skew": -3,
          "--glitch-opacity": 1,
          ease: "steps(1)",
        })
        .to(el, {
          duration: 0.035,
          "--glitch-x": 4,
          "--glitch-y": -1,
          "--glitch-skew": 2,
          "--glitch-opacity": 0.8,
          ease: "steps(1)",
        })
        .to(el, {
          duration: 0.035,
          "--glitch-x": -7,
          "--glitch-y": 0,
          "--glitch-skew": 6,
          "--glitch-opacity": 1,
          ease: "steps(1)",
        })
        .to(el, {
          duration: 0.035,
          "--glitch-x": 2,
          "--glitch-y": 2,
          "--glitch-skew": -5,
          "--glitch-opacity": 0.65,
          ease: "steps(1)",
        })
        .to(el, {
          duration: 0.035,
          "--glitch-x": 0,
          "--glitch-y": 0,
          "--glitch-skew": 0,
          "--glitch-opacity": 0,
          ease: "steps(1)",
        })
        // A second, larger pixel slice during the same burst.
        .to(el, {
          duration: 0.045,
          "--glitch-top-1": "18%",
          "--glitch-bottom-1": "43%",
          "--glitch-top-2": "61%",
          "--glitch-bottom-2": "78%",
          "--glitch-x": -5,
          "--glitch-skew": 4,
          "--glitch-opacity": 0.9,
          ease: "steps(1)",
        })
        .to(el, {
          duration: 0.045,
          "--glitch-top-1": "0%",
          "--glitch-bottom-1": "100%",
          "--glitch-top-2": "0%",
          "--glitch-bottom-2": "100%",
          "--glitch-x": 6,
          "--glitch-skew": -4,
          "--glitch-opacity": 0.8,
          ease: "steps(1)",
        })
        .to(el, {
          duration: 0.04,
          "--glitch-x": 0,
          "--glitch-skew": 0,
          "--glitch-opacity": 0,
          ease: "steps(1)",
        });
    }, el);

    return () => ctx.revert();
  }, []);

  /* ── Drag state (all in refs → no re-renders) ── */
  const posRef      = useRef(0);     // current position in card units (float)
  const isDragging  = useRef(false);
  const dragStartX  = useRef(0);
  const dragStartP  = useRef(0);
  const velRef      = useRef(0);     // velocity in cards/frame
  const prevXRef    = useRef(0);
  const snapping    = useRef(false);

  /* ── Main carousel animation loop ── */
  useEffect(() => {
    const REDUCE_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let rafId: number;

    function applySlots() {
      const pos  = posRef.current;
      const base = Math.floor(pos);      // integer floor
      const frac = pos - base;           // 0 → 1, how far past the last integer

      slotRefs.current.forEach((slot, si) => {
        if (!slot) return;

        const offset      = si - HALF;             // -3 … +3
        const visualOff   = offset - frac;          // fractional offset from current center
        const absVis      = Math.abs(visualOff);

        /* ── Geometric transforms: arc path, no rotation ── */
        // Scale step to viewport so cards don't spread apart on small screens
        const xStep = Math.min(X_STEP, window.innerWidth * 0.38);
        const tx      = visualOff * xStep;
        // Circular arc: centre card sits at top (y=0), edges dip downward.
        // arcDip = R − √(R² − x²), clamped so x never exceeds R.
        const clampedX = Math.min(Math.abs(tx), ARC_R - 1);
        const arcDip   = ARC_R - Math.sqrt(ARC_R * ARC_R - clampedX * clampedX);
        const scale    = Math.max(0.60, 1 - absVis * SCALE_STEP);
        const zIdx     = Math.max(1, Math.round(10 - absVis * 2));
        // Fade out cards beyond visible range
        const opacity  = Math.max(0, Math.min(1, 2.8 - absVis));

        slot.style.transform = `translate(${tx.toFixed(1)}px, ${arcDip.toFixed(1)}px) scale(${scale.toFixed(3)})`;
        slot.style.zIndex    = String(zIdx);
        slot.style.opacity   = opacity.toFixed(3);

        /* ── Update card content for this slot ── */
        const cardIdx = ((base + offset) % N + N) % N;
        const card    = FAN_CARDS[cardIdx];
        const img     = imgRefs.current[si];

        if (img && img.dataset.loaded !== card.src) {
          img.src = card.src;
          img.alt = card.alt;
          img.dataset.loaded = card.src;
        }
      });
    }

    function tick() {
      if (!isDragging.current) {
        if (snapping.current) {
          /* Spring snap to nearest integer */
          const nearest = Math.round(posRef.current);
          const diff    = nearest - posRef.current;
          posRef.current += diff * SNAP_K;
          velRef.current  = 0;
          if (Math.abs(diff) < 0.003) {
            posRef.current  = nearest;
            snapping.current = false;
          }
        } else if (!REDUCE_MOTION) {
          /* Auto-advance (slow clock-like rotation) */
          posRef.current += AUTO_SPEED;
        }
      }

      applySlots();
      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  /* ── Pointer / drag handlers ── */
  const onPointerDown = (e: React.PointerEvent<HTMLElement>) => {
    isDragging.current = true;
    snapping.current   = false;
    dragStartX.current = e.clientX;
    dragStartP.current = posRef.current;
    prevXRef.current   = e.clientX;
    velRef.current     = 0;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - prevXRef.current;
    prevXRef.current   = e.clientX;
    velRef.current     = -dx / DRAG_SENSE;
    posRef.current     = dragStartP.current - (e.clientX - dragStartX.current) / DRAG_SENSE;
  };

  const onPointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    /* Small momentum throw, then spring-snap */
    posRef.current    += velRef.current * 2.5;
    snapping.current   = true;
  };

  return (
    <>
      {/* ── Fixed dot canvas ── */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: "fixed", inset: 0,
          width: "100%", height: "100%",
          zIndex: 0, opacity: 0.55,
          pointerEvents: "none",
        }}
      />

      {/* ── White radial glow ── */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: "-10%", left: "50%",
          transform: "translateX(-50%)",
          width: "1100px", height: "700px",
          background:
            "radial-gradient(ellipse at center, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 40%, transparent 70%)",
          pointerEvents: "none", zIndex: 0,
        }}
      />

      {/* ── Top-right white glow ── */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: "-15%", right: "-10%",
          width: "700px", height: "700px",
          background:
            "radial-gradient(ellipse at center, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.05) 35%, transparent 65%)",
          pointerEvents: "none", zIndex: 0,
          borderRadius: "50%",
          filter: "blur(40px)",
        }}
      />

      {/* ── Hero wrapper ── */}
      <div className="hero-root">

        {/* ── Text block ── */}
        <section className="hero-section">

          <h1 className="hero-h1">
            TURN FREE TIME
            <span ref={rewardsRef} data-text="REWARDS" className="hero-accent font-pixel tracking-wide ">REWARDS</span>
          </h1>

          <p className="hero-sub">
            Complete short tasks inside the apps you already use, earn points
            automatically, and cash out for real rewards — no grinding required.
          </p>

          <div className="hero-cta-row">
            <button className="hero-cta-btn">Start earning</button>
          </div>
        </section>

        {/* ── Fan carousel ── */}
        <section
          className="fan-section"
          aria-label="App card carousel — drag to explore"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {/*
            fan-pivot: a zero-size anchor at the rotation origin.
            All slots are position:absolute relative to it.
            Their bottom is at this point → all rotate around the same pivot.
          */}
          <div className="fan-pivot">
            {Array.from({ length: SLOT_COUNT }, (_, i) => (
              <div
                key={i}
                className="fan-slot"
                ref={el => { slotRefs.current[i] = el; }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  ref={el => { imgRefs.current[i] = el; }}
                  className="fan-img"
                  alt=""
                  draggable={false}
                />
              </div>
            ))}
          </div>

          {/* Edge + bottom fades */}
          <div className="fan-fade fan-fade-l" aria-hidden="true" />
          <div className="fan-fade fan-fade-r" aria-hidden="true" />
          <div className="fan-fade fan-fade-b" aria-hidden="true" />
        </section>

      </div>

      {/* ── Scoped styles ── */}
      {/* suppressHydrationWarning prevents the SSR/client mismatch on CSS string encoding */}
      <style suppressHydrationWarning>{`
        @import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;500;600;700&display=swap');

        /* ─── Root ─── */
        .hero-root {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        /* ─── Text section ─── */
        .hero-section {
          text-align: center;
          padding: 118px 24px 0;
        }

        .hero-kicker {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #6b6b6b;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.01em;
          margin-bottom: 26px;
        }
        .hero-kicker::before {
          content: '';
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #fff;
          box-shadow: 0 0 10px rgba(255,255,255,0.7);
          flex-shrink: 0;
        }

        .hero-h1 {
          font-family: var(--font-chakra);
          font-weight: 600;
          font-size: clamp(28px, 7vw, 52px);
          line-height: 1.12;
          letter-spacing: -0.01em;
          color: #b4b4b4;
          margin: 0;
        }

        .hero-accent {
          --glitch-x: 0px;
          --glitch-y: 0px;
          --glitch-skew: 0deg;
          --glitch-top-1: 0%;
          --glitch-bottom-1: 100%;
          --glitch-top-2: 0%;
          --glitch-bottom-2: 100%;
          --glitch-opacity: 0;
          position: relative;
          display: block;
          width: fit-content;
          margin-left: auto;
          margin-right: auto;
          font-weight: 700;
          font-size: clamp(56px, 16vw, 98px);
          color: #ffffff;
          letter-spacing: 0.12em;
          margin-top: 6px;
          text-shadow: 0 0 60px rgba(255,255,255,0.18);
          line-height: 1.05;
          isolation: isolate;
        }

        /* Two clipped duplicate layers create the hard, pixel-sliced glitch. */
        .hero-accent::before,
        .hero-accent::after {
          content: attr(data-text);
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: -1;
          color: #ffffff;
          opacity: var(--glitch-opacity);
          mix-blend-mode: screen;
          will-change: transform, clip-path, opacity;
        }

        .hero-accent::before {
          transform: translate3d(calc(var(--glitch-x) * -1), var(--glitch-y), 0)
            skewX(var(--glitch-skew));
          clip-path: polygon(
            0 var(--glitch-top-1),
            100% var(--glitch-top-1),
            100% var(--glitch-bottom-1),
            0 var(--glitch-bottom-1)
          );
          text-shadow: -3px 0 rgba(255,255,255,0.7);
        }

        .hero-accent::after {
          transform: translate3d(var(--glitch-x), calc(var(--glitch-y) * -1), 0)
            skewX(calc(var(--glitch-skew) * -1));
          clip-path: polygon(
            0 var(--glitch-top-2),
            100% var(--glitch-top-2),
            100% var(--glitch-bottom-2),
            0 var(--glitch-bottom-2)
          );
          text-shadow: 3px 0 rgba(255,255,255,0.55);
        }

        .hero-sub {
          max-width: 480px;
          margin: 26px auto 0;
          color: #6b6b6b;
          font-size: 15.5px;
          line-height: 1.65;
        }

        .hero-cta-row {
          margin-top: 44px;
          display: flex;
          justify-content: center;
        }

        .hero-cta-btn {
          background: #ffffff;
          color: #0a0a0a;
          font-family: var(--font-chakra);
          font-weight: 600;
          font-size: 15px;
          letter-spacing: 0.01em;
          border: none;
          padding: 17px 38px;
          border-radius: 999px;
          cursor: pointer;
          box-shadow: 0 10px 40px rgba(255,255,255,0.12);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          outline: none;
        }
        .hero-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 50px rgba(255,255,255,0.2);
        }
        .hero-cta-btn:active { transform: translateY(0); }

        /* ─────────────────────────────────────────────
           FAN CAROUSEL
        ───────────────────────────────────────────── */

        .fan-section {
          position: relative;
          /* Break out of any parent container to span full viewport */
          width: 100vw;
          margin-left: calc(-50vw + 50%);
          /* tall enough for full center card + rotation swing room */
          height: ${CARD_H + 120}px;
          overflow: hidden;
          margin-top: 52px;
          cursor: grab;
          user-select: none;
          touch-action: pan-y;
        }
        .fan-section:active { cursor: grabbing; }

        /*
          Zero-size anchor at bottom-centre of the section.
          This is the shared rotation pivot for all slots.
        */
        .fan-pivot {
          position: absolute;
          bottom: 60px;           /* how high above section bottom the pivot sits */
          left: 50%;
          width: 0;
          height: 0;
          overflow: visible;
        }

        /*
          Each slot is absolute with bottom: 0 → its bottom edge
          coincides with .fan-pivot, so ALL slots share the same pivot.
          transform-origin: bottom center → rotation is around that pivot.
          JS sets: translateX + rotate + scale each frame.
        */
        .fan-slot {
          position: absolute;
          bottom: 0;
          left: ${-CARD_W / 2}px;
          width: ${CARD_W}px;
          height: ${CARD_H}px;
          transform-origin: center center;
          will-change: transform, opacity;
          opacity: 0;
        }

        .fan-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center bottom;
          display: block;
          pointer-events: none;
          user-select: none;
          filter: drop-shadow(0 8px 32px rgba(0,0,0,0.55));
        }

        /* ── Edge + bottom fades ── */
        .fan-fade {
          position: absolute;
          pointer-events: none;
          z-index: 20;
        }
        .fan-fade-l {
          top: 0; left: 0; bottom: 0;
          width: clamp(60px, 10vw, 180px);
          background: linear-gradient(to right, #070707 0%, transparent 100%);
        }
        .fan-fade-r {
          top: 0; right: 0; bottom: 0;
          width: clamp(60px, 10vw, 180px);
          background: linear-gradient(to left, #070707 0%, transparent 100%);
        }
        .fan-fade-b {
          bottom: 0; left: 0; right: 0;
          height: 90px;
          background: linear-gradient(180deg, transparent 0%, #070707 100%);
        }

        /* ── Responsive ── */
        @media (max-width: 860px) {
          .hero-section { padding-top: 96px; }
          .fan-section  { margin-top: 36px; height: ${Math.round(CARD_H * 0.72) + 90}px; }
          .fan-slot     {
            width:  ${Math.round(CARD_W * 0.72)}px;
            height: ${Math.round(CARD_H * 0.72)}px;
            left:   ${-Math.round((CARD_W * 0.72) / 2)}px;
          }
        }
        @media (max-width: 480px) {
          .fan-section { height: ${Math.round(CARD_H * 0.58) + 80}px; }
          .fan-slot     {
            width:  ${Math.round(CARD_W * 0.58)}px;
            height: ${Math.round(CARD_H * 0.58)}px;
            left:   ${-Math.round((CARD_W * 0.58) / 2)}px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .fan-slot { transition: none; }
        }
      `}</style>
    </>
  );
}