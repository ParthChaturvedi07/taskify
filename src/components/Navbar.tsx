"use client";

import * as React from "react";

const NAV_LINKS = ["About", "Reviews", "FAQs", "Contact"];

export function Navbar() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <nav className="tg-nav">
        {/* Logo */}
        <div className="tg-logo">
          <div className="tg-logo-mark">T</div>
          <div className="tg-logo-text">
            TASKIFY
            <span>GAMES</span>
          </div>
        </div>

        {/* Desktop links */}
        <ul className="tg-nav-links">
          {NAV_LINKS.map((link) => (
            <li key={link}>
              <a href="#">{link}</a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a href="#" className="tg-nav-cta tg-nav-cta--desktop">
          Explore apps
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        </a>

        {/* Mobile hamburger */}
        <button
          className="tg-hamburger"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`tg-ham-bar ${open ? "tg-ham-bar--top-open" : ""}`} />
          <span className={`tg-ham-bar ${open ? "tg-ham-bar--mid-open" : ""}`} />
          <span className={`tg-ham-bar ${open ? "tg-ham-bar--bot-open" : ""}`} />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className={`tg-mobile-menu ${open ? "tg-mobile-menu--open" : ""}`}>
        {NAV_LINKS.map((link) => (
          <a key={link} href="#" onClick={() => setOpen(false)} className="tg-mobile-link">
            {link}
          </a>
        ))}
        <a href="#" className="tg-nav-cta tg-nav-cta--mobile" onClick={() => setOpen(false)}>
          Explore apps
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        </a>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;500;600;700&display=swap');

        /* ── NAV CONTAINER ── */
        .tg-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 28px 56px;
          max-width: 1360px;
          margin: 0 auto;
          /* full-width fixed needs left/right 0 but content centred */
        }

        /* make the fixed bar span full width, centre content */
        .tg-nav {
          left: 0;
          right: 0;
          max-width: none;
          padding: 28px max(24px, calc((100vw - 1360px) / 2 + 56px));
        }

        /* ── LOGO ── */
        .tg-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          flex-shrink: 0;
        }

        .tg-logo-mark {
          width: 34px;
          height: 34px;
          border: 1.5px solid #ffffff;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Chakra Petch', sans-serif;
          font-weight: 700;
          font-size: 16px;
          color: #ffffff;
          flex-shrink: 0;
        }

        .tg-logo-text {
          font-family: 'Chakra Petch', sans-serif;
          font-weight: 600;
          font-size: 14.5px;
          line-height: 1.15;
          letter-spacing: 0.02em;
          color: #ffffff;
        }

        .tg-logo-text span {
          display: block;
          color: #6b6b6b;
          font-weight: 500;
        }

        /* ── DESKTOP LINKS ── */
        .tg-nav-links {
          display: flex;
          gap: 40px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .tg-nav-links a {
          color: #b4b4b4;
          text-decoration: none;
          font-size: 14.5px;
          font-weight: 500;
          transition: color 0.25s ease;
          font-family: 'Inter', sans-serif;
        }

        .tg-nav-links a:hover { color: #ffffff; }

        /* ── CTA PILL ── */
        .tg-nav-cta {
          display: flex;
          align-items: center;
          gap: 9px;
          border: 1px solid #2a2a2a;
          background: #101010;
          color: #ffffff;
          padding: 11px 20px;
          border-radius: 999px;
          font-size: 13.5px;
          font-weight: 500;
          font-family: 'Inter', sans-serif;
          text-decoration: none;
          transition: border-color 0.25s ease, background 0.25s ease;
          white-space: nowrap;
          cursor: pointer;
        }

        .tg-nav-cta:hover {
          border-color: #6b6b6b;
          background: #151515;
        }

        .tg-nav-cta svg { width: 13px; height: 13px; flex-shrink: 0; }

        /* ── HAMBURGER (mobile only) ── */
        .tg-hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          width: 40px;
          height: 40px;
          background: none;
          border: 1px solid #2a2a2a;
          border-radius: 8px;
          cursor: pointer;
          padding: 0 10px;
        }

        .tg-ham-bar {
          display: block;
          width: 100%;
          height: 1.5px;
          background: #ffffff;
          border-radius: 2px;
          transition: transform 0.25s ease, opacity 0.25s ease;
          transform-origin: center;
        }

        .tg-ham-bar--top-open { transform: translateY(6.5px) rotate(45deg); }
        .tg-ham-bar--mid-open { opacity: 0; transform: scaleX(0); }
        .tg-ham-bar--bot-open { transform: translateY(-6.5px) rotate(-45deg); }

        /* ── MOBILE MENU ── */
        .tg-mobile-menu {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 49;
          display: flex;
          flex-direction: column;
          gap: 4px;
          background: rgba(7, 7, 7, 0.97);
          border-bottom: 1px solid #1c1c1c;
          padding: 96px 24px 28px;
          backdrop-filter: blur(12px);
          transform: translateY(-110%);
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .tg-mobile-menu--open { transform: translateY(0); }

        .tg-mobile-link {
          color: #b4b4b4;
          text-decoration: none;
          font-size: 16px;
          font-weight: 500;
          font-family: 'Inter', sans-serif;
          padding: 14px 4px;
          border-bottom: 1px solid #1c1c1c;
          transition: color 0.2s ease;
        }
        .tg-mobile-link:last-of-type { border-bottom: none; }
        .tg-mobile-link:hover { color: #ffffff; }

        .tg-nav-cta--mobile {
          margin-top: 16px;
          justify-content: center;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 860px) {
          .tg-nav { padding: 24px 24px; }
          .tg-nav-links { display: none; }
          .tg-nav-cta--desktop { display: none; }
          .tg-hamburger { display: flex; }
        }

        @media (min-width: 861px) {
          .tg-mobile-menu { display: none; }
          .tg-hamburger { display: none; }
        }
      `}} />
    </>
  );
}