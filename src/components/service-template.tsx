"use client";
import React from "react";
import Link from "next/link";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { ArrowLeft } from "lucide-react";

export interface ProofPoint {
  title: string;
  details: string;
  tech?: string[];
  metric?: string;
}

export interface ServiceConfig {
  slug: string;
  title: string;
  heroLine: string;
  description: string;
  narrative: React.ReactNode;
  proofPoints: ProofPoint[];
  techTags: string[];
  accent: "signal" | "ai";
  customSection?: React.ReactNode;
}

export function ServiceTemplate({ config }: { config: ServiceConfig }) {
  const accentColor = config.accent === "ai" ? "#6EE7D8" : "#FF8A3D";

  return (
    <div className="w-full min-h-screen relative pb-32">
      {/* Background Accent glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[400px] blur-3xl opacity-10 -z-10 rounded-full"
        style={{
          background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-16 pt-12 md:pt-20">
        {/* Back Link */}
        <Link
          href="/services"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#8B93A1] hover:text-[#EDEFF2] transition-colors mb-12 select-none"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to services
        </Link>

        {/* Hero Header */}
        <div className="max-w-4xl mb-20 text-left">
          <span
            className="font-mono text-xs uppercase tracking-[0.25em] mb-4 block"
            style={{ color: accentColor }}
          >
            {config.title}
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-[#EDEFF2] tracking-tight">
            {config.heroLine}
          </h1>
          <p className="text-[#8B93A1] text-base md:text-lg max-w-2xl leading-relaxed mt-6">
            {config.description}
          </p>
        </div>

        {/* Two-Column Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-start">
          {/* Main Narrative - Left (span 2) */}
          <div className="lg:col-span-2 space-y-10 text-left text-sm sm:text-base text-[#8B93A1] leading-relaxed">
            <div className="prose prose-invert prose-orange max-w-none">
              {config.narrative}
            </div>
            
            {/* Custom section embedded (e.g. video grid, cylinder carousel) */}
            {config.customSection && (
              <div className="pt-6">
                {config.customSection}
              </div>
            )}
          </div>

          {/* Sidebar Specs - Right */}
          <div className="lg:col-span-1 space-y-8 sticky top-28">
            {/* Tech Stack Box */}
            <div className="bg-[#12171D] border border-white/[0.08] rounded-2xl p-6 shadow-xl">
              <h3 className="font-mono text-xs text-[#EDEFF2] uppercase tracking-wider mb-4 border-b border-white/[0.05] pb-2 font-bold">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {config.techTags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-md bg-[#0A0E12] border border-white/[0.05] text-[#EDEFF2]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Proof of Work Milestones */}
            <div className="bg-[#12171D] border border-white/[0.08] rounded-2xl p-6 shadow-xl space-y-6">
              <h3 className="font-mono text-xs text-[#EDEFF2] uppercase tracking-wider border-b border-white/[0.05] pb-2 font-bold">
                Proof of Work
              </h3>
              <div className="space-y-6">
                {config.proofPoints.map((point) => (
                  <div key={point.title} className="flex flex-col gap-1 text-left">
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-semibold text-[#EDEFF2] font-display">
                        {point.title}
                      </h4>
                      {point.metric && (
                        <span className="font-mono text-[10px] text-[#FF8A3D] bg-[#FF8A3D]/5 border border-[#FF8A3D]/10 px-2 py-0.5 rounded">
                          {point.metric}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#8B93A1] leading-relaxed mt-1">
                      {point.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct contact hook */}
            <div className="text-center">
              <a href="/contact" className="block w-full">
                <MagneticButton className="w-full bg-[#FF8A3D] text-[#0A0E12] font-mono text-xs uppercase tracking-wider py-3.5 rounded-xl font-bold shadow-lg">
                  Let&apos;s Discuss This Service
                </MagneticButton>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
