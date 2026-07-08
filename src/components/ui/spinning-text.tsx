"use client";
import React from "react";

export function SpinningText({ text = "loading • the • work • loading •" }: { text?: string }) {
  return (
    <div className="relative flex items-center justify-center w-36 h-36 animate-[spin_12s_linear_infinite]">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <defs>
          {/* Circular path centered at 50,50 with radius 36 */}
          <path
            id="circlePath"
            d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
          />
        </defs>
        <text className="fill-text-primary font-mono text-[7px] uppercase tracking-[0.16em] font-bold">
          <textPath href="#circlePath" startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>
    </div>
  );
}
