"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const FluidGlass = dynamic(() => import("@/components/ui/fluid-glass"), { ssr: false });
import GlassSurface from "@/components/ui/glass-surface";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Works", href: "#projects" },
  { label: "Journey", href: "#experience" },
  { label: "Stack", href: "#tech-stack" },
  { label: "Contact", href: "#contact" },
];

import { ThemeToggleButton, ThemeToggleOptions, AnimationVariant, AnimationStart } from "@/components/theme-toggle";

function GlassFilter() {
  return (
    <svg className="hidden">
      <defs>
        <filter
          id="container-glass"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.05 0.05"
            numOctaves="1"
            seed="1"
            result="turbulence"
          />
          <feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurredNoise"
            scale="40"
            xChannelSelector="R"
            yChannelSelector="B"
            result="displaced"
          />
          <feGaussianBlur in="displaced" stdDeviation="1" result="finalBlur" />
          <feComposite in="finalBlur" in2="SourceGraphic" operator="over" />
        </filter>
      </defs>
    </svg>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [isIdle, setIsIdle] = useState(false);

  // Theme Transition Settings State
  const [showOptions, setShowOptions] = useState(false);
  const [variant, setVariant] = useState<AnimationVariant>("circle");
  const [start, setStart] = useState<AnimationStart>("center");
  const [blur, setBlur] = useState<boolean>(false);
  const gifUrl = "https://media.giphy.com/media/KBbr4hHl9DSahKvInO/giphy.gif?cid=790b76112m5eeeydoe7et0cr3j3ekb1erunxozyshuhxx2vl&ep=v1_stickers_search&rid=giphy.gif&ct=s";

  const [activeSection, setActiveSection] = useState("home");

  const lastScrollY = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Scroll active section tracking (offset-based calculation)
  useEffect(() => {
    const handleScrollActiveSection = () => {
      const sections = ["about", "projects", "experience", "tech-stack", "contact"];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      let currentSection = "home";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            currentSection = id;
          }
        }
      }

      // Fallback for bottom of the page
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
        currentSection = "contact";
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScrollActiveSection, { passive: true });
    handleScrollActiveSection(); // Run initially

    return () => window.removeEventListener("scroll", handleScrollActiveSection);
  }, []);

  const activeIdx = NAV_LINKS.findIndex((item) => item.href === `#${activeSection}`);
  const currentHighlightIdx =
    hoveredIdx !== null ? hoveredIdx : activeIdx !== -1 ? activeIdx : null;

  const currentLabel = activeSection ? activeSection.toUpperCase() : "EXPLORE";

  useEffect(() => {
    setIsIdle(false);
    
    const startIdleTimer = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setIsIdle(true), 2500); // 2.5 seconds
    };

    // Listen for loader completion
    window.addEventListener("loaderComplete", startIdleTimer);

    // Fallback in case loaderComplete is missed or doesn't run
    const fallbackTimer = setTimeout(startIdleTimer, 3500);

    return () => {
      window.removeEventListener("loaderComplete", startIdleTimer);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      clearTimeout(fallbackTimer);
    };
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsIdle(false);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHoveredIdx(null);
    timeoutRef.current = setTimeout(() => setIsIdle(true), 1200);
  };

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const target = e.target;
      let currentScrollY = 0;
      if (target instanceof Document) {
        currentScrollY = target.documentElement.scrollTop || window.scrollY;
      } else if (target instanceof HTMLElement) {
        currentScrollY = target.scrollTop;
      }
      setVisible(!(currentScrollY > lastScrollY.current && currentScrollY > 100));
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, true);
    return () => window.removeEventListener("scroll", handleScroll, true);
  }, []);

  return (
    <>
      <GlassFilter />
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: visible ? 0 : -100 }}
        transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
        className="fixed top-4 left-0 w-full px-6 lg:px-16 z-50 flex items-center justify-between"
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-shrink-0">
          <Link href="#home" className="flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-mono font-bold uppercase tracking-[0.2em] text-text-primary bg-bg-raised px-4 py-2 rounded-full border border-border-hairline">
              ND
            </span>
          </Link>
        </motion.div>

        {/* Center: Dynamic Island Morphing Container */}
        <motion.div
          layout
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          animate={{
            width: isIdle ? 180 : "auto",
            height: isIdle ? 40 : 54,
            paddingLeft: isIdle ? 16 : 8,
            paddingRight: isIdle ? 16 : 8,
            borderColor: isIdle
              ? "var(--border-hairline)"
              : "var(--border-hairline)",
            backgroundColor: isIdle
              ? "var(--bg-raised)"
              : "var(--bg-raised)",
            boxShadow: isIdle
              ? "0 4px 24px -4px rgba(0,0,0,0.18)"
              : "0 25px 50px -12px rgba(0,0,0,0.25)",
          }}
          transition={{ type: "spring", stiffness: 180, damping: 26, mass: 0.8 }}
          className="hidden lg:flex items-center border border-border-hairline rounded-full gap-1 relative overflow-hidden select-none"
        >
          <AnimatePresence>
            {isIdle ? (
              /* Idle — collapsed pill showing active section label */
              <motion.div
                key="idle-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center whitespace-nowrap cursor-pointer px-4"
              >
                <span className="text-[12px] font-mono tracking-[0.2em] uppercase font-bold text-text-primary text-center w-full block">
                  {currentLabel}
                </span>
              </motion.div>
            ) : (
              /* Expanded — full nav links */
              <motion.div
                key="expanded-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="flex flex-row flex-nowrap items-center gap-1 w-full h-full whitespace-nowrap"
              >
                {NAV_LINKS.map((item, idx) => {
                  if (item.label === "Contact") {
                    return (
                      <motion.div
                        key={item.label}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className="ml-2 shrink-0"
                      >
                        <Link
                          href={item.href}
                          onMouseEnter={() => setHoveredIdx(idx)}
                          className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider rounded-full whitespace-nowrap shadow-md transition-opacity hover:opacity-90"
                          style={{
                            background: "var(--text-primary)",
                            color: "var(--bg-base)",
                            padding: "9px 18px",
                          }}
                        >
                          Contact
                          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M7 17L17 7" />
                            <path d="M7 7h10v10" />
                          </svg>
                        </Link>
                      </motion.div>
                    );
                  }

                  const isHighlighted = currentHighlightIdx === idx;
                  return (
                    <div key={item.label} className="relative">
                      <Link
                        href={item.href}
                        onMouseEnter={() => setHoveredIdx(idx)}
                        className={`relative z-10 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-full transition-colors block whitespace-nowrap ${
                          isHighlighted ? "text-text-primary" : "text-text-muted hover:text-text-primary"
                        }`}
                      >
                        {item.label}
                      </Link>
                      {isHighlighted && (
                        <motion.div
                          layoutId="navHover"
                          className="absolute inset-0 rounded-full bg-slate-900/10 dark:bg-white/10 z-0"
                          style={{ backdropFilter: 'url("#container-glass")' }}
                          transition={{ type: "spring", stiffness: 350, damping: 28 }}
                        />
                      )}
                    </div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Right side controls: Theme toggles and mobile menu */}
        <div className="flex items-center gap-2">
          {/* Desktop Theme Controls */}
          <div className="hidden lg:flex items-center gap-2">
            <div
              onDoubleClick={() => setShowOptions(!showOptions)}
              className="cursor-pointer"
              title="Double-click to change transition settings"
            >
              <ThemeToggleButton
                variant={variant}
                start={start}
                blur={blur}
                gifUrl={gifUrl}
              />
            </div>
          </div>

          <button
            className="lg:hidden text-text-primary bg-bg-raised/90 p-2.5 rounded-full border border-border-hairline backdrop-blur-md hover:bg-bg-raised transition-colors shadow-md"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.nav>

      {/* Floating Options Panel */}
      <AnimatePresence>
        {showOptions && (
          <ThemeToggleOptions
            variant={variant}
            start={start}
            blur={blur}
            setVariant={setVariant}
            setStart={setStart}
            setBlur={setBlur}
            onClose={() => setShowOptions(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-4 top-20 z-40 lg:hidden rounded-3xl bg-bg-raised/95 border border-border-hairline p-6 flex flex-col gap-4 text-left shadow-2xl backdrop-blur-lg"
          >
            <div className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => {
                if (link.label === "Contact") {
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-center gap-1.5 px-6 py-[18px] mt-2 text-sm font-bold uppercase tracking-wider rounded-2xl whitespace-nowrap hover:opacity-90 transition-opacity shadow-md text-center"
                      style={{
                        background: "var(--text-primary)",
                        color: "var(--bg-base)",
                      }}
                    >
                      Contact
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17L17 7" />
                        <path d="M7 7h10v10" />
                      </svg>
                    </Link>
                  );
                }

                const isActive = activeSection === link.href.replace("#", "");
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`text-3xl font-medium uppercase tracking-wider py-2.5 px-4 rounded-xl transition-colors ${
                      isActive ? "bg-bg-base text-text-primary" : "text-text-muted hover:bg-bg-base/50 hover:text-text-primary"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              
              {/* Mobile Theme Controls */}
              <div className="flex items-center gap-3 border-t border-border-hairline pt-4 mt-2">
                <div
                  onDoubleClick={() => {
                    setOpen(false);
                    setShowOptions(true);
                  }}
                  className="cursor-pointer flex items-center gap-3 w-full"
                  title="Double-click to change transition settings"
                >
                  <ThemeToggleButton
                    variant={variant}
                    start={start}
                    blur={blur}
                    gifUrl={gifUrl}
                    onClick={() => setOpen(false)}
                  />
                  <span className="text-xs font-mono text-text-muted uppercase">Toggle Theme</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating 3D Fluid Glass Bottom Dock (Desktop Only) */}
      <div className="hidden lg:block fixed bottom-6 left-1/2 -translate-x-1/2 w-[600px] h-[100px] z-50 pointer-events-none">
        <FluidGlass
          mode="bar"
          barProps={{
            navItems: [
              { label: 'Home', link: '#home' },
              { label: 'Work', link: '#work' },
              { label: 'Services', link: '#services' },
              { label: 'About', link: '#about' },
              { label: 'Contact', link: '#contact' }
            ],
            scale: 0.16,
            thickness: 6,
            ior: 1.25,
            chromaticAberration: 0.18,
            anisotropy: 0.08
          }}
        />
      </div>
    </>
  );
}
