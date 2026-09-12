"use client";
import * as React from "react";
import Image from "next/image";

const NAV_LINKS = ["About", "Reviews", "FAQs", "Contact"];

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── Full-width glass navbar ── */}
      <div className={`tg-nav-wrap ${scrolled ? "tg-nav-wrap--scrolled" : ""}`}>
        <nav className="tg-nav">
          {/* Logo */}
          <a href="#" className="tg-logo" aria-label="Taskify home">
            <Image
              src="/images/logo.png"
              alt="Taskify Logo"
              width={90}
              height={90}
              className="tg-logo-img"
              priority
            />
          </a>

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
      </div>

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

      <style suppressHydrationWarning dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;500;600;700&display=swap');

        /* ── FULL-WIDTH GLASS BAR ── */
        .tg-nav-wrap {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 50;
          /* Fully transparent at the top */
          background: transparent;
          backdrop-filter: blur(0px);
          -webkit-backdrop-filter: blur(0px);
          border-bottom: 1px solid transparent;
          box-shadow: none;
          transition:
            background 0.4s ease,
            backdrop-filter 0.4s ease,
            -webkit-backdrop-filter 0.4s ease,
            border-color 0.4s ease,
            box-shadow 0.4s ease;
        }

        /* Glassmorphism kicks in on scroll */
        .tg-nav-wrap--scrolled {
          background: rgba(6, 6, 6, 0.72);
          backdrop-filter: blur(22px) saturate(160%);
          -webkit-backdrop-filter: blur(22px) saturate(160%);
          border-bottom-color: rgba(255, 255, 255, 0.08);
          box-shadow: 0 4px 40px rgba(0, 0, 0, 0.5);
        }

        /* ── NAV ROW ── */
        .tg-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 72px;
          padding: 0 max(24px, calc((100vw - 1360px) / 2 + 56px));
          gap: 16px;
        }

        /* ── LOGO ── */
        .tg-logo {
          display: flex;
          align-items: center;
          flex-shrink: 0;
          text-decoration: none;
          height: 100%;
        }

        .tg-logo-img {
          width: 90px;
          height: 90px;
          object-fit: contain;
          display: block;
          margin-top: -9px;
          margin-bottom: -9px;
          transition: transform 0.25s ease;
        }

        .tg-logo:hover .tg-logo-img {
          transform: scale(1.05);
        }

        /* ── DESKTOP LINKS ── */
        .tg-nav-links {
          display: flex;
          gap: 36px;
          list-style: none;
          margin: 0;
          padding: 0;
          flex: 1;
          justify-content: center;
        }

        .tg-nav-links a {
          color: rgba(180, 180, 180, 0.85);
          text-decoration: none;
          font-size: 13.5px;
          font-weight: 500;
          letter-spacing: 0.01em;
          transition: color 0.2s ease;
          font-family: 'Inter', sans-serif;
        }

        .tg-nav-links a:hover { color: #ffffff; }

        /* ── CTA PILL ── */
        .tg-nav-cta {
          display: flex;
          align-items: center;
          gap: 8px;
          border: 1px solid rgba(255,255,255,0.14);
          background: rgba(255, 255, 255, 0.07);
          color: #ffffff;
          padding: 9px 18px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 500;
          font-family: 'Inter', sans-serif;
          text-decoration: none;
          transition: border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
          white-space: nowrap;
          cursor: pointer;
          backdrop-filter: blur(8px);
        }

        .tg-nav-cta:hover {
          border-color: rgba(255,255,255,0.3);
          background: rgba(255,255,255,0.12);
          box-shadow: 0 0 16px rgba(255,255,255,0.06);
        }

        .tg-nav-cta svg { width: 12px; height: 12px; flex-shrink: 0; }

        /* ── HAMBURGER (mobile only) ── */
        .tg-hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          width: 38px;
          height: 38px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          cursor: pointer;
          padding: 0 9px;
          flex-shrink: 0;
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
          background: rgba(7, 7, 7, 0.92);
          border-bottom: 1px solid rgba(255,255,255,0.07);
          padding: 90px 24px 28px;
          backdrop-filter: blur(20px) saturate(140%);
          -webkit-backdrop-filter: blur(20px) saturate(140%);
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
          border-bottom: 1px solid rgba(255,255,255,0.06);
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
          .tg-nav {
            height: 64px;
            padding: 0 20px;
          }
          .tg-logo-img {
            width: 58px;
            height: 58px;
            margin-top: 0;
            margin-bottom: 0;
          }
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