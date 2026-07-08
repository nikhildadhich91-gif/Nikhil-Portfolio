"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Send } from "lucide-react";
import { SpinningText } from "@/components/ui/spinning-text";
import { HeroHeadline } from "@/components/hero-headline";
import { LiveSitePreview } from "@/components/live-site-preview";
import { NumberTicker } from "@/components/ui/number-ticker";
import { TiltCard } from "@/components/ui/tilt-card";
import { ProjectSlider } from "@/components/ui/project-slider";
import { HowIWorkStack } from "@/components/how-i-work-stack";
import { ScrollVelocityContainer, ScrollVelocityRow } from "@/components/ui/velocity-marquee";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { PROJECTS_DATA } from "@/lib/projects-data";

const TECH_TAGS = [
  "Google AI Studio",
  "Claude Code",
  "Firebase Studio",
  "GCP Cloud Run",
  "Python",
  "SQL",
  "Appian Low-Code",
  "Power BI",
  "Meta Ads Manager"
];

const EXPERIENCE = [
  {
    role: "Business Analyst",
    company: "Team Classic Window Planet, Jaipur",
    period: "Aug 2024 – Feb 2026",
    details: [
      "Designed detailed workflow maps and gathered product requirements for automation systems.",
      "Conducted root-cause analysis on escalated service items to fix recurring operational gaps.",
      "Maintained MIS spreadsheets to report performance and benchmarked competitor features in the home automation market."
    ]
  },
  {
    role: "Customer Success Associate",
    company: "Groww Serv Pvt Ltd",
    period: "Jan 2024 – Aug 2024",
    details: [
      "Supported high-volume fintech customers with transaction processes and account onboarding.",
      "Compiled voice-of-customer insights to help product and growth teams eliminate app friction points."
    ]
  }
];

