"use client";
import { motion } from "framer-motion";

const LINES = ["I build software.", "Then I ship it."];

export function HeroHeadline() {
  return (
    <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight text-[#EDEFF2] font-extrabold select-none">
      {LINES.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-1">
          <motion.span
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.8, delay: 0.9 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block"
          >
            {line}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}
