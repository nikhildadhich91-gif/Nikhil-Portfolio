"use client";
import { useEffect, useRef } from "react";
import { useMotionValue, useSpring, useInView, animate } from "framer-motion";

export function NumberTicker({
  value,
  direction = "up",
  delay = 0,
  className,
  decimals = 0,
}: {
  value: number;
  direction?: "up" | "down";
  delay?: number;
  className?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === "down" ? value : 0);
  const springValue = useSpring(motionValue, {
    damping: 45,
    stiffness: 180,
  });
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        animate(motionValue, direction === "down" ? 0 : value, {
          duration: 2,
          ease: "easeOut",
        });
      }, delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [motionValue, isInView, value, direction, delay]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = latest.toFixed(decimals);
      }
    });
  }, [springValue, decimals]);

  return (
    <span
      ref={ref}
      className={className}
    >
      {direction === "down" ? value.toFixed(decimals) : "0"}
    </span>
  );
}
