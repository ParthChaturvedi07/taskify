"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    id: 1,
    question: "How do I start earning with TaskifyGames apps?",
    answer: "Install any TaskifyGames reward app, create your account, open the earning section, and complete available games, tasks, surveys, or offers. Eligible rewards are added to your in-app wallet after partner verification.",
  },
  {
    id: 2,
    question: "How can I maximize my earning potential?",
    answer: "Use a mix of Hot Offers, Playtime Games, Super Missions, surveys, referral bonuses, and daily reward opportunities. Multi-step offers usually pay more when every milestone is completed properly.",
  },
  {
    id: 3,
    question: "Are TaskifyGames apps available on all devices?",
    answer: "Our current reward apps are built for Android devices and can be downloaded from Google Play. iOS availability is not supported right now.",
  },
  {
    id: 4,
    question: "What withdrawal options are available?",
    answer: "Available withdrawal methods may include UPI, PayPal, Amazon Pay, Visa options, and gift cards depending on the app, country, wallet configuration, and reward availability.",
  },
  {
    id: 5,
    question: "How does the reward system work?",
    answer: "You earn coins by completing eligible actions such as playing games, trying apps, finishing surveys, watching rewarded content, or referring friends. Once you reach the payout requirement, you can request a withdrawal from the app wallet.",
  },
  {
    id: 6,
    question: "Can I earn by watching videos or completing tasks?",
    answer: "Yes. Some apps include rewarded videos, app trials, task partners, surveys, playtime rewards, and limited-time promotional offers.",
  },
  {
    id: 7,
    question: "What should I do if I face any issue?",
    answer: "Use the Help & Support section inside the app or contact support with your registered email, user ID, app name, and issue details so the team can check it faster.",
  }
];

export function FAQ() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="relative w-full px-4 md:px-6 lg:px-12 py-[80px] flex flex-col items-center overflow-hidden bg-transparent">
      


      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-[1200px] flex flex-col items-center text-center md:text-left md:flex-row md:items-end justify-between gap-[20px] mb-[80px]"
      >
        <h2 className="font-pixel text-[clamp(40px,7vw,80px)] font-bold tracking-[-0.02em] uppercase text-white m-0 leading-[0.9] [text-shadow:0_0_60px_rgba(255,255,255,0.15)]">
          FAQ<span className="text-white/20">.</span>
        </h2>
        <p className="font-chakra text-[clamp(15px,1.5vw,18px)] font-normal text-[#888888] leading-[1.6] max-w-[400px] pb-2">
          Everything you need to know about earning with TaskifyGames.
        </p>
      </motion.div>

      {/* Editorial FAQ List */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } }
        }}
        className="relative z-10 w-full max-w-[1200px] flex flex-col border-t border-white/10"
      >
        {faqs.map((faq, index) => {
          const isOpen = openId === faq.id;
          const numberString = (index + 1).toString().padStart(2, '0');
          
          return (
            <motion.div 
              key={faq.id}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }}
              className="flex flex-col border-b border-white/10 overflow-hidden group"
            >
              <button 
                onClick={() => toggleFaq(faq.id)}
                className="flex items-start md:items-center justify-between w-full py-[30px] md:py-[40px] text-left outline-none cursor-pointer hover:bg-white/[0.02] transition-colors duration-500 px-4 md:px-8"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12 w-full pr-[20px]">
                  <span className="font-pixel text-[20px] md:text-[24px] text-white/30 group-hover:text-white/60 transition-colors duration-500">
                    {numberString}
                  </span>
                  <span className={`font-chakra text-[20px] md:text-[32px] font-bold tracking-[-0.01em] transition-colors duration-500 ${isOpen ? 'text-white' : 'text-white/70 group-hover:text-white'}`}>
                    {faq.question}
                  </span>
                </div>
                
                {/* Animated Plus/Minus Icon */}
                <div className="relative flex-shrink-0 w-[40px] h-[40px] flex items-center justify-center rounded-full border border-white/10 group-hover:border-white/30 transition-colors duration-500">
                  <motion.div 
                    initial={false}
                    animate={{ rotate: isOpen ? 180 : 0, opacity: isOpen ? 0 : 1 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute w-[16px] h-[2px] bg-white rounded-full"
                  />
                  <motion.div 
                    initial={false}
                    animate={{ rotate: isOpen ? 180 : 90, opacity: isOpen ? 0 : 1 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute w-[16px] h-[2px] bg-white rounded-full"
                  />
                  <motion.div 
                    initial={false}
                    animate={{ rotate: isOpen ? 0 : -90, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute w-[16px] h-[2px] bg-white rounded-full"
                  />
                </div>
              </button>
              
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-[40px] px-4 md:px-8 md:pl-[100px] w-full max-w-[900px]">
                      <p className="font-chakra text-[16px] md:text-[20px] text-gray-400 leading-[1.6]">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
