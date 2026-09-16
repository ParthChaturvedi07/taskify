"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

type Testimonial = {
  quote: string;
  name: string;
  rating: string;
  avatar: string;
  language?: string;
};

const testimonials: Testimonial[] = [
  {
    quote: `"Tasks are quick, the interface is smooth, and payouts actually arrive on time."`,
    name: "Babu Pokkina",
    rating: "⭐⭐⭐⭐⭐ (5/5)",
    avatar: "https://i.pravatar.cc/150?img=11",
  },
  {
    quote: `"Aplikasi ini mudah digunakan dan memiliki banyak tugas yang bisa dilakukan untuk mendapatkan poin."`,
    name: "Rosna Harianto",
    language: "(Indonesian)",
    rating: "⭐⭐⭐⭐⭐ (5/5)",
    avatar: "https://i.pravatar.cc/150?img=9",
  },
  {
    quote: `"Es una buena apps, juegos divertidos, los recomiendo."`,
    name: "Jailer Quiroz",
    language: "(Spanish)",
    rating: "⭐⭐⭐⭐⭐ (5/5)",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    quote: `"Estou gostando muito do aplicativo, tem várias opções de ganhar pontos."`,
    name: "Adelson Thiago",
    language: "(Portuguese)",
    rating: "⭐⭐⭐⭐⭐ (5/5)",
    avatar: "https://i.pravatar.cc/150?img=15",
  },
  {
    quote: `"It is good for earning coins and that is redeem like Play Store, UPI."`,
    name: "Rakhirani Behera",
    rating: "⭐⭐⭐⭐⭐ (5/5)",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    quote: `"The app is simple and user-friendly, so anyone can use it without confusion."`,
    name: "Venkatesh Bandi",
    rating: "⭐⭐⭐⭐⭐ (5/5)",
    avatar: "https://i.pravatar.cc/150?img=8",
  }
];

export function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const scrollNext = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      // If we are at or very near the end, loop back to the start
      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        containerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        const firstChild = containerRef.current.children[0] as HTMLElement;
        const gap = window.innerWidth * 0.05; // 5vw gap
        containerRef.current.scrollBy({ left: firstChild.clientWidth + gap, behavior: 'smooth' });
      }
    }
  };

  const scrollPrev = () => {
    if (containerRef.current) {
      const firstChild = containerRef.current.children[0] as HTMLElement;
      const gap = window.innerWidth * 0.05;
      containerRef.current.scrollBy({ left: -(firstChild.clientWidth + gap), behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      scrollNext();
    }, 1000); // Auto-scroll every 1 sec as requested
    
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen py-20 bg-transparent flex flex-col justify-center overflow-hidden">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between px-10 md:px-20">
        <div className="flex flex-col items-start">
        <span className="font-pixel text-[12px] uppercase tracking-widest text-white/30 mb-2">/ Community Voices</span>
        <div className="flex items-center gap-4 text-white/50">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14"></path>
            <path d="M12 5l7 7-7 7"></path>
          </svg>
          <span className="font-chakra text-sm font-medium tracking-wider">Swipe or scroll to read more</span>
        </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-4 mt-6 md:mt-0">
          <button 
            onClick={() => { scrollPrev(); setIsPaused(true); }}
            className="w-12 h-12 rounded-full border border-white/20 bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button 
            onClick={() => { scrollNext(); setIsPaused(true); }}
            className="w-12 h-12 rounded-full border border-white/20 bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
      </div>

      <div 
        ref={containerRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar items-center gap-[5vw] px-[10vw] mt-10 pb-12 w-full"
      >
        {testimonials.map((t, i) => (
          <div 
            key={i}
            className="w-[85vw] md:w-[60vw] lg:w-[45vw] snap-center shrink-0 flex flex-col p-8 md:p-12 rounded-[40px] bg-white/5 border border-white/10 backdrop-blur-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_2px_0_rgba(255,255,255,0.05)] relative overflow-hidden"
          >
            {/* Subtle glow inside card */}
            <div className="absolute -top-20 -right-20 w-[200px] h-[200px] bg-white/10 blur-[80px] rounded-full pointer-events-none" />
            
            <div className="text-white/20 mb-8">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.017 21L16.411 14.188C15.015 14.188 13.918 13.09 13.918 11.694C13.918 10.297 15.015 9.199 16.411 9.199C17.808 9.199 18.905 10.297 18.905 11.694C18.905 12.308 18.68 12.871 18.318 13.314L15.924 21H14.017ZM5.017 21L7.411 14.188C6.015 14.188 4.918 13.09 4.918 11.694C4.918 10.297 6.015 9.199 7.411 9.199C8.808 9.199 9.905 10.297 9.905 11.694C9.905 12.308 9.68 12.871 9.318 13.314L6.924 21H5.017Z"/>
              </svg>
            </div>
            
            <h3 className="font-chakra text-[clamp(24px,3vw,40px)] font-bold text-white leading-[1.3] mb-12">
              {t.quote}
            </h3>
            
            <div className="mt-auto flex items-center gap-5">
              <Image src={t.avatar} alt={t.name} width={64} height={64} className="w-14 h-14 rounded-full border-2 border-[#0c0c0c] object-cover" />
              <div className="flex flex-col items-start">
                <span className="font-chakra text-[18px] md:text-[20px] font-bold text-white leading-none mb-1.5 flex items-center gap-2">
                  {t.name}
                  {t.language && <span className="text-[12px] font-normal text-white/50">{t.language}</span>}
                </span>
                <span className="font-chakra text-[14px] md:text-[15px] text-[#FFD700] font-medium">{t.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
