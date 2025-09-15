"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AppButton from "./common/AppButton";

interface IFaqItem {
  id?: string;
  question: string;
  answer: string;
}

interface IProps {
  items?: IFaqItem[];
  className?: string;
}

const defaultItems: IFaqItem[] = [
  {
    id: "zuno-1",
    question: "What is Zuno?",
    answer:
      "Zuno combines AI technology with real psychology-based techniques, offering support that adapts to your mood, routine, and specific challenges like anxiety, sleep, libido, and focus.",
  },
  {
    id: "zuno-2",
    question: "Is Zuno a replacement for therapy?",
    answer:
      "No. Zuno is a powerful daily tool for emotional well-being, but it’s not a medical service or a substitute for professional therapy. It’s here to support you, not replace clinical care.",
  },
  {
    id: "zuno-3",
    question: "Who is Zuno for?",
    answer:
      "Zuno is designed for women aged 18–35 who want to better understand their mental and emotional health using modern, tech-savvy tools — no stigma, no pressure.",
  },
  {
    id: "zuno-4",
    question: "How does the AI actually help?",
    answer:
      "Zuno uses AI to learn your patterns, suggest personalized exercises, monitor your emotional shifts, and guide you through breathing, journaling, focus-building, and self-awareness practices.",
  },
  {
    id: "zuno-5",
    question: "What kind of issues can Zuno help me with?",
    answer:
      "Zuno helps with everyday mental health challenges like anxiety, sleep issues, low libido, poor focus, emotional eating, and burnout — all in one gentle, beautiful space.",
  },
  {
    id: "zuno-6",
    question: "Can I use Zuno every day?",
    answer:
      "Absolutely. Zuno was built to support your daily rhythms—from your morning energy to nighttime rest.",
  },
];

export default function FAQAccordion({
  items = defaultItems,
  className = "",
}: IProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(i: number) {
    setOpenIndex((prev) => (prev === i ? null : i));
  }

  return (
    <section className={`section py-12 ${className}`}>
      <div className="container-m max-w-4xl mx-auto px-4">
        <div>
          <div className="text-center">
            <AppButton className="text-xs" title="Questions?" />
            <h2 className="h-m  text-2xl md:text-3xl text-[#303a46] font-bold mb-15 mt-4">
              We’re here to help
            </h2>
            <hr className=" border-[#E3E3E3]" />
          </div>

          <div className="space-y-4">
            {items.map((it, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={it.id ?? i}
                  className="border-b-1  border-[#E3E3E3] overflow-hidden"
                >
                  <button
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    onClick={() => toggle(i)}
                    onKeyDown={(e) => {
                      if (e.key === "" || e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggle(i);
                      }
                    }}
                    className="faq-link-block w-full flex items-center justify-between p-4 text-left gap-4"
                  >
                    <div className="p-m font-medium  text-[20px]">
                      {it.question}
                    </div>

                    <motion.div
                      initial={false}
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ type: "tween", duration: 0.18 }}
                      className="faq-icon-wrapper w-6 h-6 flex items-center justify-center"
                      aria-hidden
                    >
                      {/* simple plus icon made from two sticks (like the original) */}
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 5v14"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M5 12h14"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ type: "tween", duration: 0.25 }}
                        className="faq-content-2 overflow-hidden px-4"
                      >
                        <div className="p-r-normal py-4 text-[17px] leading-relaxed">
                          {it.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
