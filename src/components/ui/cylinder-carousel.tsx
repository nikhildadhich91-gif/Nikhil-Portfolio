"use client";
import React, { useMemo } from "react";
import { cn } from "@/lib/utils";

export interface CarouselImage {
  src: string;
  alt?: string;
}

export function FeaturedWorkCylinder({
  images,
  cardWidth = 300,
  gap = 12,
}: {
  images: CarouselImage[];
  cardWidth?: number;
  gap?: number;
}) {
  const N = images.length;
  // Calculate radius based on: Circumference = N * (width + gap) -> radius = Circumference / (2 * PI)
  const radius = useMemo(() => (N * (cardWidth + gap)) / (2 * Math.PI), [N, cardWidth, gap]);
  const anglePerCard = 360 / N;

  return (
    <div
      className="w-full min-h-[420px] grid place-items-center overflow-hidden py-8"
      style={{
        perspective: "1400px",
        maskImage: "linear-gradient(90deg, transparent, #000 15% 85%, transparent)",
        WebkitMaskImage: "linear-gradient(90deg, transparent, #000 15% 85%, transparent)",
      }}
    >
      {/* Flat parent container so standard zIndex sorting is respected (avoids preserve-3d opacity bugs) */}
      <div
        className="relative grid place-items-center animate-[spinY_36s_linear_infinite] motion-reduce:animate-[spinY_120s_linear_infinite]"
        style={{ width: cardWidth, height: cardWidth * 1.4 }}
      >
        <style>{`
          @keyframes spinY {
            from { transform: rotateY(0deg); }
            to { transform: rotateY(360deg); }
          }
        `}</style>
        {images.map((img, i) => {
          const itemAngle = i * anglePerCard;
          return (
            <div
              key={i}
              className="absolute inset-0"
              style={{
                transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                // cosine depth-sorting so cards closer to the screen have higher z-indexes
                zIndex: Math.round((Math.cos((itemAngle * Math.PI) / 180) + 1) * 1000),
              }}
            >
              <img
                src={img.src}
                alt={img.alt || `Featured work ${i}`}
                draggable={false}
                className={cn(
                  "h-full w-full object-cover rounded-xl border border-white/10 select-none pointer-events-none shadow-2xl",
                  "opacity-90 transition-opacity duration-300 hover:opacity-100"
                )}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
