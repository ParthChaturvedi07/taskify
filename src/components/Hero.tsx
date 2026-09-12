"use client";

import * as React from "react";
import { useEffect, useRef, useLayoutEffect } from "react";
import gsap from "gsap";

/* ─────────────────────────────────────────────
   Card data
───────────────────────────────────────────── */
const FLOWER_CARDS = [
  {
    id: "card-1",
    name: "NOCTURNE",
    sub: "Focus mode",
    src: "/images/card1.png",
    alt: "Gaming setup",
  },
  {
    id: "card-2",
    name: "CIPHER",
    sub: "Daily streak",
    src: "/images/card2.png",
    alt: "VR Headset",
  },
  {
    id: "card-3",
    name: "RELAY",
    sub: "Quick tasks",
    src: "/images/card3.png",
    alt: "Arcade",
  },
  {
    id: "card-4",
    name: "AERO",
    sub: "Featured",
    src: "/images/card4.png",
    alt: "Esports",
  },
  {
    id: "card-5",
    name: "SIGNAL",
    sub: "New drop",
    src: "/images/card5.png",
    alt: "Arcade 2",
  },
] as const;

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
  }, []);
}

/* ─────────────────────────────────────────────
   Calculate Semicircular Flower Bloom Target
───────────────────────────────────────────── */
function getFlowerTransform(index: number, total: number, isMobile: boolean) {
  const centerIndex = (total - 1) / 2; // 2 for 5 items
  const offset = index - centerIndex;   // -2, -1, 0, 1, 2
  const absOffset = Math.abs(offset);

  // Angle: tighter fan angle
  const angleStep = isMobile ? 12 : 16;
  const rotation = offset * angleStep;

  // Horizontal translation spread (reduced gap)
  const xStep = isMobile ? 55 : 115;
  const x = offset * xStep;

  // Vertical curve (flower arch arching upwards)
  const yCurve = isMobile ? 10 : 16;
  const y = Math.pow(absOffset, 1.7) * yCurve;

  // Scale: center card is largest, outer cards scale down slightly
  const scale = Math.max(0.78, 1 - absOffset * 0.04);

  // Stack depth
  const zIndex = 10 - absOffset * 2;

  return { x, y, rotation, scale, zIndex };
}

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useDotField(canvasRef);

  const rewardsRef = useRef<HTMLHeadingElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  /* ── Pixel glitch effect for REWARDS ── */
  useLayoutEffect(() => {
    const el = rewardsRef.current;
    if (!el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
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

  /* ── Initial Load Stack & Flower Bloom Animation ── */
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    const total = FLOWER_CARDS.length;

    // Set initial stacked state for all cards
    cardRefs.current.forEach((cardEl, i) => {
      if (!cardEl) return;
      const centerIndex = (total - 1) / 2;
      const absOffset = Math.abs(i - centerIndex);

      gsap.set(cardEl, {
        x: 0,
        y: 45 + absOffset * 3,
        rotation: 0,
        scale: 0.82 - absOffset * 0.02,
        opacity: 0,
        transformOrigin: "50% 90%",
        zIndex: 10 - absOffset,
      });
    });

    if (reduceMotion) {
      cardRefs.current.forEach((cardEl, i) => {
        if (!cardEl) return;
        const target = getFlowerTransform(i, total, isMobile);
        gsap.set(cardEl, {
          x: target.x,
          y: target.y,
          rotation: target.rotation,
          scale: target.scale,
          opacity: 1,
          zIndex: target.zIndex,
        });
      });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        delay: 0.2,
      });

      // 1. Smoothly fade in stacked deck
      tl.to(cardRefs.current.filter(Boolean), {
        opacity: 1,
        duration: 0.4,
        stagger: 0.04,
        ease: "power2.out",
      });

      // 2. Open cards outwards in semi-circular flower bloom (staggered from center)
      const centerIndex = (total - 1) / 2;
      const sortedByDistance = Array.from({ length: total }, (_, i) => i).sort(
        (a, b) => Math.abs(a - centerIndex) - Math.abs(b - centerIndex)
      );

      sortedByDistance.forEach((index, step) => {
        const cardEl = cardRefs.current[index];
        if (!cardEl) return;
        const target = getFlowerTransform(index, total, isMobile);

        tl.to(
          cardEl,
          {
            x: target.x,
            y: target.y,
            rotation: target.rotation,
            scale: target.scale,
            zIndex: target.zIndex,
            duration: 1.15,
            ease: "back.out(1.35)",
          },
          step === 0 ? ">" : "<+=0.1"
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ── Fixed dot canvas ── */}
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

      {/* ── White radial glow ── */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: "-10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "1100px",
          height: "700px",
          background:
            "radial-gradient(ellipse at center, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 40%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ── Top-right white glow ── */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: "-15%",
          right: "-10%",
          width: "700px",
          height: "700px",
          background:
            "radial-gradient(ellipse at center, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.05) 35%, transparent 65%)",
          pointerEvents: "none",
          zIndex: 0,
          borderRadius: "50%",
          filter: "blur(40px)",
        }}
      />

      {/* ── Hero wrapper ── */}
      <div className="hero-root">

        {/* ── Text block ── */}
        <section className="hero-section">
          <h1 className="hero-h1">TURN FREE TIME</h1>
          <h1
            ref={rewardsRef}
            data-text="REWARDS"
            className="hero-accent font-pixel tracking-wide"
          >
            REWARDS
          </h1>

          <p className="hero-sub">
            Complete short tasks inside the apps you already use, earn points
            automatically, and cash out for real rewards — no grinding required.
          </p>

          <div className="hero-cta-row flex items-center justify-center gap-4">
            <button className="hero-cta-btn">Start earning</button>
            {/* <button
              onClick={replayFlowerBloom}
              className="hero-secondary-btn flex items-center gap-2"
              title="Replay Flower Bloom Animation"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
              </svg>
              <span>Rebloom</span>
            </button> */}
          </div>
        </section>

        {/* ── Flower Bloom Card Presentation Section ── */}
        <section
          className="flower-section"
          aria-label="Semicircular card blossom"
        >
          <div className="flower-pivot">
            {FLOWER_CARDS.map((card, i) => (
              <div
                key={card.id}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="flower-card-wrapper"
              >
                <div className="flower-card-inner">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={card.src}
                    alt={card.alt}
                    className="flower-card-img"
                    draggable={false}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Soft ambient edge & bottom gradients */}
          <div className="fan-fade fan-fade-l" aria-hidden="true" />
          <div className="fan-fade fan-fade-r" aria-hidden="true" />
          <div className="fan-fade fan-fade-b" aria-hidden="true" />
        </section>
      </div>

      {/* ── Scoped styles ── */}
      <style suppressHydrationWarning>{`
        @import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;500;600;700&display=swap');

        .hero-root {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        .hero-section {
          text-align: center;
          padding: 118px 24px 0;
        }

        .hero-h1 {
          font-family: var(--font-chakra);
          font-weight: 600;
          font-size: clamp(20px, 4.5vw, 36px);
          line-height: 1.2;
          letter-spacing: 0.08em;
          color: #a3a3a3;
          margin: 0 0 6px 0;
          text-transform: uppercase;
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
          font-size: clamp(64px, 17vw, 116px);
          color: #ffffff;
          letter-spacing: 0.12em;
          margin-top: 0;
          text-shadow: 0 0 60px rgba(255,255,255,0.18);
          line-height: 1.0;
          isolation: isolate;
        }

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

        .hero-secondary-btn {
          background: rgba(255, 255, 255, 0.06);
          color: #b4b4b4;
          font-family: var(--font-chakra);
          font-weight: 500;
          font-size: 14px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          padding: 16px 24px;
          border-radius: 999px;
          cursor: pointer;
          backdrop-filter: blur(8px);
          transition: all 0.25s ease;
          outline: none;
        }
        .hero-secondary-btn:hover {
          background: rgba(255, 255, 255, 0.12);
          color: #ffffff;
          border-color: rgba(255, 255, 255, 0.25);
          transform: translateY(-2px);
        }

        /* ─────────────────────────────────────────────
           FLOWER BLOOM CARD SECTION
        ───────────────────────────────────────────── */

        .flower-section {
          position: relative;
          width: 100vw;
          margin-left: calc(-50vw + 50%);
          height: 420px;
          overflow: hidden;
          margin-top: 36px;
          display: flex;
          justify-content: center;
          align-items: flex-end;
          user-select: none;
        }

        .flower-pivot {
          position: absolute;
          bottom: 30px;
          left: 50%;
          width: 0;
          height: 0;
          overflow: visible;
        }

        .flower-card-wrapper {
          position: absolute;
          bottom: 0;
          left: -160px;
          width: 320px;
          height: 380px;
          transform-origin: 50% 90%;
          will-change: transform, opacity;
          cursor: default;
        }

        .flower-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 16px;
          overflow: hidden;
        }

        .flower-card-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center bottom;
          display: block;
          pointer-events: none;
          filter: drop-shadow(0 10px 25px rgba(0, 0, 0, 0.65));
        }

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
        .fan-fade-b{
          bottom: 0; left: 0; right: 0;
          height: 90px;
          background: linear-gradient(180deg, transparent 0%, #070707 100%);
      }

        @media (max-width: 860px) {
          .hero-section { padding-top: 96px; }
          .flower-section { height: 340px; margin-top: 24px; }
          .flower-card-wrapper {
            width: 250px;
            height: 300px;
            left: -125px;
          }
        }

        @media (max-width: 480px) {
          .flower-section { height: 270px; }
          .flower-card-wrapper {
            width: 200px;
            height: 240px;
            left: -100px;
          }
        }
      `}</style>
    </>
  );
}