"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { GridBackground } from "@/components/ui/GridBackground";
import { DotGrid } from "@/components/ui/DotGrid";
import { MapPin, Mail, Headphones, ChevronDown } from "lucide-react";

export default function ContactPage() {
  return (
    <main
      className="relative w-full min-h-screen font-sans overflow-x-hidden flex flex-col"
      style={{ background: "#000000" }}
    >
      <GridBackground />
      <DotGrid />
      <Navbar />

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

      <div className="relative z-10 flex flex-col items-center flex-grow w-full px-4 pt-40 pb-24 max-w-[1000px] mx-auto">
        <h1 className="font-pixel text-4xl md:text-6xl text-white text-center leading-[1.1] uppercase tracking-wide text-balance">
          Let's build<br />something together
        </h1>
        <p className="text-[#888888] mt-6 max-w-2xl text-center text-sm md:text-[15px] text-balance leading-relaxed">
          Partnership, sponsorship, or support — whatever the mission, our team responds fast. Reach out and let's make things happen.
        </p>

        <button className="mt-8 rounded-full border border-[#333] bg-[#1a1a1a]/80 backdrop-blur-md px-6 py-2.5 flex items-center gap-3 text-white text-sm hover:bg-white/10 transition duration-300 group">
          <span className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_12px_3px_rgba(255,255,255,0.7)] group-hover:shadow-[0_0_16px_5px_rgba(255,255,255,0.9)] transition-shadow duration-300" />
          GET IN TOUCH
        </button>

        {/* Two Column Layout */}
        <div className="w-full mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Form Side */}
          <div className="bg-[#111111]/80 backdrop-blur-md rounded-2xl p-6 md:p-10 border border-[#222]">
            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-2">
                <label className="text-sm text-[#888] uppercase tracking-wider font-medium">Name</label>
                <input
                  type="text"
                  placeholder="Your Full Name"
                  className="bg-[#2A2A2A]/40 border border-transparent focus:border-[#444] rounded-lg px-4 py-3 text-white text-sm outline-none transition-colors w-full placeholder-[#555]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm text-[#888] uppercase tracking-wider font-medium">Email</label>
                <input
                  type="email"
                  placeholder="You@email.com"
                  className="bg-[#2A2A2A]/40 border border-transparent focus:border-[#444] rounded-lg px-4 py-3 text-white text-sm outline-none transition-colors w-full placeholder-[#555]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm text-[#888] uppercase tracking-wider font-medium">Subject</label>
                <div className="relative">
                  <select defaultValue="" className="w-full bg-[#2A2A2A]/40 border border-transparent focus:border-[#444] rounded-lg px-4 py-3 text-white text-sm outline-none transition-colors appearance-none cursor-pointer">
                    <option value="" disabled className="text-[#555]">Select a subject</option>
                    <option value="support" className="bg-[#222]">Support</option>
                    <option value="partnership" className="bg-[#222]">Partnership</option>
                    <option value="sponsorship" className="bg-[#222]">Sponsorship</option>
                    <option value="other" className="bg-[#222]">Other</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white">
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm text-[#888] uppercase tracking-wider font-medium">Message</label>
                <textarea
                  placeholder="Tell us what's on your mind..."
                  className="w-full bg-[#2A2A2A]/40 border border-transparent focus:border-[#444] rounded-lg px-4 py-3 text-white text-sm outline-none transition-colors min-h-[150px] resize-y placeholder-[#555]"
                ></textarea>
              </div>
            </form>
          </div>

          {/* Contact Info Side */}
          <div className="bg-[#111111]/80 backdrop-blur-md rounded-2xl p-6 md:p-10 border border-[#222] flex flex-col items-center justify-center text-center">
            <h2 className="font-pixel-solid text-[32px] md:text-[40px] text-white mb-12 tracking-wide">SAY HELLO</h2>

            <div className="flex flex-col gap-8 w-full max-w-sm text-left">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="text-black" size={20} strokeWidth={2.5} />
                </div>
                <div className="flex flex-col pt-0.5">
                  <p className="text-xs text-[#888] uppercase tracking-wider font-semibold">Headquarters</p>
                  <p className="text-sm text-white font-medium mt-1">Azamgarh, Uttar Pradesh, India</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0">
                  <Mail className="text-black" size={20} strokeWidth={2.5} />
                </div>
                <div className="flex flex-col pt-0.5">
                  <p className="text-xs text-[#888] uppercase tracking-wider font-semibold">Email</p>
                  <a href="mailto:admin@taskifygames.com" className="text-sm text-white font-medium mt-1 hover:text-gray-300 transition-colors">admin@taskifygames.com</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0">
                  <Headphones className="text-black" size={20} strokeWidth={2.5} />
                </div>
                <div className="flex flex-col pt-0.5">
                  <p className="text-xs text-[#888] uppercase tracking-wider font-semibold">Support Hours</p>
                  <p className="text-sm text-white font-medium mt-1">24/7 - Always on</p>
                </div>
              </div>
            </div>

            <div className="mt-16 text-center">
              <div className="flex items-center justify-center font-sans font-bold text-white text-xl">
                #startupindia
              </div>
              <p className="text-xs text-[#888] mt-1">Certified by Startup India</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full mt-auto">
        <Footer />
      </div>
    </main>
  );
}
