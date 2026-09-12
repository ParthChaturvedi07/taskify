"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";

/* ─────────────────────────────────────────────
   SVG icons — slightly thicker, clean
───────────────────────────────────────────── */
const IconUsers = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const IconClock = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);
const IconShield = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const IconHeadset = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z" />
    <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
  </svg>
);

/* ─────────────────────────────────────────────
   Card data — each with its own accent colour
───────────────────────────────────────────── */
const leftCards = [
  {
    icon: <IconUsers />,
    title: "Easy to Use",
    desc: "Best-in-segment UX that makes every interaction feel effortless and intuitive.",
    accent: "#6366f1",   // indigo
    iconBg: "rgba(99,102,241,0.15)",
  },
  {
    icon: <IconShield />,
    title: "Secured",
    desc: "Industry-leading safety standards keep your data and transactions completely safe.",
    accent: "#10b981",   // emerald
    iconBg: "rgba(16,185,129,0.15)",
  },
];
const rightCards = [
  {
    icon: <IconClock />,
    title: "Realtime Delivery",
    desc: "Near-instant payouts with a variety of withdrawal options at your fingertips.",
    accent: "#f59e0b",   // amber
    iconBg: "rgba(245,158,11,0.15)",
  },
  {
    icon: <IconHeadset />,
    title: "24-hour Support",
    desc: "Our dedicated team is here around the clock — every hour, every day.",
    accent: "#ec4899",   // pink
    iconBg: "rgba(236,72,153,0.15)",
  },
];

