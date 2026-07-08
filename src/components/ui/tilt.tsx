"use client";
import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltProps {
  children: React.ReactNode;
  rotationFactor?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function Tilt({ children, rotationFactor = 10, className, style }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  // Smooth mouse movement transforms
  const rotateX = useSpring(useTransform(y, [0, 1], [rotationFactor, -rotationFactor]), { damping: 25, stiffness: 250 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-rotationFactor, rotationFactor]), { damping: 25, stiffness: 250 });

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    x.set(mouseX / width);
    y.set(mouseY / height);
  }

  function handleMouseLeave() {
    x.set(0.5);
    y.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        ...style,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
