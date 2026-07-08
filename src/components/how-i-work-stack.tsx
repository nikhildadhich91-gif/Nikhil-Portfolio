"use client";
import React from "react";

const PRINCIPLES = [
  { title: "Ship, then polish", body: "RetailOS went from zero to a live, deployed multi-tenant platform before it had a single paying user — momentum first, perfection later." },
  { title: "Be honest about gaps", body: "AI Systems Optimization has no client case studies yet. Instead of hiding that, this site shows the internal engineering — billing fixes, prompt discipline, CI/CD tuning." },
  { title: "Document like a BA", body: "Every build gets requirements elicitation, MIS-style tracking, and root-cause debugging — habits carried over from BA work at Team Classic Window Planet." },
  { title: "Use AI tools deliberately", body: "Claude Code, Google AI Studio, and Firebase Studio aren't buzzwords here — they're the actual daily toolchain, documented and cost-optimized." },
];

export function HowIWorkStack() {
  return (
    <div className="relative">
      {PRINCIPLES.map((p, index) => (
        <div
          key={p.title}
          className="sticky w-full max-w-2xl mx-auto px-4 sm:px-0"
          style={{
            top: `calc(50vh - 140px + ${index * 24}px)`,
            marginBottom: "40vh" // Symmetrical margin for unstacking animation
          }}
        >
          <div className="bg-bg-raised border border-border-hairline rounded-2xl p-8 shadow-2xl">
            <span className="font-mono text-xs text-text-primary tracking-wider">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="font-display text-2xl text-text-primary mt-2 mb-3 font-bold">
              {p.title}
            </h3>
            <p className="text-text-muted text-sm sm:text-base leading-relaxed">
              {p.body}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
