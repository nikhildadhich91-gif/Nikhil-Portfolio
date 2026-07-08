"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { Safari } from "@/components/ui/safari";
import { PROJECTS_DATA } from "@/lib/projects-data";
import { cn } from "@/lib/utils";

// Map slugs to preview screenshots or fallbacks
const PROJECT_PREVIEWS: Record<string, string> = {
  "bitwise-consulting": "/bitwise-preview.webp",
  "retailos": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
  "agency-os": "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80",
  "pixeelnest": "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&auto=format&fit=crop&q=80",
  "shadway": "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=800&auto=format&fit=crop&q=80",
};

// Map slugs to live links (if they are live)
const LIVE_LINKS: Record<string, string> = {
  "bitwise-consulting": "https://bitwise-ag.vercel.app/",
  "retailos": "#",
  "pixeelnest": "#",
  "shadway": "#",
};

const STATUS_COLORS: Record<string, string> = {
  LIVE: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  "IN PROGRESS": "bg-amber-500/10 text-amber-400 border border-amber-500/20",
  "CASE STUDY": "bg-sky-500/10 text-sky-400 border border-sky-500/20",
};

export function ProjectSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const activeProject = PROJECTS_DATA[activeIndex];
  const accentColor = activeProject.accent === "ai" ? "var(--accent-ai)" : "var(--accent-signal)";

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % PROJECTS_DATA.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length);
  };

  const handleDotClick = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.3 }
      }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.3 }
      }
    })
  };

  return (
    <div className="w-full flex flex-col items-center gap-8 py-4 select-none">
      {/* Slider Box */}
      <div className="relative w-full max-w-[1100px] border border-border-hairline rounded-3xl p-6 sm:p-8 bg-bg-raised/30 backdrop-blur-md shadow-2xl overflow-hidden min-h-[500px] flex items-center justify-center">
        
        {/* Glow Backplate mapped to current project accent */}
        <div
          className="absolute -inset-48 rounded-full blur-3xl opacity-[0.03] transition-all duration-700 pointer-events-none z-0"
          style={{
            background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`
          }}
        />

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeProject.slug}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10"
          >
            {/* Left: Safari Mockup Preview (span 7) */}
            <div className="lg:col-span-7 w-full flex justify-center">
              <Safari
                url={activeProject.slug === "bitwise-consulting" ? "bitwise-ag.vercel.app" : `${activeProject.slug}.nikhil.dev`}
                className="w-full border border-border-hairline/80 shadow-3xl"
              >
                <div className="w-full h-full relative aspect-[16/10] overflow-hidden bg-white dark:bg-bg-base flex items-start justify-center">
                  <img
                    src={PROJECT_PREVIEWS[activeProject.slug] || activeProject.image}
                    alt={activeProject.title}
                    className="w-full h-auto object-cover object-top select-none pointer-events-none"
                    loading="lazy"
                  />
                </div>
              </Safari>
            </div>

            {/* Right: Project Details (span 5) */}
            <div className="lg:col-span-5 flex flex-col text-left space-y-5">
              <div className="flex items-center gap-3">
                <span className={cn("px-3 py-1 font-mono text-[9px] font-bold tracking-wider rounded-full", STATUS_COLORS[activeProject.status])}>
                  {activeProject.status}
                </span>
                <span className="font-mono text-[10px] text-text-muted">
                  PROJECT {activeIndex + 1} OF {PROJECTS_DATA.length}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-text-primary tracking-tight leading-none">
                {activeProject.title}
              </h3>

              <p className="text-text-muted text-xs sm:text-sm leading-relaxed">
                {activeProject.desc}
              </p>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {activeProject.tech.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[9px] uppercase tracking-wider px-2.5 py-1 rounded bg-bg-base border border-border-hairline text-text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="border-t border-border-hairline pt-5 mt-2 flex items-center justify-between">
                <div className="flex flex-col gap-0.5">
                  <span className="font-mono text-[8px] uppercase tracking-widest text-text-muted">HIGHLIGHTS</span>
                  <span className="text-text-primary font-bold font-display text-sm">
                    {activeProject.results.split(".")[0]}
                  </span>
                </div>
                
                {LIVE_LINKS[activeProject.slug] && LIVE_LINKS[activeProject.slug] !== "#" && (
                  <a
                    href={LIVE_LINKS[activeProject.slug]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 bg-[#FF8A3D] text-[#0A0E12] px-4.5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-full hover:opacity-90 transition-opacity shadow-md"
                  >
                    Live Demo
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slider Controls */}
      <div className="flex items-center gap-6">
        <button
          onClick={handlePrev}
          className="size-11 rounded-full border border-border-hairline bg-bg-raised/40 hover:bg-bg-raised hover:text-[#FF8A3D] transition-colors flex items-center justify-center text-text-primary shadow-lg cursor-pointer"
          aria-label="Previous project"
        >
          <ArrowLeft className="w-4.5 h-4.5" />
        </button>

        {/* Indicators */}
        <div className="flex gap-2">
          {PROJECTS_DATA.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleDotClick(idx)}
              className={cn(
                "h-2 rounded-full transition-all duration-300 cursor-pointer",
                idx === activeIndex
                  ? "w-6 bg-[#FF8A3D]"
                  : "w-2 bg-text-muted/30 hover:bg-text-muted/60"
              )}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="size-11 rounded-full border border-border-hairline bg-bg-raised/40 hover:bg-bg-raised hover:text-[#FF8A3D] transition-colors flex items-center justify-center text-text-primary shadow-lg cursor-pointer"
          aria-label="Next project"
        >
          <ArrowRight className="w-4.5 h-4.5" />
        </button>
      </div>
    </div>
  );
}
