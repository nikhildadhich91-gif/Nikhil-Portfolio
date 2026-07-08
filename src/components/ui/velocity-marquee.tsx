"use client";
import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useMotionValue,
  useAnimationFrame,
} from "framer-motion";

export function ScrollVelocityRow({
  children,
  baseVelocity = 5,
  direction = 1,
}: {
  children: string;
  baseVelocity?: number;
  direction?: 1 | -1;
}) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const directionFactor = useRef<number>(1);
  
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * velocityFactor.get() * (delta / 1000) * direction;

    baseX.set(baseX.get() + moveBy);
  });

  // Cycle x position between -25% and 0% to create an infinite looping effect
  const x = useTransform(baseX, (v) => {
    const wrappedValue = ((v % 25) - 25) % 25;
    return `${wrappedValue}%`;
  });

  return (
    <div className="flex flex-nowrap whitespace-nowrap overflow-hidden w-full">
      <motion.div
        className="flex flex-nowrap whitespace-nowrap gap-4"
        style={{ x }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className="flex-shrink-0 select-none">
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function ScrollVelocityContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}
