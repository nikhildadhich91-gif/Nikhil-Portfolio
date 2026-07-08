"use client";
import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function SmoothCursor() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth trail spring configuration
  const springConfig = { damping: 40, stiffness: 450, mass: 0.4 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX - 8);
      mouseY.set(e.clientY - 8);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!mounted) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] h-4 w-4 rounded-full bg-[#FF8A3D] mix-blend-difference hidden md:block"
      style={{
        x: cursorX,
        y: cursorY,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ opacity: { duration: 0.15 } }}
    />
  );
}

export function SiteCursor() {
  return (
    <>
      <span className="hidden md:block sr-only">Custom cursor active</span>
      <span className="block md:hidden sr-only">SmoothCursor disabled on touch devices</span>
      <SmoothCursor />
    </>
  );
}
