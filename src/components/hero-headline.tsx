"use client";
import React, { useState, useEffect, useRef } from "react";
import BlurText from "@/components/ui/blur-text";
import VariableProximity from "@/components/ui/variable-proximity";

export function HeroHeadline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState<'loading' | 'interactive'>('loading');

  const [line1Done, setLine1Done] = useState(false);
  const [line2Done, setLine2Done] = useState(false);

  useEffect(() => {
    if (line1Done && line2Done) {
      const timer = setTimeout(() => {
        setStage('interactive');
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [line1Done, line2Done]);

  return (
    <div
      ref={containerRef}
      className="relative select-none w-full flex flex-col items-center lg:items-start"
    >
      <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight text-text-primary font-extrabold w-full">
        {stage === 'loading' ? (
          <>
            <span className="block min-h-[1.1em] overflow-hidden">
              <BlurText
                text="Tested locally."
                delay={20}
                animateBy="letters"
                direction="bottom"
                stepDuration={0.35}
                onAnimationComplete={() => setLine1Done(true)}
              />
            </span>
            <span className="block min-h-[1.1em] overflow-hidden">
              <BlurText
                text="Works globally."
                delay={20}
                animateBy="letters"
                direction="bottom"
                stepDuration={0.35}
                onAnimationComplete={() => setLine2Done(true)}
              />
            </span>
          </>
        ) : (
          <>
            <span className="block min-h-[1.15em] whitespace-nowrap">
              <VariableProximity
                label="Tested locally."
                fromFontVariationSettings="'wght' 650"
                toFontVariationSettings="'wght' 1000"
                containerRef={containerRef}
                radius={200}
                falloff="linear"
              />
            </span>
            <span className="block min-h-[1.15em] whitespace-nowrap">
              <VariableProximity
                label="Works globally."
                fromFontVariationSettings="'wght' 650"
                toFontVariationSettings="'wght' 1000"
                containerRef={containerRef}
                radius={200}
                falloff="linear"
              />
            </span>
          </>
        )}
      </h1>
    </div>
  );
}

