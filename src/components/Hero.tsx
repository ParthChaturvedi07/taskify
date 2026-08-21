"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Carousel } from "./ui/Carousel";
import { Button } from "./ui/Button";
import Image from "next/image";

const carouselItems = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1654859869130-fd0a2aa5539b?q=80&w=1228&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Gaming setup 1",
    index: 0,
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1635336969656-0e63e076904f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2NpZml8ZW58MHx8MHx8fDA%3D",
    alt: "VR Headset",
    index: 1,
  },
  {
    id: "3",
    src: "https://plus.unsplash.com/premium_photo-1682124752476-40db22034a58?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Arcade",
    index: 2,
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1625314887424-9f190599bd56?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Esports",
    index: 3,
  },
  {
    id: "5",
    src: "https://images.unsplash.com/photo-1742745181459-815e9815ac05?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaGldfGVufDB8fHx8fA%3D%3D",
    alt: "Gaming setup 2",
    index: 4,
  },
  {
    id: "6",
    src: "https://images.unsplash.com/photo-1590642956346-d2c9095f0bf1?q=80&w=763&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaGx8fHx8fA%3D%3D",
    alt: "VR Headset 2",
    index: 5,
  },
  {
    id: "7",
    src: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=647&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaGx8fHx8fA%3D%3D",
    alt: "Arcade 2",
    index: 6,
  },
];


