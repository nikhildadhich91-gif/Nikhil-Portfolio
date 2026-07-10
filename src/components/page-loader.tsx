"use client";
/**
 * PageLoader — Full-screen staggered vertical curtain animation.
 *
 * It renders 5 full-screen layers stacked directly on top of each other.
 * On exit, each layer slides up (`y: "-100%"`) with a stagger, creating
 * a smooth overlapping curtain reveal effect vertically.
 */

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface PageLoaderProps {
  onComplete: () => void;
}

const STRIP_COLORS = [
  "#ede9e2", // Layer 1 (bottom-most in stack, exits first)
  "#e0dbd3", // Layer 2
  "#d4cfc8", // Layer 3
  "#1a1a1a", // Layer 4 (dark base/contrast)
  "#e8601c", // Layer 5 (top-most accent, exits last)
];

export function PageLoader({ onComplete }: PageLoaderProps) {
  const [shouldExit, setShouldExit] = useState(false);

  useEffect(() => {
    // Hold the loading screen briefly for the user to read the text
    const exitTimer = setTimeout(() => {
      setShouldExit(true);
    }, 850);

    // Call onComplete when the bottom layer (index 0, longest delay) finishes
    const completeTimer = setTimeout(() => {
      window.dispatchEvent(new CustomEvent("loaderComplete"));
      onComplete();
    }, 850 + 1350);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[200] w-full h-full overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Centered branding label (fades out as exit begins) */}
      {!shouldExit && (
        <div className="absolute inset-0 flex items-center justify-center z-[250] pointer-events-none">
          <span className="font-display text-lg uppercase tracking-[0.4em] text-white select-none animate-pulse">
            nikhil dadhich
          </span>
        </div>
      )}

      {/* 5 Full-screen curtain layers stacked on top of each other */}
      {STRIP_COLORS.map((color, i) => (
        <motion.div
          key={i}
          initial={{ y: 0 }}
          animate={shouldExit ? { y: "-100%" } : { y: 0 }}
          transition={{
            duration: 1.1, // slightly slower for a premium fluid slide
            // Tighter stagger (60ms) makes layers feel connected and smooth
            delay: (STRIP_COLORS.length - 1 - i) * 0.06,
            ease: [0.85, 0, 0.15, 1], // ultra-smooth slow glide cubic bezier
          }}
          className="absolute inset-0 w-full h-full will-change-transform"
          style={{
            background: color,
            zIndex: 200 + i, // top layers have higher z-index to overlay bottom layers
          }}
        />
      ))}
    </div>
  );
}
