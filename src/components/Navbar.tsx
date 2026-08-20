"use client";

import * as React from "react";
import { Logo } from "./ui/Logo";
import { Button } from "./ui/Button";
import { PlayBadge } from "./ui/PlayBadge";
import { Menu, X } from "lucide-react";
import gsap from "gsap";

const mobileLinks = ["About", "Reviews", "FAQs", "Contact"];

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  const menuRef = React.useRef<HTMLDivElement>(null);
  const menuLinksRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!menuRef.current || !menuLinksRef.current) return;

    const menu = menuRef.current;
    const links = menuLinksRef.current.children;

    if (isOpen) {
      gsap.to(menu, {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.55,
        ease: "power3.out",
        pointerEvents: "auto",
      });

      gsap.fromTo(
        links,
        {
          opacity: 0,
          y: 18,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.07,
          delay: 0.12,
          ease: "power3.out",
        }
      );
    } else {
      gsap.to(menu, {
        opacity: 0,
        y: -12,
        scale: 0.98,
        filter: "blur(6px)",
        duration: 0.3,
        ease: "power2.inOut",
        pointerEvents: "none",
      });
    }
  }, [isOpen]);

  return (
    <nav className="absolute left-0 right-0 top-0 z-50 px-6 py-6 md:px-12">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Logo />

        {/* Desktop Links */}
        <div className="hidden items-center gap-8 font-medium text-white/80 md:flex">
          <a
            href="#"
            className="transition-colors duration-300 hover:text-white"
          >
            About
          </a>

          <a
            href="#"
            className="transition-colors duration-300 hover:text-white"
          >
            Reviews
          </a>

          <a
            href="#"
            className="transition-colors duration-300 hover:text-white"
          >
            FAQs
          </a>

          <a
            href="#"
            className="transition-colors duration-300 hover:text-white"
          >
            Contact
          </a>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Button variant="outline" className="gap-2">
            EXPLORE APPS
            <PlayBadge className="h-4 w-4" />
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
          className="
            relative z-[60]
            flex h-11 w-11 items-center justify-center
            rounded-full
            border border-white/10
            bg-white/[0.06]
            text-white
            backdrop-blur-xl
            transition-all duration-300
            hover:bg-white/[0.1]
            active:scale-90
            md:hidden
          "
        >
          <span
            className={`absolute transition-all duration-300 ${
              isOpen
                ? "rotate-90 scale-100 opacity-100"
                : "rotate-0 scale-100 opacity-100"
            }`}
          >
            {isOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </span>
        </button>
      </div>

      {/* =====================================================
          MOBILE GLASS MENU
      ===================================================== */}

      <div
        ref={menuRef}
        className="
          pointer-events-none
          absolute left-4 right-4 top-[76px]
          z-50
          origin-top
          opacity-0
          -translate-y-3
          scale-[0.98]
          overflow-hidden
          rounded-2xl
          border border-white/[0.12]
          bg-black/45
          p-4
          shadow-[0_20px_60px_rgba(0,0,0,0.45)]
          backdrop-blur-2xl
          md:hidden
        "
      >
        {/* Glass highlight */}
        <div
          className="
            pointer-events-none
            absolute inset-x-8 top-0
            h-px
            bg-gradient-to-r
            from-transparent
            via-[#3DD5F3]/60
            to-transparent
          "
        />

        {/* Subtle cyan ambient glow */}
        <div
          className="
            pointer-events-none
            absolute -right-20 -top-20
            h-40 w-40
            rounded-full
            bg-[#3DD5F3]/10
            blur-3xl
          "
        />

        <div
          ref={menuLinksRef}
          className="relative flex flex-col items-center gap-1"
        >
          {mobileLinks.map((link) => (
            <a
              key={link}
              href="#"
              onClick={() => setIsOpen(false)}
              className="
                group
                flex items-center justify-between
                rounded-xl
                px-4 py-3.5
                text-[15px]
                font-medium
                text-white/80
                transition-all duration-300
                hover:bg-white/[0.06]
                hover:text-white
                active:scale-[0.98]
              "
            >
              <span>{link}</span>

              <span
                className="
                  h-1.5 w-1.5
                  rounded-full
                  bg-[#3DD5F3]
                  opacity-0
                  shadow-[0_0_10px_#3DD5F3]
                  transition-all duration-300
                  group-hover:opacity-100
                "
              />
            </a>
          ))}

          {/* Divider */}
          <div className="my-2 h-px bg-white/[0.08]" />

          {/* Mobile CTA */}
          <Button
            variant="outline"
            className="
              mt-1
              w-full
              justify-center
              gap-2
              rounded-xl
            "
            onClick={() => setIsOpen(false)}
          >
            EXPLORE APPS
            <PlayBadge className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </nav>
  );
}