export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  const headlineRef = useRef<HTMLDivElement>(null);
  const rewardsRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const clockRef = useRef<HTMLDivElement>(null);

  const glitch1Ref = useRef<HTMLSpanElement>(null);
  const glitch2Ref = useRef<HTMLSpanElement>(null);
  const glitch3Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // if (!startAnimation) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [
            headlineRef.current,
            rewardsRef.current,
            carouselRef.current,
            buttonRef.current,
          ],
          {
            clearProps: "all",
          }
        );
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /*
         * -----------------------------------------
         * INITIAL POSITION
         * -----------------------------------------
         */

        gsap.set(headlineRef.current, {
          y: 90,
          opacity: 0,
          filter: "blur(8px)",
        });

        gsap.set(rewardsRef.current, {
          y: 120,
          opacity: 0,
          scale: 0.94,
          filter: "blur(10px)",
        });

        gsap.set(carouselRef.current, {
          y: 240,
          opacity: 0,
          scale: 0.86,
          filter: "blur(14px)",
        });

        gsap.set(buttonRef.current, {
          y: 80,
          opacity: 0,
        });

        /*
         * -----------------------------------------
         * HERO ENTRANCE
         * -----------------------------------------
         */

        const intro = gsap.timeline({
          defaults: {
            ease: "power4.out",
          },
        });

        // "TURN FREE TIME [clock] INTO"
        intro.to(headlineRef.current, {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.05,
          ease: "power4.out",
        });

        // REWARDS comes in with more weight
        intro.to(
          rewardsRef.current,
          {
            y: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.15,
            ease: "expo.out",
          },
          "-=0.7"
        );

        // Carousel comes from much deeper
        intro.to(
          carouselRef.current,
          {
            y: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.35,
            ease: "expo.out",
          },
          "<"
        );

        // CTA follows the carousel
        intro.to(
          buttonRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "back.out(1.4)",
          },
          "<0.1"
        );

        /*
         * -----------------------------------------
         * SUBTLE SECONDARY MOVEMENT
         * -----------------------------------------
         */

        // Very subtle settle after entrance
        intro.to(
          carouselRef.current,
          {
            y: -8,
            duration: 0.35,
            ease: "power2.out",
          },
          "-=0.2"
        );

        intro.to(
          carouselRef.current,
          {
            y: 0,
            duration: 0.45,
            ease: "power2.inOut",
          },
          "-=0.05"
        );

        // Clock's final cartoonish entrance
        intro
          .set(clockRef.current, {
            transformPerspective: 800,
            transformOrigin: "center center",
          })
          .to(
            clockRef.current,
            {
              scale: 0.75,
              rotateY: -180,
              rotateX: 12,
              y: -4,
              duration: 0.42,
              ease: "power3.in",
            },
            "+=0.12"
          )
          .to(clockRef.current, {
            scale: 1.15,
            rotateY: 20,
            rotateX: -8,
            y: 0,
            duration: 0.38,
            ease: "back.out(2)",
          })
          .to(clockRef.current, {
            scale: 1,
            rotateY: 0,
            rotateX: 0,
            duration: 0.45,
            ease: "elastic.out(1, 0.55)",
          });
      });

      return () => mm.revert();
    }, heroRef);

    return () => ctx.revert();
  }, []);

  /*
   * -----------------------------------------
   * REWARDS GLITCH
   * -----------------------------------------
   */

  useEffect(() => {
    // if (!startAnimation) return;
    const layers = [
      glitch1Ref.current,
      glitch2Ref.current,
      glitch3Ref.current,
    ];

    if (!layers.every(Boolean)) return;

    const glitch = () => {
      const tl = gsap.timeline();

      tl.set(layers, {
        x: 0,
        skewX: 0,
        opacity: 1,
      });

      tl.to(glitch1Ref.current, {
        x: -12,
        skewX: -8,
        duration: 0.06,
        ease: "none",
      })
        .to(
          glitch2Ref.current,
          {
            x: 14,
            skewX: 6,
            duration: 0.05,
            ease: "none",
          },
          "<"
        )
        .to(
          glitch3Ref.current,
          {
            x: -7,
            skewX: -4,
            duration: 0.04,
            ease: "none",
          },
          "<"
        )
        .to(layers, {
          x: 0,
          skewX: 0,
          duration: 0.04,
          ease: "none",
        })

        .to(glitch1Ref.current, {
          x: 7,
          duration: 0.035,
          ease: "none",
        })
        .to(
          glitch2Ref.current,
          {
            x: -9,
            duration: 0.035,
            ease: "none",
          },
          "<"
        )
        .to(layers, {
          x: 0,
          duration: 0.035,
          ease: "none",
        });
    };

    const initialGlitch = gsap.delayedCall(2, glitch);

    const interval = window.setInterval(() => {
      if (Math.random() > 0.45) {
        glitch();
      }
    }, 1500);

    return () => {
      initialGlitch.kill();
      window.clearInterval(interval);
    };
  }, []);

  /*
   * -----------------------------------------
   * CLOCK INFINITE CARTOON ANIMATIONS
   * -----------------------------------------
   */

  useEffect(() => {
    const clock = clockRef.current;
    if (!clock) return;

    gsap.set(clock, { transformPerspective: 800, transformOrigin: "center center" });

    // 6 distinct cartoonish effects to cycle through
    const effects = [
      // 1. Wobbly spin — classic cartoon swirl
      () =>
        gsap.timeline().to(clock, {
          rotateZ: -18,
          scale: 0.9,
          duration: 0.18,
          ease: "power2.in",
        }).to(clock, {
          rotateZ: 380,
          scale: 1.12,
          duration: 0.55,
          ease: "back.out(1.7)",
        }).to(clock, {
          rotateZ: 360,
          scale: 1,
          duration: 0.35,
          ease: "elastic.out(1, 0.5)",
        }),

      // 2. Squash & stretch bounce
      () =>
        gsap.timeline()
          .to(clock, { scaleY: 0.65, scaleX: 1.3, duration: 0.14, ease: "power2.in" })
          .to(clock, { scaleY: 1.35, scaleX: 0.75, y: -22, duration: 0.22, ease: "power3.out" })
          .to(clock, { scaleY: 0.8, scaleX: 1.15, y: 0, duration: 0.14, ease: "power2.in" })
          .to(clock, { scaleY: 1.1, scaleX: 0.94, y: -8, duration: 0.14, ease: "power2.out" })
          .to(clock, { scaleY: 1, scaleX: 1, y: 0, duration: 0.2, ease: "elastic.out(1, 0.45)" }),

      // 3. Tilt shimmy — side-to-side head-shake
      () =>
        gsap.timeline()
          .to(clock, { rotateZ: -25, x: -6, duration: 0.1, ease: "power2.out" })
          .to(clock, { rotateZ: 22, x: 6, duration: 0.1, ease: "power2.inOut" })
          .to(clock, { rotateZ: -18, x: -5, duration: 0.1, ease: "power2.inOut" })
          .to(clock, { rotateZ: 14, x: 4, duration: 0.1, ease: "power2.inOut" })
          .to(clock, { rotateZ: -8, x: -2, duration: 0.1, ease: "power2.inOut" })
          .to(clock, { rotateZ: 0, x: 0, duration: 0.18, ease: "elastic.out(1, 0.4)" }),

      // 4. Full 3-D barrel roll flip
      () =>
        gsap.timeline()
          .to(clock, { rotateY: -90, scale: 0.8, duration: 0.22, ease: "power2.in" })
          .to(clock, { rotateY: -200, scale: 1.18, duration: 0.3, ease: "power3.out" })
          .to(clock, { rotateY: -360, scale: 0.92, duration: 0.25, ease: "power2.inOut" })
          .to(clock, { rotateY: 0, scale: 1, duration: 0.3, ease: "elastic.out(1, 0.55)" }),

      // 5. Rubber-band pulse — heartbeat throb
      () =>
        gsap.timeline()
          .to(clock, { scale: 1.28, duration: 0.15, ease: "power2.out" })
          .to(clock, { scale: 0.88, duration: 0.12, ease: "power2.in" })
          .to(clock, { scale: 1.14, duration: 0.12, ease: "power2.out" })
          .to(clock, { scale: 0.95, duration: 0.1, ease: "power2.in" })
          .to(clock, { scale: 1, duration: 0.18, ease: "elastic.out(1, 0.4)" }),

      // 6. Float drift — lazy levitation with rotateX
      () =>
        gsap.timeline()
          .to(clock, { y: -16, rotateX: 20, scale: 1.08, duration: 0.4, ease: "sine.out" })
          .to(clock, { y: 4, rotateX: -10, scale: 0.96, duration: 0.35, ease: "sine.inOut" })
          .to(clock, { y: 0, rotateX: 0, scale: 1, duration: 0.3, ease: "elastic.out(1, 0.5)" }),
    ];

    let effectIndex = 0;
    let timer: ReturnType<typeof setTimeout>;

    const scheduleNext = () => {
      // Randomise interval between 1.4s–2.8s
      const delay = 1400 + Math.random() * 1400;
      timer = setTimeout(() => {
        const tl = effects[effectIndex % effects.length]();
        effectIndex++;
        // Wait for the timeline to finish, then schedule again
        tl.eventCallback("onComplete", scheduleNext);
      }, delay);
    };

    // Kick off after entrance animation finishes (~2s)
    const kickoff = setTimeout(scheduleNext, 2000);

    return () => {
      clearTimeout(kickoff);
      clearTimeout(timer);
      gsap.killTweensOf(clock);
    };
  }, []);


  return (
    <div
      ref={heroRef}
      className="z-10 flex w-full flex-1 flex-col items-center pt-6 pb-6 md:justify-center md:gap-4 md:pt-0 md:pb-0"
    >
      {/* HEADLINE */}
      <div className="flex flex-col items-center text-center">
        <div
          ref={headlineRef}
          className="flex flex-wrap items-center justify-center gap-2 px-3 text-[clamp(2rem,9vw,3.75rem)] font-bold tracking-tight text-white leading-none"
          style={{
            textShadow: "0px 4px 10px rgba(0,0,0,0.8)",
            fontFamily: '"Darker Grotesque", sans-serif',
          }}
        >
          <span>TURN FREE TIME</span>

          <div
            ref={clockRef}
            className="relative flex h-[clamp(2.5rem,9vw,4rem)] w-[clamp(2.5rem,9vw,4rem)] items-center justify-center overflow-hidden rounded-full"
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            <Image
              src="/images/clock.png"
              alt="Clock"
              width={100}
              height={100}
              className="h-full w-full object-contain shadow-[0_0_15px_rgba(61,213,243,0.5)]"
            />
          </div>

          <span>INTO</span>
        </div>

        {/* REWARDS */}
        <div
          ref={rewardsRef}
          className="relative mt-6 md:mt-0 font-pixel leading-none text-[clamp(4rem,18vw,6rem)]"
        >
          {/* Main text */}
          <h1
            className="relative z-10 text-[#3DD5F3] leading-none"
            style={{
              textShadow: `
                0 1px 0 #074254ff,
                0 2px 0 #094253ff,
                0 3px 0 #052731ff,
                0 4px 0 #062d39ff,
                0 5px 0 #08303dff,
                0 6px 0 #08303dff,
                0 7px 0 #062d39ff,
                0 8px 0 #062d39ff,
                0 9px 0 #04222dff,
                0 10px 0 #04222dff,
                0 15px 30px rgba(61,213,243,0.5),
                0 0 20px rgba(61,213,243,0.5)
              `,
              WebkitTextStroke: "1px #2a99afff",
            }}
          >
            REWARDS
          </h1>

          {/* Glitch layer 1 */}
          <span
            ref={glitch1Ref}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 text-[#3DD5F3]"
            style={{
              clipPath: "inset(20% 0 65% 0)",
              WebkitTextStroke: "1px #2a99afff",
            }}
          >
            REWARDS
          </span>

          {/* Glitch layer 2 */}
          <span
            ref={glitch2Ref}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 text-[#3DD5F3]"
            style={{
              clipPath: "inset(55% 0 30% 0)",
              WebkitTextStroke: "1px #2a99afff",
            }}
          >
            REWARDS
          </span>

          {/* Glitch layer 3 */}
          <span
            ref={glitch3Ref}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 text-[#3DD5F3]"
            style={{
              clipPath: "inset(78% 0 8% 0)",
              WebkitTextStroke: "1px #2a99afff",
            }}
          >
            REWARDS
          </span>
        </div>
      </div>

      {/* 3D CAROUSEL - flex-1 so it expands to fill remaining mobile viewport */}
      <div
        ref={carouselRef}
        className="w-full flex-1 mt-16 md:flex-none md:-mt-16"
      >
        <Carousel items={carouselItems} />
      </div>

      {/* CTA */}
      <div ref={buttonRef} className="pb-20 z-20 md:-mt-12">
        <Button
          variant="glow-pill"
          className="h-[54px] w-[220px] sm:h-[46px] sm:w-[200px] md:h-[52px] md:w-[220px] lg:h-[56px] lg:w-[240px]"
        >
          START EARNING
        </Button>
      </div>
    </div>
  );
}