const SERVICES_LIST = [
  {
    num: "01",
    title: "Software Architecture & Engineering",
    desc: "Full-stack SaaS product builds, end-to-end. I deploy lightweight serverless container applications on Google Cloud and manage real collections.",
    tech: ["Next.js", "TypeScript", "Firebase", "GCP Cloud Run", "Python", "SQL"],
    accent: "var(--accent-signal)",
  },
  {
    num: "02",
    title: "AI Systems Optimization",
    desc: "Self-case-studies on API cost controls, prompt configurations (.skill specifications), and automated Docker deployments.",
    tech: ["Google AI Studio", "Claude Code", "Firebase Studio", "Docker", "CI/CD"],
    accent: "var(--accent-ai)",
  },
  {
    num: "03",
    title: "Cinematic Video Editing",
    desc: "High-retention visual edits designed for focus. Aligning cuts with sound transients and optimizing pacing for social channels.",
    tech: ["CapCut Pro", "Cine Studio", "Seedance 2.0", "Sound Design"],
    accent: "var(--accent-signal)",
  },
  {
    num: "04",
    title: "Generative AI Visual Design",
    desc: "Capping generative model drift using seed consistency and structural camera rulebooks (single continuous shots, logo integrity).",
    tech: ["Midjourney v6", "Stable Diffusion XL", "Runway Gen-2", "Prompt Design"],
    accent: "var(--accent-ai)",
  },
];

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const { scrollY } = useScroll();

  // Scroll cooling color transition (monochrome slate to dark gray)
  const glowColor = useTransform(scrollY, [0, 600], ["#888888", "#333333"]);

  // Contact Form State
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      console.log("Form data submitted:", formData);
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-bg-base"
          >
            <SpinningText text="loading • the • work • loading •" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full relative"
      >
        {/* Section 1: Hero & Showcase Live Preview */}
        <section id="home" className="relative w-full max-w-7xl mx-auto px-6 lg:px-16 pt-12 md:pt-20 pb-32 flex flex-col items-center text-center">
          <div className="flex flex-col items-center gap-4 max-w-4xl mx-auto mb-16">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-text-primary bg-text-primary/5 border border-border-hairline px-3.5 py-1.5 rounded-full select-none">
              Nikhil Dadhich — Builder
            </span>
            <HeroHeadline />
            <p className="text-text-muted max-w-2xl text-sm sm:text-base leading-relaxed select-none">
              I build production software solo, carrying a Business Analyst&apos;s discipline for requirements, documentations, and cost optimizations.
            </p>
          </div>

          {/* Interactive Safari Preview with Dynamic Glow */}
          <div className="relative w-full flex justify-center">
            {/* Glow Backplate */}
            <motion.div
              className="absolute -inset-4 rounded-[2rem] blur-3xl opacity-20 pointer-events-none z-0"
              style={{ backgroundColor: glowColor }}
            />
            {/* Mockup Container */}
            <motion.div
              className="w-full relative z-10"
              style={{
                filter: "drop-shadow(0 4px 20px rgba(0,0,0,0.4))",
              }}
            >
              <LiveSitePreview />
            </motion.div>
          </div>
        </section>

        {/* Stats Strip */}
        <section className="w-full bg-bg-raised/40 border-y border-border-hairline py-12 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 lg:px-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col gap-1.5">
              <span className="text-3xl md:text-5xl font-bold font-display text-text-primary tracking-tight">
                <NumberTicker value={8} />
                <span>+</span>
              </span>
              <span className="font-mono text-[10px] tracking-wider text-text-muted uppercase">SAAS PRODUCTS BUILT</span>
            </div>
            <div className="flex flex-col gap-1.5 border-y md:border-y-0 md:border-x border-border-hairline py-6 md:py-0">
              <span className="text-3xl md:text-5xl font-bold font-display text-text-primary tracking-tight flex items-center justify-center">
                <NumberTicker value={1} />
                <span>M+</span>
              </span>
              <span className="font-mono text-[10px] tracking-wider text-text-muted uppercase">API CALLS HANDLED</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-3xl md:text-5xl font-bold font-display text-text-primary tracking-tight flex items-center justify-center">
                <NumberTicker value={99.9} decimals={1} />
                <span>%</span>
              </span>
              <span className="font-mono text-[10px] tracking-wider text-text-muted uppercase">DEPLOYMENT UPTIME</span>
            </div>
          </div>
        </section>

        {/* Section 2: Work Section (Slider + Grid) */}
        <section id="work" className="w-full py-32 bg-bg-raised/10 border-t border-border-hairline">
          <div className="max-w-7xl mx-auto px-6 lg:px-16 flex flex-col items-center text-center">
            <div className="max-w-2xl mx-auto mb-12 select-none">
              <span className="font-mono text-xs uppercase tracking-widest text-text-muted mb-2 block">VISUAL LOG</span>
              <h2 className="text-3xl sm:text-4xl font-display text-text-primary font-bold">Featured Project Showcase</h2>
            </div>
            <div className="w-full">
              <ProjectSlider />
            </div>

            {/* Grid of all builds */}
            <div className="w-full max-w-5xl mx-auto mt-32 text-left">
              <h3 className="font-mono text-xs text-text-muted uppercase tracking-wider mb-8 border-b border-border-hairline pb-3">
                ALL BUILDS & CASE STUDIES ({PROJECTS_DATA.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {PROJECTS_DATA.map((proj) => (
                  <TiltCard
                    key={proj.slug}
                    title={proj.title}
                    description={proj.desc}
                    status={proj.status}
                    imageSrc={proj.image}
                    imageAlt={proj.title}
                    href={`/services/${proj.slug === "bitwise-consulting" ? "software" : proj.slug === "retailos" ? "software" : proj.slug === "agency-os" ? "software" : proj.slug === "kanban-board" ? "software" : "software"}`}
                    accent={proj.accent}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Services Section (Capabilities Details) */}
        <section id="services" className="w-full max-w-7xl mx-auto px-6 lg:px-16 py-32 flex flex-col items-center border-t border-border-hairline">
          <div className="text-center max-w-2xl mx-auto mb-20 select-none">
            <span className="font-mono text-xs uppercase tracking-widest text-text-muted mb-2 block">THE COMPETENCIES</span>
            <h2 className="text-3xl sm:text-4xl font-display text-text-primary font-bold">Core Engineering Capabilities</h2>
            <p className="text-text-muted mt-4 text-xs sm:text-sm max-w-md mx-auto">
              I don&apos;t sell consulting packages; I ship working software. Each service represents an active engineering domain I build in daily.
            </p>
          </div>

          {/* Services Listing (consolidated from subpages) */}
          <div className="flex flex-col border-t border-border-hairline w-full max-w-5xl">
            {SERVICES_LIST.map((srv) => (
              <div
                key={srv.title}
                className="group border-b border-border-hairline py-10 md:py-16 flex flex-col md:flex-row items-start gap-8 md:gap-16 hover:bg-bg-raised/20 transition-all duration-300 px-4 -mx-4 rounded-xl"
              >
                {/* Index Number */}
                <div className="shrink-0 w-16 select-none">
                  <span
                    className="text-4xl md:text-6xl font-light font-display opacity-20 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ color: srv.accent }}
                  >
                    {srv.num}
                  </span>
                </div>

                {/* Core Content */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl md:text-2xl font-bold font-display text-text-primary group-hover:text-text-primary dark:group-hover:text-text-primary transition-colors">
                      {srv.title}
                    </h3>
                  </div>
                  <p className="text-text-muted text-xs sm:text-sm leading-relaxed max-w-3xl">
                    {srv.desc}
                  </p>
                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {srv.tech.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[9px] uppercase tracking-wider px-2.5 py-1 rounded bg-bg-raised border border-border-hairline text-text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sticky How I Work Section */}
        <section className="w-full py-32 border-t border-border-hairline">
          <div className="max-w-7xl mx-auto px-6 lg:px-16 flex flex-col items-center">
            <div className="text-center max-w-2xl mx-auto mb-20 select-none">
              <span className="font-mono text-xs uppercase tracking-widest text-text-muted mb-2 block">WORK ETHOS</span>
              <h2 className="text-3xl sm:text-4xl font-display text-text-primary font-bold">The Builder&apos;s Playbook</h2>
            </div>
            <div className="w-full">
              <HowIWorkStack />
            </div>
          </div>
        </section>

        {/* Section 4: About Section (Profile & Experience) */}
        <section id="about" className="w-full py-32 bg-bg-raised/10 border-t border-border-hairline">
          <div className="max-w-4xl mx-auto px-6 lg:px-16 text-left">
            <div className="max-w-2xl mb-16 select-none">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-text-primary mb-3 block">
                ABOUT THE BUILDER
              </span>
              <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-text-primary tracking-tight leading-tight">
                Nikhil Dadhich
              </h2>
              <p className="text-text-muted mt-6 text-sm sm:text-base leading-relaxed">
                21-year-old AI Builder and Full-Stack SaaS Developer based in Jaipur, India.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
              {/* Bio & Experience (span 2) */}
              <div className="md:col-span-2 space-y-12">
                <div className="space-y-4">
                  <h3 className="font-display text-xl font-bold text-text-primary">The Profile</h3>
                  <p className="text-text-muted leading-relaxed text-sm">
                    I focus on shipping production software solo—handling everything from backend architecture to containerized cloud deployments. I combine my engineering approach with a Business Analyst&apos;s discipline for requirements, detailed documentation, and stakeholder communication.
                  </p>
                </div>

                {/* Experience Timeline */}
                <div className="space-y-6">
                  <h3 className="font-display text-xl font-bold text-text-primary">Experience</h3>
                  <div className="space-y-8 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[1px] before:bg-border-hairline">
                    {EXPERIENCE.map((exp, idx) => (
                      <div key={idx} className="relative pl-8 group">
                        <div className="absolute left-[9px] top-1.5 w-[7px] h-[7px] rounded-full bg-text-primary group-hover:scale-125 transition-transform" />
                        <span className="font-mono text-[10px] text-text-muted">{exp.period}</span>
                        <h4 className="text-base font-bold text-text-primary font-display mt-0.5">{exp.role}</h4>
                        <h5 className="text-xs text-text-muted font-mono">{exp.company}</h5>
                        <ul className="list-disc list-outside ml-4 mt-3 text-xs text-text-muted space-y-1.5 leading-relaxed">
                          {exp.details.map((detail, dIdx) => (
                            <li key={dIdx}>{detail}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar: Stack, Education, Certs */}
              <div className="md:col-span-1 space-y-6">
                {/* Tech Stack */}
                <div className="bg-bg-raised border border-border-hairline rounded-2xl p-5 shadow-xl">
                  <h4 className="font-mono text-[10px] text-text-primary uppercase tracking-wider mb-4 border-b border-border-hairline pb-2 font-bold">
                    Operational Stack
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {TECH_TAGS.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded bg-bg-base border border-border-hairline text-text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div className="bg-bg-raised border border-border-hairline rounded-2xl p-5 shadow-xl space-y-4 text-left">
                  <h4 className="font-mono text-[10px] text-text-primary uppercase tracking-wider border-b border-border-hairline pb-2 font-bold">
                    Education
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <h5 className="text-xs font-bold text-text-primary font-display">BBA</h5>
                      <p className="text-[10px] text-text-muted leading-relaxed">IPS Business College, Jaipur (2022–2025)</p>
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-text-primary font-display">Higher Secondary (Commerce)</h5>
                      <p className="text-[10px] text-text-muted leading-relaxed">MSS School, Kishangarh</p>
                    </div>
                  </div>
                </div>

                {/* Certifications */}
                <div className="bg-bg-raised border border-border-hairline rounded-2xl p-5 shadow-xl space-y-3 text-left">
                  <h4 className="font-mono text-[10px] text-text-primary uppercase tracking-wider border-b border-border-hairline pb-2 font-bold">
                    Certifications
                  </h4>
                  <ul className="space-y-2 text-[10px] text-text-muted leading-relaxed list-none">
                    <li className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-text-primary" />
                      NISM Series VIII – Equity Derivatives
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-text-primary" />
                      Google Agile Project Management
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack Velocity Marquee */}
        <section className="w-full border-t border-border-hairline bg-bg-raised/10 overflow-hidden">
          <ScrollVelocityContainer className="font-mono text-2xl tracking-tight text-text-muted/40 md:text-4xl py-12">
            <ScrollVelocityRow baseVelocity={4} direction={1}>
              GCP · FIREBASE · CLAUDE CODE · APPIAN · POWER BI · PYTHON · NEXT.JS ·
            </ScrollVelocityRow>
          </ScrollVelocityContainer>
        </section>

        {/* Section 5: Contact Section (Details & Form) */}
        <section id="contact" className="w-full border-t border-border-hairline">
          <div className="max-w-5xl mx-auto px-6 lg:px-16 py-32 text-left">
            <div className="max-w-2xl mb-16 select-none">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-text-primary mb-3 block">
                GET IN TOUCH
              </span>
              <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-text-primary tracking-tight leading-tight">
                Let&apos;s Talk Shop
              </h2>
              <p className="text-text-muted mt-6 text-sm sm:text-base leading-relaxed">
                No sales pitches or automated drip campaigns. Send a direct request, and we will talk software engineering, project specifications, or workflow optimization.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
              {/* Contact details */}
              <div className="lg:col-span-2 space-y-6">
                <h3 className="font-display text-xl font-bold text-text-primary">Direct Channels</h3>
                <div className="space-y-4">
                  <a
                    href="mailto:nikhildadhich91@gmail.com"
                    className="flex items-center gap-4 p-4 rounded-xl border border-border-hairline bg-bg-raised/40 hover:border-text-primary/30 hover:bg-bg-raised/80 transition-all group"
                  >
                    <div className="p-2.5 rounded-lg bg-bg-base text-text-primary border border-border-hairline">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-mono text-text-muted">EMAIL</h4>
                      <p className="text-sm font-semibold text-text-primary group-hover:text-text-primary dark:group-hover:text-white transition-colors">
                        nikhildadhich91@gmail.com
                      </p>
                    </div>
                  </a>

                  <a
                    href="https://linkedin.com/in/nikhil-dadhich91"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl border border-border-hairline bg-bg-raised/40 hover:border-text-primary/30 hover:bg-bg-raised/80 transition-all group"
                  >
                    <div className="p-2.5 rounded-lg bg-bg-base text-text-primary border border-border-hairline">
                      <LinkedinIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-mono text-text-muted">LINKEDIN</h4>
                      <p className="text-sm font-semibold text-text-primary group-hover:text-text-primary dark:group-hover:text-white transition-colors">
                        linkedin.com/in/nikhil-dadhich91
                      </p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 p-4 rounded-xl border border-border-hairline bg-bg-raised/40">
                    <div className="p-2.5 rounded-lg bg-bg-base text-text-primary border border-border-hairline">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-mono text-text-muted">LOCATION</h4>
                      <p className="text-sm font-semibold text-text-primary">
                        Jaipur, Rajasthan, India
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="lg:col-span-3 bg-bg-raised border border-border-hairline rounded-2xl p-6 sm:p-8 shadow-2xl">
                <h3 className="font-display text-xl font-bold text-text-primary mb-6">Send a Message</h3>
                
                {submitted ? (
                  <div className="border border-emerald-500/20 bg-emerald-500/5 text-emerald-300 p-6 rounded-xl text-center space-y-3">
                    <h4 className="font-bold text-sm font-display">Transmission Received</h4>
                    <p className="text-xs leading-relaxed text-text-muted">
                      Thank you. Your message has been logged. I&apos;ll read through your specifications and reach out.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="font-mono text-[10px] uppercase text-text-primary hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="font-mono text-[10px] text-text-muted uppercase tracking-wider font-bold">
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. John Doe"
                          className="w-full bg-bg-base border border-border-hairline focus:border-text-primary text-text-primary rounded-xl px-4 py-3 text-sm focus:outline-none transition-all placeholder-text-muted/30 font-mono"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="font-mono text-[10px] text-text-muted uppercase tracking-wider font-bold">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="e.g. john@example.com"
                          className="w-full bg-bg-base border border-border-hairline focus:border-text-primary text-text-primary rounded-xl px-4 py-3 text-sm focus:outline-none transition-all placeholder-text-muted/30 font-mono"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="message" className="font-mono text-[10px] text-text-muted uppercase tracking-wider font-bold">
                        Message / Specs
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Describe your project, platform, or specifications..."
                        className="w-full bg-bg-base border border-border-hairline focus:border-text-primary text-text-primary rounded-xl px-4 py-3 text-sm focus:outline-none transition-all placeholder-text-muted/30 leading-relaxed font-mono"
                      />
                    </div>

                    <div className="pt-2 flex justify-start">
                      <MagneticButton
                        type="submit"
                        className="bg-text-primary text-bg-base font-mono text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                      >
                        Transmit Specs
                        <Send className="w-3.5 h-3.5" />
                      </MagneticButton>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </motion.div>
    </>
  );
}
