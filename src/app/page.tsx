"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { PROJECTS_DATA } from "../lib/projects-data";
import { PageLoader } from "@/components/page-loader";
import { ConceptGallery } from "@/components/ui/concept-gallery";
import { Footer } from "@/components/ui/footer";
import { MovingCircle } from "../components/moving-circle";
import dynamic from "next/dynamic";
import TrueFocus from "@/components/ui/true-focus";
import ScrollFloat from "@/components/ui/scroll-float";
import { Safari } from "@/components/ui/safari";
import { TypingAnimation } from "@/components/ui/typing-animation";

const Lanyard = dynamic(() => import("@/components/ui/lanyard"), { ssr: false });


// Custom SVG Icons to avoid lucide-react export version mismatches
const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GlobeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </svg>
);

const FileTextIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    <path d="M10 9H8" />
    <path d="M16 13H8" />
    <path d="M16 17H8" />
  </svg>
);

// Type definitions
interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  mainPortion: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  imageUrl: string;
  alt: string;
  slug: string;
}

const EXPERIENCE = [
  {
    id: "01",
    role: "GenAI & Automation Engineer",
    company: "Team Classic Window Planet",
    status: "FULL-TIME",
    period: "Aug 2024 – Feb 2026",
    description: "Built agentic automation pipelines and AI-powered workflows to streamline home automation operations. Designed RAG-based internal knowledge tools and prompt-engineered GPT integrations for product support. Prototyped intelligent dashboards using Python and LLMs to reduce manual reporting overhead by 60%.",
    highlights: ["Agentic Pipelines", "RAG Workflows", "LLM Integration"]
  },
  {
    id: "02",
    role: "Customer Success Associate",
    company: "Groww Serv Pvt. Ltd.",
    status: "FULL-TIME",
    period: "Jan 2024 – Aug 2024",
    description: "Supported high-volume fintech customers with transaction processes and account onboarding. Leveraged data insights to identify friction patterns and suggested AI-assisted improvements to the product team.",
    highlights: ["Fintech Operations", "Data-Driven Insights", "Process Automation"]
  }
];

