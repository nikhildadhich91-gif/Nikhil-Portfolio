"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { motion } from "framer-motion";
import { Mail, MapPin, Send } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PATH_DOWN = "M0-0.3C0-0.3,464,156,1139,156S2278-0.3,2278-0.3V683H0V-0.3z";
const PATH_CENTER = "M0-0.3C0-0.3,464,0,1139,0S2278-0.3,2278-0.3V683H0V-0.3z";

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      console.log("Transmission received:", formData);
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    }
  };

  useEffect(() => {
    const footer = footerRef.current;
    const path = pathRef.current;
    if (!footer || !path) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: footer,
        start: "top bottom",
        toggleActions: "play pause resume reverse",
        onEnter: (self) => {
          const velocity = self.getVelocity();
          const variation = Math.min(Math.max(velocity / 12000, -0.75), 0.75);

          gsap.fromTo(
            path,
            { attr: { d: PATH_DOWN } },
            {
              duration: 2.2,
              attr: { d: PATH_CENTER },
              ease: `elastic.out(${1.2 + variation}, ${0.8 - variation})`,
              overwrite: "auto",
            }
          );
        },
      });
    }, footer);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style jsx>{`
        .footer-wrap {
          position: relative;
          width: 100%;
          overflow: hidden;
          background: transparent;
          margin-top: -2px; 
        }

        #footer-img {
          height: 100%;
          width: 100%;
          display: block;
          overflow: visible;
        }

        .footer-bg-container {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }

        .footer-noise {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          opacity: 0.04;
          mix-blend-mode: overlay;
          pointer-events: none;
          background-image: url("https://assets.codepen.io/16327/noise.png");
          z-index: 1;
        }

        .footer-content {
          position: relative;
          z-index: 10;
          width: 100%;
        }
      `}</style>

      <div ref={footerRef} className="footer-wrap">
        {/* Curved Bouncy SVG Background */}
        <div className="footer-bg-container">
          <div className="footer-noise" />
          <svg
            preserveAspectRatio="none"
            id="footer-img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 2278 683"
            className="w-full h-full"
          >
            <defs>
              <linearGradient id="grad-1" x1="0" y1="0" x2="2278" y2="683" gradientUnits="userSpaceOnUse">
                <stop offset="0.0" stopColor="var(--bg-base)" />
                <stop offset="0.5" stopColor="var(--bg-raised)" />
                <stop offset="1.0" stopColor="var(--color-accent)" />
              </linearGradient>
            </defs>
            <path
              ref={pathRef}
              id="bouncy-path"
              fill="url(#grad-1)"
              d={PATH_DOWN}
            />
          </svg>
        </div>

        {/* Content Overlay: Let's Build Together Section (with reduced pt-16, pb-4, and copyright row deleted) */}
        <div className="footer-content max-w-[1400px] mx-auto pt-16 pb-4 px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Left Column: Info & Links */}
            <div className="lg:col-span-5 flex flex-col justify-center text-text-primary">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-6xl sm:text-7xl font-normal tracking-tighter mb-8"
              >
                Let&apos;s Build <br /> 
                <span className="font-accent italic text-accent dark:text-accent lowercase tracking-normal">
                  together
                </span>
              </motion.h2>
              <p className="text-text-muted text-base leading-relaxed mb-12 max-w-md font-medium">
                Have an AI product idea, automation workflow, or need a high-performance website or SaaS built for your startup or business? Send details and let&apos;s build it.
              </p>

              {/* Direct Channels */}
              <div className="space-y-4 max-w-sm">
                <a
                  href="mailto:nikhildadhich91@gmail.com"
                  className="flex items-center gap-4 p-4.5 rounded-[1.5rem] border border-border-hairline bg-bg-base/80 hover:border-accent hover:bg-bg-raised transition-all group"
                >
                  <div className="p-3 rounded-xl bg-bg-raised text-text-primary group-hover:text-accent border border-border-hairline transition-colors">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h4 className="text-[8px] font-mono uppercase tracking-[0.2em] text-text-muted">Email</h4>
                    <p className="text-xs font-bold text-text-primary group-hover:text-accent transition-colors">
                      nikhildadhich91@gmail.com
                    </p>
                  </div>
                </a>

                <a
                  href="https://linkedin.com/in/nikhil-dadhich91"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4.5 rounded-[1.5rem] border border-border-hairline bg-bg-base/80 hover:border-accent hover:bg-bg-raised transition-all group"
                >
                  <div className="p-3 rounded-xl bg-bg-raised text-text-primary group-hover:text-accent border border-border-hairline transition-colors">
                    <LinkedinIcon className="w-[18px] h-[18px]" />
                  </div>
                  <div>
                    <h4 className="text-[8px] font-mono uppercase tracking-[0.2em] text-text-muted">LinkedIn</h4>
                    <p className="text-xs font-bold text-text-primary group-hover:text-accent transition-colors">
                      linkedin.com/in/nikhil-dadhich91
                    </p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4.5 rounded-[1.5rem] border border-border-hairline bg-bg-base/80">
                  <div className="p-3 rounded-xl bg-bg-raised text-text-primary border border-border-hairline">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h4 className="text-[8px] font-mono uppercase tracking-[0.2em] text-text-muted">Location</h4>
                    <p className="text-xs font-bold text-text-primary">
                      Jaipur, Rajasthan, India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7 bg-bg-base/90 backdrop-blur-sm border border-border-hairline rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative text-text-primary">
              <h3 className="text-2xl font-bold font-display mb-8">Send Specifications</h3>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border border-accent/20 bg-accent/5 text-accent p-8 rounded-[1.5rem] text-center space-y-4"
                >
                  <h4 className="font-bold text-base font-display">Transmission Received</h4>
                  <p className="text-xs leading-relaxed text-text-muted max-w-sm mx-auto">
                    Thank you. Your project specifications have been logged. I will read through your operations requirements and get back to you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="font-mono text-[9px] uppercase tracking-widest text-text-primary hover:text-accent underline"
                  >
                    Transmit new specifications
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="font-mono text-[9px] uppercase tracking-wider text-text-muted">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. John Doe"
                        className="w-full bg-bg-raised border border-border-hairline focus:border-accent text-text-primary rounded-xl px-4 py-3 text-sm focus:outline-none transition-all placeholder-text-muted/30 font-mono"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="font-mono text-[9px] uppercase tracking-wider text-text-muted">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. john@example.com"
                        className="w-full bg-bg-raised border border-border-hairline focus:border-accent text-text-primary rounded-xl px-4 py-3 text-sm focus:outline-none transition-all placeholder-text-muted/30 font-mono"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="font-mono text-[9px] uppercase tracking-wider text-text-muted">
                      Project Specifications / Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your AI use-case, automation idea, stack preferences, or project timeline..."
                      className="w-full bg-bg-raised border border-border-hairline focus:border-accent text-text-primary rounded-xl px-4 py-3 text-sm focus:outline-none transition-all placeholder-text-muted/30 leading-relaxed font-mono"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="bg-accent text-white font-mono text-[10px] uppercase tracking-widest px-8 py-4.5 rounded-full hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-accent/25"
                    >
                      Transmit Specs
                      <Send size={10} />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
