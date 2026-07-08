import React from "react";
import { ServiceConfig } from "@/components/service-template";
import { VideoReelCard } from "@/components/video-reel-card";
import { FeaturedWorkCylinder } from "@/components/ui/cylinder-carousel";

export const SERVICES_DATA: Record<string, ServiceConfig> = {
  "software": {
    slug: "software",
    title: "Software Architecture & Engineering",
    heroLine: "I don't design software. I ship it.",
    description: "Full-stack SaaS product development, focusing on modularity, database integrity, and high-performance server runtimes.",
    accent: "signal",
    techTags: ["Next.js 14", "TypeScript", "Firebase", "GCP Cloud Run", "Python", "SQL", "Tailwind CSS"],
    narrative: (
      <div className="space-y-6">
        <p className="text-[#EDEFF2] text-lg font-medium">
          I build robust SaaS platforms from the database layer to the frontend. My focus is on solo-building end-to-end applications that work out of the box.
        </p>
        <p>
          I am a firm believer that modern software builders should understand the full stack. I don&apos;t stop at mockups; I deploy production containers on Google Cloud, structure document-oriented collections, optimize database triggers, and craft snappy visual interactions using Next.js and Framer Motion.
        </p>
        <div className="border-l-2 border-text-primary pl-4 my-6 py-2 bg-[#12171D]/30 rounded-r-lg pr-4">
          <h4 className="text-white font-bold mb-1">Architecture Philosophy</h4>
          <p className="text-xs">
            Build lightweight, containerized microservices. Keep state handling clean, utilize Serverless runtimes like GCP Cloud Run to eliminate overhead costs, and prioritize immediate deployment.
          </p>
        </div>
      </div>
    ),
    proofPoints: [
      {
        title: "RetailOS",
        details: "A multi-tenant retail inventory and sales SaaS system. Solo built, containerized using Docker, and deployed on GCP Cloud Run with Firebase authentication.",
        metric: "PRODUCTION"
      },
      {
        title: "Agency OS",
        details: "Created a comprehensive product design specification suite containing 12 structured BRD/FRD documents spanning a 4-sprint rollout timeline.",
        metric: "SPEC READY"
      },
      {
        title: "Bitwise Consulting",
        details: "Engineered a Next.js 14 corporate site with responsive layouts and fluid transitions, carrying out a performance and SEO audit resulting in a perfect lighthouse score.",
        metric: "100 SCORES"
      },
      {
        title: "Kanban Board for Startups",
        details: "An interactive workspace board featuring a zero-lag drag-and-drop system, optimistic UI updates, and real-time collaboration.",
        metric: "LIVE"
      },
      {
        title: "Omni Keys",
        details: "A background AI assistant desktop app built in Rust and React 19, enabling OS-level text actions using global hotkey listeners.",
        metric: "LIVE"
      }
    ]
  },
  "ai-systems": {
    slug: "ai-systems",
    title: "AI Systems Optimization",
    heroLine: "The AI work you won't find on other portfolios: what happens after the demo breaks.",
    description: "Billing leak overrides, structured prompt engineering pipelines (.skill configs), and container scaling for LLM apps.",
    accent: "ai",
    techTags: ["Google AI Studio", "Claude Code", "Firebase Studio", "Docker", "GCP Cloud Build", "CI/CD"],
    narrative: (
      <div className="space-y-6">
        <p className="text-[#EDEFF2] text-lg font-medium">
          This is a self-case-study section showing the receipts of how I optimize, audit, and structure my own LLM tools and integrations.
        </p>
        
        <div className="space-y-6">
          <div className="border border-white/[0.08] p-5 rounded-xl bg-[#12171D]/40">
            <h3 className="text-white font-bold mb-2 text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#6EE7D8]" />
              Case 1: Diagnosing Google AI Studio Billing Leak
            </h3>
            <p className="text-xs leading-relaxed">
              Discovered a recurring billing issue during testing caused by a Jio-bundled Google One Pro override which was conflict-routing free tokens into premium billed accounts. Solved by decoupling API channels and routing testing pipelines into a dedicated free-tier sandbox account, capping API usage limits.
            </p>
          </div>

          <div className="border border-white/[0.08] p-5 rounded-xl bg-[#12171D]/40">
            <h3 className="text-white font-bold mb-2 text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#6EE7D8]" />
              Case 2: Nano Banana Pro prompt discipline (.skill specs)
            </h3>
            <p className="text-xs leading-relaxed">
              Standardized prompt engineering into an engineering discipline rather than guesswork. Created a strict `.skill` configuration rulebook defining hard parameters: single continuous camera shots, strict limb-count controls (no generic 3D model distortions), and pixel logo integrity rules.
            </p>
          </div>

          <div className="border border-white/[0.08] p-5 rounded-xl bg-[#12171D]/40">
            <h3 className="text-white font-bold mb-2 text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#6EE7D8]" />
              Case 3: RetailOS CI/CD Pipeline Tuning
            </h3>
            <p className="text-xs leading-relaxed">
              Optimized automated container building. Wrote custom GCP Cloud Build configurations and structured multi-stage Docker builds to reduce image weight from 1.2GB down to 180MB, minimizing cold start delays on Serverless runtimes.
            </p>
          </div>
        </div>

        <p className="text-xs text-[#8B93A1] italic mt-4">
          Note: I have no client AI consulting work yet — this page serves as an honest proof of process, demonstrating my personal developer toolkit and resource optimization.
        </p>
      </div>
    ),
    proofPoints: [
      {
        title: "Billing Diagnostic Audit",
        details: "Audited network logs to identify account conflicts, saving developer sandbox billing overhead.",
        metric: "COST CUT"
      },
      {
        title: ".skill File Standardization",
        details: "Established prompt configuration files to restrict AI model generation drift and anomalies.",
        metric: "ZERO DRIFT"
      },
      {
        title: "Docker Image Compression",
        details: "Refined multi-stage builds and base alpine images, speeding up deployments on GCP Cloud Run.",
        metric: "-85% WEIGHT"
      }
    ]
  },
  "video": {
    slug: "video",
    title: "Cinematic Video Editing",
    heroLine: "Cut for attention, not for filler.",
    description: "High-retention editing focused on pacing, sound design, and impact storytelling.",
    accent: "signal",
    techTags: ["CapCut Pro", "Cine Studio", "Seedance 2.0", "Motion Design"],
    narrative: (
      <div className="space-y-6">
        <p className="text-[#EDEFF2] text-lg font-medium">
          Video edits designed to capture focus in the first 3 seconds. The reel below showcases editing pacing, audio layering, and motion alignment.
        </p>
        <p>
          I approach video editing with a developer&apos;s structure. Every cut aligns with audio transients, and screen assets are optimized for frame retention. I avoid over-used flashy transitions in favor of clean pacing, precise sound effects, and text animations that reinforce the narrative.
        </p>
      </div>
    ),
    proofPoints: [
      {
        title: "Attention Spacing",
        details: "Optimized pacing for social channels, targeting a 70%+ retention score on initial segments.",
        metric: "70%+ RETAIN"
      },
      {
        title: "Transient Sync",
        details: "Automatic alignment of video frames with sound transients for snappy visual feedback.",
        metric: "SYNCED"
      }
    ],
    customSection: (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
        <VideoReelCard
          title="Cyberpunk Street Loop - Pacing Edit"
          videoSrc="https://assets.mixkit.co/videos/preview/mixkit-cyberpunk-neon-city-street-42263-large.mp4"
          thumbnailSrc="https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=600&auto=format&fit=crop&q=80"
        />
        <VideoReelCard
          title="Urban Neon Pacing - Cinematic Edit"
          videoSrc="https://assets.mixkit.co/videos/preview/mixkit-urban-street-with-neon-lights-at-night-42289-large.mp4"
          thumbnailSrc="https://images.unsplash.com/photo-1515260268569-9271009adfdb?w=600&auto=format&fit=crop&q=80"
        />
      </div>
    )
  },
  "generative-ai": {
    slug: "generative-ai",
    title: "Generative AI Visual Design",
    heroLine: "Every frame follows a rulebook.",
    description: "Strict camera prompt rules, product-placement consistency, and conceptual image generation pipelines.",
    accent: "ai",
    techTags: ["Midjourney v6", "Stable Diffusion XL", "Runway Gen-2", "Prompt Design", "Limb Control"],
    narrative: (
      <div className="space-y-6">
        <p className="text-[#EDEFF2] text-lg font-medium">
          Generative design is not just hitting generate. It is writing custom prompts like code, and constraining output spaces.
        </p>
        <p>
          For the Nano Banana Pro campaign, I developed a strict camera rulebook: single continuous shots only, absolute 2-leg/2-hand restrictions (curating out model distortions), and preserving product branding logo ratios.
        </p>
        <p>
          I also ran prompt audit experiments on Diptyque Tam Dao fragrance layouts, utilizing depth-of-field control and complex material descriptors to generate photorealistic product staging sets.
        </p>
      </div>
    ),
    proofPoints: [
      {
        title: "Diptyque Test Run",
        details: "Fragrance bottle placement styling using camera parameters (f/1.8, 85mm) and custom prompts.",
        metric: "STUDIO QUALITY"
      },
      {
        title: "Prompt Consistency",
        details: "Built seed workflows to ensure stable character layouts across multiple scene generations.",
        metric: "STABLE SEED"
      }
    ],
    customSection: (
      <div className="w-full mt-8">
        <h4 className="font-mono text-xs uppercase tracking-wider text-[#8B93A1] mb-6 text-left">Generated Concept Artifacts</h4>
        <FeaturedWorkCylinder
          images={[
            { src: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=600&auto=format&fit=crop&q=80", alt: "Conceptual Fragrance Layout 1" },
            { src: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=600&auto=format&fit=crop&q=80", alt: "Product Placement Staging" },
            { src: "https://images.unsplash.com/photo-1515260268569-9271009adfdb?w=600&auto=format&fit=crop&q=80", alt: "Diptyque Tam Dao Concept" },
          ]}
        />
      </div>
    )
  }
};