/* ─────────────────────────────────────────────
   Premium feature card
───────────────────────────────────────────── */
function FeatureCard({
  icon, title, desc, accent, iconBg,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  accent: string;
  iconBg: string;
}) {
  return (
    <div className="fg-card" style={{ "--accent": accent, "--icon-bg": iconBg } as React.CSSProperties}>
      {/* top accent line */}
      <div className="fg-card-accent-bar" />

      <div className="fg-icon-box">
        {icon}
      </div>
      <h3 className="fg-card-title">{title}</h3>
      <p className="fg-card-desc">{desc}</p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Center phone card
───────────────────────────────────────────── */
function PhoneCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const onMove = (e: MouseEvent) => {
      const r = card.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      const ny = ((e.clientY - r.top) / r.height - 0.5) * 2;
      target.current = { x: -ny * 15, y: nx * 15 };
    };
    const onLeave = () => { target.current = { x: 0, y: 0 }; };

    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const tick = () => {
      current.current.x = lerp(current.current.x, target.current.x, 0.08);
      current.current.y = lerp(current.current.y, target.current.y, 0.08);
      if (phoneRef.current) {
        const { x, y } = current.current;
        phoneRef.current.style.transform =
          `perspective(900px) rotateX(${x}deg) rotateY(${y}deg) scale3d(1.03,1.03,1.03)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div ref={cardRef} className="fg-card fg-phone-card">
      <div className="fg-card-inner">
        {/* multi-layer inner glow */}
        <div className="fg-phone-glow" />

        <div ref={phoneRef} className="fg-phone-3d">
          <Image
            src="/iphone-3d.png"
            alt="Taskify gaming app on iPhone"
            width={320}
            height={480}
            className="fg-phone-img"
            priority
            draggable={false}
          />
          {/* coloured floor shadow/reflection under phone */}
          <div className="fg-phone-shadow" />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main FeaturesGrid
───────────────────────────────────────────── */
export function FeaturesGrid() {
  const [particles] = useState(() =>
    Array.from({ length: 24 }, (_, i) => ({
      id: i,
      left: (i * 37 + 13) % 100,
      top: (i * 53 + 7) % 100,
      size: (i % 3) + 1,
      duration: (i % 4) + 4,
      delay: (i % 6) * 0.9,
    }))
  );

  return (
    <>
      <style>{`
        /* ─── Google Fonts ─── */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        /* ─── Section wrapper ─── */
        .fg-section {
          position: relative;
          width: 100%;
          padding: 90px 40px 100px;
          overflow: hidden;
          background: transparent;
          font-family: 'Inter', sans-serif;
        }

        /* Subtle radial ambient glow — violet + blue */
        .fg-section::before {
          content: "";
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 900px; height: 600px;
          background:
            radial-gradient(ellipse at 40% 50%, rgba(139,92,246,0.08) 0%, transparent 60%),
            radial-gradient(ellipse at 60% 50%, rgba(59,130,246,0.07) 0%, transparent 60%);
          pointer-events: none;
          z-index: 0;
        }

        /* Fine dot-grid */
        .fg-section::after {
          content: "";
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 26px 26px;
          pointer-events: none;
          z-index: 0;
        }

        /* ─── Section label + heading ─── */
        .fg-header {
          position: relative;
          z-index: 1;
          text-align: center;
          margin-bottom: 52px;
        }
        .fg-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 14px;
          border-radius: 999px;
          background: rgba(139,92,246,0.12);
          border: 1px solid rgba(139,92,246,0.3);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #a78bfa;
          margin-bottom: 14px;
        }
        .fg-pill-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #a78bfa;
          animation: fgPulse 2s ease-in-out infinite;
        }
        @keyframes fgPulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.4; transform: scale(0.7); }
        }
        .fg-heading {
          font-size: clamp(1.6rem, 3vw, 2.2rem);
          font-weight: 700;
          color: #fff;
          letter-spacing: -0.03em;
          margin: 0;
          line-height: 1.2;
        }
        .fg-heading span {
          background: linear-gradient(135deg, #a78bfa 0%, #60a5fa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* ─── 3-col grid ─── */
        .fg-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr 1.15fr 1fr;
          align-items: stretch;
          gap: 18px;
          max-width: 1180px;
          margin: 0 auto;
        }
        .fg-col {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        /* ─── Card shell ─── */
        .fg-card {
          position: relative;
          /* gradient border via pseudo + background-clip */
          border-radius: 22px;
          padding: 1px;               /* border thickness */
          background: linear-gradient(
            145deg,
            rgba(255,255,255,0.10) 0%,
            rgba(255,255,255,0.03) 50%,
            rgba(139,92,246,0.12) 100%
          );
          transition: background 0.35s ease, box-shadow 0.35s ease, transform 0.35s ease;
          cursor: default;
        }
        .fg-card:hover {
          background: linear-gradient(
            145deg,
            rgba(255,255,255,0.18) 0%,
            rgba(139,92,246,0.15) 50%,
            rgba(59,130,246,0.18) 100%
          );
          box-shadow:
            0 0 0 1px rgba(139,92,246,0.2),
            0 20px 60px rgba(0,0,0,0.5),
            inset 0 1px 0 rgba(255,255,255,0.06);
          transform: translateY(-4px);
        }

        /* Inner card content area */
        .fg-card-inner {
          background: linear-gradient(160deg, rgba(18,18,26,0.97) 0%, rgba(13,13,20,0.99) 100%);
          border-radius: 21px;
          padding: 26px 22px 24px;
          height: 100%;
          box-sizing: border-box;
        }

        /* Top accent line */
        .fg-card-accent-bar {
          position: absolute;
          top: 1px; left: 20px; right: 20px;
          height: 2px;
          border-radius: 0 0 4px 4px;
          background: linear-gradient(90deg, transparent, var(--accent, #6366f1), transparent);
          opacity: 0.7;
          transition: opacity 0.3s ease;
          z-index: 2;
        }
        .fg-card:hover .fg-card-accent-bar { opacity: 1; }

        /* ─── Icon box ─── */
        .fg-icon-box {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 46px; height: 46px;
          border-radius: 12px;
          margin-bottom: 16px;
          background: var(--icon-bg, rgba(99,102,241,0.15));
          border: 1px solid rgba(255,255,255,0.08);
          color: var(--accent, #6366f1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .fg-card:hover .fg-icon-box {
          transform: scale(1.08);
          box-shadow: 0 0 16px var(--accent, #6366f1), 0 0 4px var(--accent, #6366f1);
        }

        .fg-card-title {
          font-size: 1rem;
          font-weight: 700;
          color: #f1f1f5;
          margin: 0 0 8px;
          letter-spacing: -0.015em;
        }
        .fg-card-desc {
          font-size: 0.84rem;
          line-height: 1.7;
          color: rgba(255,255,255,0.4);
          margin: 0;
        }

        /* ─── Centre phone card ─── */
        .fg-phone-card {
          cursor: crosshair;
        }
        .fg-phone-card:hover {
          transform: none;
        }
        .fg-phone-card .fg-card-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 28px 16px 36px;
          overflow: hidden;
        }

        /* Multi-stop inner glow behind phone */
        .fg-phone-glow {
          position: absolute;
          inset: 0;
          border-radius: 21px;
          background:
            radial-gradient(ellipse at 50% 30%, rgba(139,92,246,0.18) 0%, transparent 55%),
            radial-gradient(ellipse at 50% 80%, rgba(59,130,246,0.12) 0%, transparent 50%);
          pointer-events: none;
          z-index: 0;
        }

        /* 3D phone wrapper */
        .fg-phone-3d {
          position: relative;
          z-index: 1;
          will-change: transform;
          transform-style: preserve-3d;
          transition: none;
          filter:
            drop-shadow(0 -2px 20px rgba(139,92,246,0.4))
            drop-shadow(0 10px 30px rgba(59,130,246,0.25))
            drop-shadow(0 2px 6px rgba(0,0,0,0.7));
          animation: fgBob 5s ease-in-out infinite;
        }
        @keyframes fgBob {
          0%,100% { translate: 0 0px;  }
          50%      { translate: 0 -12px; }
        }

        .fg-phone-img {
          display: block;
          width: 100%;
          max-width: 310px;
          height: auto;
          user-select: none;
          pointer-events: none;
        }

        /* ── Coloured floor shadow under phone ── */
        .fg-phone-shadow {
          width: 160px;
          height: 14px;
          margin: -4px auto 0;
          border-radius: 50%;
          background: radial-gradient(ellipse at center,
            rgba(139,92,246,0.55) 0%,
            rgba(99,102,241,0.25) 40%,
            transparent 75%
          );
          filter: blur(6px);
        }

        /* ─── Floating particles ─── */
        .fg-particle {
          position: absolute;
          border-radius: 50%;
          background: rgba(139,92,246,0.35);
          pointer-events: none;
          z-index: 0;
          animation: fgFloat linear infinite;
        }
        @keyframes fgFloat {
          0%   { transform: translateY(0);     opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 0.5; }
          100% { transform: translateY(-80px); opacity: 0; }
        }

        /* ─── Responsive ─── */
        @media (max-width: 960px) {
          .fg-grid {
            grid-template-columns: 1fr;
          }
          .fg-phone-card { order: -1; }
          .fg-section { padding: 60px 20px 70px; }
          .fg-heading { font-size: 1.5rem; }
        }
      `}</style>

      <section className="fg-section" id="features">
        {/* ambient particles */}
        {particles.map((p) => (
          <span
            key={p.id}
            className="fg-particle"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}

        {/* Section heading */}
        <div className="fg-header">
          <div className="fg-pill">
            <span className="fg-pill-dot" />
            Why Choose Us
          </div>
          <h2 className="fg-heading">
            Everything you need,<br />
            <span>built for players</span>
          </h2>
        </div>

        <div className="fg-grid">
          {/* LEFT */}
          <div className="fg-col">
            {leftCards.map((c) => (
              <div
                key={c.title}
                className="fg-card"
                style={{ "--accent": c.accent, "--icon-bg": c.iconBg } as React.CSSProperties}
              >
                <div className="fg-card-accent-bar" />
                <div className="fg-card-inner">
                  <div className="fg-icon-box">{c.icon}</div>
                  <h3 className="fg-card-title">{c.title}</h3>
                  <p className="fg-card-desc">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CENTRE */}
          <PhoneCard />

          {/* RIGHT */}
          <div className="fg-col">
            {rightCards.map((c) => (
              <div
                key={c.title}
                className="fg-card"
                style={{ "--accent": c.accent, "--icon-bg": c.iconBg } as React.CSSProperties}
              >
                <div className="fg-card-accent-bar" />
                <div className="fg-card-inner">
                  <div className="fg-icon-box">{c.icon}</div>
                  <h3 className="fg-card-title">{c.title}</h3>
                  <p className="fg-card-desc">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