const SKILL_CATEGORIES = [
  {
    category: "GenAI & Automation",
    skills: ["LLM Integration (GPT-4, Gemini)", "RAG Pipelines", "Agentic Workflows", "Prompt Engineering", "LangChain / LlamaIndex", "AI API Orchestration"]
  },
  {
    category: "Languages",
    skills: ["Python", "TypeScript", "JavaScript", "SQL", "Rust", "HTML/CSS"]
  },
  {
    category: "Frameworks & UI",
    skills: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "Tauri v2"]
  },
  {
    category: "Cloud & Infra",
    skills: ["GCP Cloud Run", "Firebase Studio", "Docker", "CI/CD (GitHub Actions)", "PostgreSQL", "MongoDB"]
  },
  {
    category: "Dev & Build Tools",
    skills: ["n8n Automation", "Make (Integromat)", "Zapier", "Appian Low-Code", "Power BI", "Draw.io"]
  }
];

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [activePreviewId, setActivePreviewId] = useState<string | null>(null);

  // isLoading stays true until PageLoader calls onComplete
  const handleLoaderDone = React.useCallback(() => {
    setIsLoading(false);
  }, []);

  // Map projects data
  const projects: ProjectItem[] = PROJECTS_DATA.map((proj, idx) => {
    let liveUrl = undefined;
    if (proj.slug === "retailos") {
      liveUrl = "https://retailos-multi-tenant-saas-retail-platform-429819667205.us-west1.run.app/";
    } else if (proj.slug === "bitwise-consulting") {
      liveUrl = "https://bitwise-ag.vercel.app/";
    } else if (proj.slug === "utkarsh-builder") {
      liveUrl = "https://utkarsh-builder.vercel.app/";
    } else if (proj.slug === "kanban-board") {
      liveUrl = "https://kanban-for-startup.vercel.app/";
    }
    return {
      id: `0${idx + 1}`,
      title: proj.title,
      category: proj.slug === "agency-os" ? "BUSINESS ANALYSIS | CASE STUDY" : "FULL-STACK | SAAS | DEPLOYED",
      description: proj.desc,
      mainPortion: proj.results || proj.narrative,
      tags: proj.tech,
      liveUrl,
      githubUrl: proj.slug === "agency-os" ? undefined : `https://github.com/nikhildadhich91-gif/${proj.slug}`,
      imageUrl: proj.image,
      alt: `${proj.title} - ${proj.desc}`,
      slug: proj.slug
    };
  });

  return (
    <>
      {/* Vertical staggered strip page loader */}
      {isLoading && <PageLoader onComplete={handleLoaderDone} />}

      <div
        id="circle-root"
        className="w-full bg-bg-base text-text-primary relative"
      >
        <MovingCircle />
        
        {/* Lanyard container at page level — keeps canvas height confined to hero section
            but doesn't limit its z-index (z-30 or z-60 will stack above #home content) */}
        <div className="absolute top-0 left-0 right-0 h-[85vh] pointer-events-none overflow-visible">
          <Lanyard />
        </div>

        <section id="home" className="min-h-[85vh] flex flex-col justify-between pt-16 pb-20 px-6 md:px-12 max-w-[1400px] mx-auto w-full relative overflow-visible">
          <div className="flex-1 flex flex-col justify-center">
            {/* Tag/Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-10 w-fit relative z-[1]"
            >
              <span className="inline-block w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-text-muted flex items-center gap-1.5 flex-wrap">
                Available for
                <TypingAnimation
                  words={[
                    "AI & Automation Projects",
                    "Agentic Workflows",
                    "RAG Pipelines",
                    "LLM Integrations",
                    "Full-Stack Development"
                  ]}
                  loop
                  showCursor={true}
                  blinkCursor={true}
                  typeSpeed={60}
                  deleteSpeed={30}
                  pauseDelay={2000}
                  className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent font-bold"
                />
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-[11vw] xs:text-[10vw] sm:text-[8vw] lg:text-[clamp(4.5rem,7vw,8.5rem)] font-normal tracking-tighter leading-[0.9] text-text-primary max-w-5xl relative z-[1]"
            >
              <TrueFocus
                sentence="GenAI engineer|& full-stack builder"
                separator="|"
                manualMode={false}
                specialLoadMode={true}
                startTrigger={!isLoading}
                borderColor="var(--color-accent)"
                glowColor="rgba(255, 107, 0, 0.4)"
                animationDuration={0.8}
                blurAmount={16}
              />
            </motion.h1>

            {/* Description & Buttons Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-16 md:mt-24 items-center relative z-[2]">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="lg:col-span-4"
              >
                <p className="text-text-muted text-base md:text-lg leading-relaxed max-w-md font-medium">
                  Shipping <span className="text-text-primary font-bold">AI-native products</span> where <span className="font-accent italic text-accent lowercase">great design</span> meets <span className="text-text-primary font-bold italic">GenAI-powered automation</span>.
                </p>
              </motion.div>

              {/* Rotating circle anchor — center column of description grid */}
              <div className="lg:col-span-4 flex justify-center items-center py-8">
                <div id="hero-text-anchor" className="w-2 h-2 pointer-events-none opacity-0" />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="lg:col-span-4 flex flex-wrap gap-4 items-center lg:justify-end lg:items-end"
              >
                <a
                  href="mailto:nikhildadhich91@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 rounded-full border border-border-hairline hover:border-accent transition-colors bg-bg-raised flex items-center justify-center text-text-primary hover:text-accent shadow-sm"
                  title="Mail"
                >
                  <Mail size={18} />
                </a>
                <a
                  href="https://linkedin.com/in/nikhil-dadhich91"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 rounded-full border border-border-hairline hover:border-accent transition-colors bg-bg-raised flex items-center justify-center text-text-primary hover:text-accent shadow-sm"
                  title="LinkedIn"
                >
                  <LinkedinIcon className="w-[18px] h-[18px]" />
                </a>
                <a
                  href="https://github.com/nikhildadhich91-gif"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 rounded-full border border-border-hairline hover:border-accent transition-colors bg-bg-raised flex items-center justify-center text-text-primary hover:text-accent shadow-sm"
                  title="GitHub"
                >
                  <GithubIcon className="w-[18px] h-[18px]" />
                </a>
                <a
                  href="#"
                  className="p-5 rounded-full border border-border-hairline hover:border-accent transition-colors bg-bg-raised flex items-center justify-center text-text-primary hover:text-accent shadow-sm"
                  title="Resume"
                >
                  <FileTextIcon className="w-[18px] h-[18px]" />
                </a>
              </motion.div>
            </div>
          </div>

          {/* Footer of Hero */}
          <div className="pt-8 border-t border-border-hairline grid grid-cols-2 md:grid-cols-4 gap-6 relative z-[1]">
            {[
              { label: "Available for", val: "AI & Automation Projects", icon: <GlobeIcon className="w-2.5 h-2.5 text-accent" /> },
              { label: "Specialization", val: "GenAI & Full-Stack" },
              { label: "Contact", val: "Jaipur, India" },
              { label: "Opportunities", val: "Open for Remote Roles" }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col gap-2">
                <span className="text-[8px] font-mono uppercase tracking-[0.3em] text-text-muted flex items-center gap-2">
                  {item.icon} {item.label}
                </span>
                <span className="text-xs font-normal uppercase tracking-tight text-text-primary">
                  {item.val}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: About */}
        <section id="about" className="py-20 md:py-32 px-6 md:px-12 bg-bg-raised/40 border-y border-border-hairline relative overflow-x-hidden">
          {/* Circle anchor: x=150px matches red box center (left edge area);
              top-[170px] places circle center vertically on the About heading */}
          <div
            id="about-text-anchor"
            className="absolute top-[170px] left-[150px] w-2 h-2 opacity-0 pointer-events-none hidden lg:block"
          />

          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24 items-center">
              {/* Left Column: Heading */}
              <div className="lg:col-span-5 relative z-[2]">

                <motion.h2
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: !0 }}
                  className="text-[12vw] md:text-[8vw] font-normal tracking-tighter leading-[0.85] mb-8 text-text-primary"
                >
                  About <br /> <span className="text-accent font-accent lowercase tracking-normal italic opacity-100 font-normal">me</span>
                </motion.h2>
                <div className="flex items-center gap-4 mb-12">
                  <span className="w-12 h-px bg-accent" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-text-muted">
                    GenAI & Fullstack
                  </span>
                </div>
              </div>

              {/* Right Column: Descriptions & Stats Cards */}
              <div className="lg:col-span-7 flex flex-col gap-12 relative z-[2]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 text-base md:text-lg text-text-muted font-medium leading-relaxed">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: !0 }}
                  >
                    Based in Jaipur, I&apos;m a <span className="text-text-primary font-semibold">GenAI Engineer</span> and <span className="text-text-primary font-semibold">Full-Stack Developer</span> specializing in <span className="text-text-primary font-semibold">agentic workflows, RAG pipelines,</span> and <span className="text-text-primary font-semibold">AI-native SaaS products</span>. I turn complex automation ideas into production-ready systems.
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: !0 }}
                    transition={{ delay: 0.2 }}
                  >
                    I bring the same rigor to everything I ship: <span className="text-text-primary font-semibold">clean architecture, LLM orchestration,</span> and interfaces that feel as good as they function. <span className="text-text-primary font-semibold">Open to building high-performance websites, MVPs, and custom SaaS platforms</span> for startups and businesses.
                  </motion.div>
                </div>

                {/* Info Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                  {[
                    { label: "Education", value: "IPS College" },
                    { label: "Location", value: "Jaipur, IN" },
                    { label: "Focus", value: "GenAI & SaaS" },
                    { label: "Status", value: "Active" }
                  ].map((card, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -8, borderColor: "var(--color-accent)" }}
                      className="p-5 md:p-6 lg:p-8 border border-border-hairline rounded-[2rem] bg-bg-raised text-center flex flex-col items-center justify-center transition-all duration-500 group shadow-sm"
                    >
                      <p className="text-[8px] font-mono uppercase tracking-[0.3em] text-text-muted mb-2 group-hover:text-accent transition-colors">
                        {card.label}
                      </p>
                      <p className="text-xs sm:text-sm font-bold uppercase text-text-primary group-hover:scale-105 transition-transform">
                        {card.value}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Works (Projects) */}
        <section id="projects" className="py-20 md:py-32 px-6 md:px-12 bg-bg-base">
          <div className="max-w-[1400px] mx-auto">
            {/* Section Header */}
            <div className="flex flex-col items-center text-center mb-24 gap-6">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: !0 }}
                transition={{ duration: 1 }}
              >
                <div className="flex flex-col items-center mb-8">
                  <ScrollFloat
                    containerClassName="!overflow-visible"
                    textClassName="section-heading"
                    scrollStart="top bottom-=10%"
                    scrollEnd="bottom center"
                  >
                    Project
                  </ScrollFloat>
                  <ScrollFloat
                    containerClassName="!overflow-visible"
                    textClassName="section-heading-accent"
                    scrollStart="top bottom-=10%"
                    scrollEnd="bottom center"
                  >
                    gallery
                  </ScrollFloat>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="h-px w-12 bg-accent/20" />
                  <p className="text-text-muted font-mono text-[9px] uppercase tracking-[0.4em] leading-relaxed">
                    Handpicked selection
                  </p>
                  <span className="h-px w-12 bg-accent/20" />
                </div>
              </motion.div>
            </div>

            {/* Projects list in exact layout */}
            <div className="flex flex-col gap-[8vw]">
              {projects.map((proj, idx) => (
                <article key={proj.id} className="group relative">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    {/* Index Column */}
                    <div className="lg:col-span-1 hidden lg:block select-none pointer-events-none">
                      <span className="text-[6vw] font-normal text-text-primary opacity-[0.03] group-hover:opacity-8 transition-all leading-none">
                        {proj.id}
                      </span>
                    </div>

                    {/* Content Column */}
                    <div className="lg:col-span-5 flex flex-col justify-center">
                      <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: !0 }}
                        className="text-accent font-mono text-[10px] uppercase tracking-[0.4em] mb-6 flex items-center gap-3"
                      >
                        <span className="w-1.5 h-1.5 bg-accent rounded-full animate-ping" />
                        {proj.category}
                      </motion.p>

                      <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: !0 }}
                        className="text-3xl xl:text-5xl font-normal mb-8 group-hover:text-accent transition-colors duration-500 text-text-primary leading-tight font-display"
                      >
                        {proj.title}
                      </motion.h3>

                      <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: !0 }}
                        transition={{ delay: 0.2 }}
                        className="text-text-muted text-base leading-relaxed mb-6 font-medium"
                      >
                        {proj.description}
                      </motion.p>

                      <div className="mb-8">
                        <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-text-muted mb-3 underline decoration-accent/20">
                          Main Highlights
                        </p>
                        <p className="text-sm font-normal text-text-primary/80">
                          {proj.mainPortion}
                        </p>
                      </div>

                      {/* Tech Tags */}
                      <div className="flex flex-wrap gap-2 mb-10">
                        {proj.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-4 py-1.5 border border-border-hairline rounded-full text-[9px] font-medium font-mono text-text-muted uppercase tracking-widest bg-bg-raised"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Action Links */}
                      <div className="flex flex-wrap gap-4">
                        {proj.liveUrl && (
                          <motion.a
                            whileHover={{ scale: 1.03, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            href={proj.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-border-hairline hover:border-accent transition-colors bg-bg-raised text-[10px] font-mono uppercase tracking-widest text-text-muted hover:text-accent"
                          >
                            <GlobeIcon className="w-4 h-4" />
                            <span>Live Site</span>
                          </motion.a>
                        )}
                        {proj.githubUrl && (
                          <motion.a
                            whileHover={{ scale: 1.03, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            href={proj.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-border-hairline hover:border-accent transition-colors bg-bg-raised text-[10px] font-mono uppercase tracking-widest text-text-muted hover:text-accent"
                          >
                            <GithubIcon className="w-4 h-4" />
                            <span>Source Code</span>
                          </motion.a>
                        )}
                      </div>
                    </div>

                    {/* Image Column */}
                    {activePreviewId === proj.id ? (
                      <div className="lg:col-span-6 relative aspect-[16/10] overflow-hidden rounded-[2.5rem] border border-border-hairline shadow-2xl bg-bg-raised flex flex-col z-30">
                        <Safari url={proj.liveUrl} className="w-full h-full">
                          {/* Sites that set X-Frame-Options / CSP frame-ancestors block iframes.
                              Show a premium fallback with direct open-in-new-tab for those. */}
                          {([] as string[]).includes(proj.slug) ? (
                            <div className="w-full h-full flex flex-col items-center justify-center gap-6 bg-[#0a0a0a] px-8 text-center select-none">
                              {/* Project thumbnail preview */}
                              {proj.imageUrl && (
                                <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 shadow-2xl opacity-70">
                                  <img src={proj.imageUrl} alt={proj.alt} className="w-full object-cover object-top" />
                                </div>
                              )}
                              <div className="space-y-2">
                                <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-accent/80">Preview restricted</p>
                                <p className="text-white/60 text-[13px] leading-relaxed max-w-xs">
                                  This site enforces strict embedding policies — it needs to open directly in the browser.
                                </p>
                              </div>
                              <a
                                href={proj.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2.5 px-7 py-3 bg-accent text-white font-mono text-[10px] uppercase tracking-widest rounded-full hover:bg-accent/90 active:scale-95 transition-all font-bold shadow-lg shadow-accent/20"
                              >
                                Open Live Site
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                  <polyline points="15 3 21 3 21 9" />
                                  <line x1="10" y1="14" x2="21" y2="3" />
                                </svg>
                              </a>
                            </div>
                          ) : (
                            <iframe
                              src={proj.liveUrl}
                              className="w-full h-full border-none bg-white dark:bg-[#0A0E12]"
                              title={proj.title}
                            />
                          )}
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setActivePreviewId(null);
                            }}
                            className="absolute top-2.5 right-4 z-30 text-text-muted hover:text-accent transition-colors flex items-center justify-center p-1 cursor-pointer bg-transparent border-none"
                            title="Close Preview"
                          >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="18" y1="6" x2="6" y2="18" />
                              <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                          </button>
                        </Safari>
                      </div>
                    ) : (
                      <div className="lg:col-span-6 relative aspect-[16/10] overflow-hidden rounded-[2.5rem] border border-border-hairline shadow-2xl group/img bg-bg-raised">
                        <motion.div
                          whileHover={{ scale: 1.03 }}
                          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                          className="w-full h-full bg-bg-raised flex items-center justify-center relative overflow-hidden"
                        >
                          {proj.imageUrl ? (
                            <img
                              src={proj.imageUrl}
                              alt={proj.alt}
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <GlobeIcon className="w-[100px] h-[100px] text-text-primary/[0.03] group-hover/img:text-accent/10 transition-colors duration-1000" />
                          )}
                          
                          {proj.liveUrl ? (
                            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-4 opacity-90 md:opacity-0 md:group-hover/img:opacity-100 transition-opacity duration-300">
                              <div className="w-14 h-14 rounded-full bg-accent text-white flex items-center justify-center shadow-lg transform scale-90 group-hover/img:scale-100 transition-transform duration-500 cursor-pointer"
                                   onClick={() => setActivePreviewId(proj.id)}
                              >
                                <svg className="w-7 h-7 ml-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                  <polygon points="5 3 19 12 5 21 5 3" />
                                </svg>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setActivePreviewId(proj.id);
                                }}
                                className="px-5 py-2 bg-text-primary text-bg-base font-mono text-[9px] uppercase tracking-widest rounded-full hover:bg-accent hover:text-white transition-colors duration-300 font-bold shadow-lg cursor-pointer"
                              >
                                Live Preview
                              </button>
                            </div>
                          ) : (
                            <div className="absolute bottom-10 left-10 p-4 bg-bg-base/40 backdrop-blur-md rounded-2xl border border-border-hairline translate-y-20 opacity-0 group-hover/img:translate-y-0 group-hover/img:opacity-100 transition-all duration-700">
                              <p className="text-[10px] font-mono tracking-[0.3em] text-accent">
                                CASE STUDY
                              </p>
                            </div>
                          )}
                        </motion.div>
                      </div>
                    )}
                  </div>
                  {idx !== projects.length - 1 && (
                    <div className="mt-20 w-full h-px bg-gradient-to-r from-transparent via-border-hairline to-transparent" />
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* AI Visual Concept Gallery */}
        <ConceptGallery />

        {/* Lower page content wrapper — slides UP and OVER the sticky gallery container */}
        <div className="relative z-20 bg-bg-base border-t border-border-hairline shadow-[0_-20px_50px_rgba(0,0,0,0.12)]">
          {/* Section 4: Journey (Experience) */}
          <section id="experience" className="py-20 md:py-32 px-6 md:px-12 bg-bg-raised/40 border-b border-border-hairline relative overflow-hidden">
            <div className="max-w-[1400px] mx-auto relative z-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-28">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: !0 }}
                >
                  <div className="flex flex-col mb-4">
                    <ScrollFloat
                      containerClassName="!overflow-visible"
                      textClassName="section-heading"
                      scrollStart="top bottom-=10%"
                      scrollEnd="bottom center"
                    >
                      journey
                    </ScrollFloat>
                    <ScrollFloat
                      containerClassName="!overflow-visible"
                      textClassName="section-heading-accent"
                      scrollStart="top bottom-=10%"
                      scrollEnd="bottom center"
                    >
                      so far
                    </ScrollFloat>
                  </div>
                  <div className="w-16 h-px bg-accent/40 mt-10" />
                </motion.div>
                <div className="hidden md:block text-right">
                  <p className="text-text-muted font-mono text-[10px] uppercase tracking-[0.4em] leading-relaxed">
                    Professional timeline
                  </p>
                </div>
              </div>

              <div className="space-y-12 max-w-4xl">
                {EXPERIENCE.map((exp) => (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: !0 }}
                    className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 md:p-8 border border-border-hairline rounded-3xl md:rounded-[2.5rem] bg-bg-base/80 hover:border-accent transition-colors duration-500 shadow-sm group"
                  >
                    <div className="md:col-span-3">
                      <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted mb-2">
                        {exp.period}
                      </p>
                      <span className="px-3 py-1 border border-border-hairline rounded-full text-[8px] font-mono tracking-widest uppercase text-text-muted bg-bg-raised">
                        {exp.status}
                      </span>
                    </div>
                    <div className="md:col-span-9 space-y-4">
                      <h3 className="text-2xl font-bold font-display text-text-primary group-hover:text-accent transition-colors">
                        {exp.role} <span className="text-text-muted font-normal">@ {exp.company}</span>
                      </h3>
                      <p className="text-text-muted text-sm leading-relaxed">
                        {exp.description}
                      </p>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {exp.highlights.map((hl) => (
                          <span
                            key={hl}
                            className="px-3 py-1 bg-bg-raised text-text-primary text-[9px] font-medium font-mono uppercase tracking-wider rounded-md"
                          >
                            {hl}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 5: Stack (Tech Stack) */}
          <section id="tech-stack" className="py-20 md:py-32 px-6 md:px-12 bg-bg-base relative overflow-hidden">
            <div className="max-w-[1400px] mx-auto relative z-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-28">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: !0 }}
                >
                  <div className="flex flex-col mb-4">
                    <ScrollFloat
                      containerClassName="!overflow-visible"
                      textClassName="section-heading"
                      scrollStart="top bottom-=10%"
                      scrollEnd="bottom center"
                    >
                      operational
                    </ScrollFloat>
                    <ScrollFloat
                      containerClassName="!overflow-visible"
                      textClassName="section-heading-accent"
                      scrollStart="top bottom-=10%"
                      scrollEnd="bottom center"
                    >
                      stack
                    </ScrollFloat>
                  </div>
                  <div className="w-16 h-px bg-accent/40 mt-10" />
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {SKILL_CATEGORIES.map((cat, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -5, borderColor: "var(--color-accent)" }}
                    className="p-6 md:p-8 border border-border-hairline rounded-3xl md:rounded-[2.5rem] bg-bg-raised flex flex-col gap-6 transition-all duration-500 shadow-sm"
                  >
                    <h3 className="font-display text-xl font-bold border-b border-border-hairline pb-4 text-text-primary">
                      {cat.category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {cat.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-4 py-2 border border-border-hairline rounded-full text-[9px] font-medium font-mono text-text-muted uppercase tracking-widest bg-bg-base"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
          <Footer />
        </div>
      </div>
    </>
  );
}
