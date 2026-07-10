"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import CircularText from "./ui/circular-text";

/* ─── Types ─────────────────────────────────────────────────────────────── */
type BreakpointKey =
  | "mobile"
  | "laptop-sm"
  | "laptop-md"
  | "laptop-lg"
  | "desktop"
  | "desktop-xl";



/* ─── Breakpoint configs
 * radius: SVG user units (out of 100-unit viewBox). Text path circumference = 2π×r.
 * At radius=44, circumference≈276 units → text fills ~88% of the 100-unit container.
 * Container size should match the visible red-box area from the design reference.
 */
const BREAKPOINT_CONFIGS: Record<
  BreakpointKey,
  { radius: number; fontSize: string; size: string }
> = {
  mobile:       { radius: 38, fontSize: "5.0px", size: "w-[140px] h-[140px]" },
  "laptop-sm":  { radius: 41, fontSize: "5.2px", size: "w-[175px] h-[175px]" },
  "laptop-md":  { radius: 42, fontSize: "5.4px", size: "w-[195px] h-[195px]" },
  "laptop-lg":  { radius: 43, fontSize: "5.6px", size: "w-[215px] h-[215px]" },
  desktop:      { radius: 44, fontSize: "5.8px", size: "w-[235px] h-[235px]" },
  "desktop-xl": { radius: 45, fontSize: "6.0px", size: "w-[255px] h-[255px]" },
};

function getBreakpoint(width: number, height?: number): BreakpointKey {
  if (width < 768) return "mobile";
  const h = height ?? window.innerHeight;
  if (width < 1440 || h < 800) return "laptop-sm";
  if (width < 1536 || h < 900) return "laptop-md";
  if (width < 1920) return "laptop-lg";
  if (width < 2560) return "desktop";
  return "desktop-xl";
}



/* ─── Get coordinate of element's center RELATIVE to #circle-root ────────
 * The circle uses position:absolute inside #circle-root (a div that starts
 * at page-y=80px because <main> has pt-20). Using viewport coords caused an
 * 80px downward offset. Using root-relative coords fixes this exactly.
 */
function getPageCenter(id: string): { x: number; y: number } | null {
  const el   = document.getElementById(id);
  const root = document.getElementById("circle-root");
  if (!el || !root) return null;
  const elRect   = el.getBoundingClientRect();
  const rootRect = root.getBoundingClientRect();
  return {
    x: Math.round(elRect.left - rootRect.left + elRect.width  / 2),
    y: Math.round(elRect.top  - rootRect.top  + elRect.height / 2),
  };
}

/* ─── Main component ─────────────────────────────────────────────────────*/
export function MovingCircle() {
  const [breakpoint, setBreakpoint] = useState<BreakpointKey>("desktop");
  const [mounted, setMounted]       = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const isAtAbout = useRef(false);
  const isMoving  = useRef(false);

  /* ── Initial placement at hero anchor ─────────────────────────────────*/
  useEffect(() => {
    setBreakpoint(getBreakpoint(window.innerWidth, window.innerHeight));

    const init = () => {
      const c = getPageCenter("hero-text-anchor");
      if (c) { x.set(c.x); y.set(c.y); setMounted(true); }
    };
    init();
    const t = setTimeout(init, 500);
    return () => clearTimeout(t);
  }, [x, y]);

  /* ── Scroll: hero ↔ about transition ──────────────────────────────────*/
  useEffect(() => {
    const moveTo = (targetId: string, toAbout: boolean) => {
      if (window.innerWidth < 768) return;
      const c = getPageCenter(targetId);
      if (!c) return;
      isAtAbout.current = toAbout;
      isMoving.current  = true;
      animate(x, c.x, { duration: 1.2, ease: [0.16, 1, 0.3, 1] });
      animate(y, c.y, {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
        onComplete: () => { isMoving.current = false; },
      });
    };

    const onScroll = () => {
      if (window.innerWidth < 768 || isMoving.current) return;
      const aboutEl = document.getElementById("about-text-anchor");
      if (!aboutEl) return;
      const rect = aboutEl.getBoundingClientRect();
      const vh   = window.innerHeight;
      if (rect.top < 0.65 * vh && rect.bottom > 0 && !isAtAbout.current) moveTo("about-text-anchor", true);
      if (rect.top > vh && isAtAbout.current) moveTo("hero-text-anchor", false);
    };

    const onResize = () => {
      setBreakpoint(getBreakpoint(window.innerWidth, window.innerHeight));
      const id = isAtAbout.current ? "about-text-anchor" : "hero-text-anchor";
      const c  = getPageCenter(window.innerWidth < 768 ? "hero-text-anchor" : id);
      if (c) { x.set(c.x); y.set(c.y); }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize",  onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize",  onResize);
    };
  }, [x, y]);

  if (!mounted || breakpoint === "mobile") return null;

  const cfg = BREAKPOINT_CONFIGS[breakpoint];

  return (
    <motion.div
      style={{
        position:           "absolute",
        top:                0,
        left:               0,
        x,
        y,
        zIndex:             0,
        pointerEvents:      "none",
        translateX:         "-50%",
        translateY:         "-50%",
        willChange:         "transform",
        backfaceVisibility: "hidden",
      }}
    >
      <CircularText
        text="ENGINEERING*AI*AUTOMATION*DESIGN*"
        spinDuration={20}
        onHover="speedUp"
        className={cfg.size}
      />
    </motion.div>
  );
}
