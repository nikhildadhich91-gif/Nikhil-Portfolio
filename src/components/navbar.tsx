"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

import { ThemeToggleButton, ThemeToggleOptions, AnimationVariant, AnimationStart } from "@/components/theme-toggle";

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
      const sections = ["home", "work", "services", "about", "contact"];
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
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsIdle(true), 2200);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
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

        <motion.div
          layout
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          animate={{
            width: isIdle ? 180 : "auto",
            height: isIdle ? 40 : 54,
            paddingLeft: isIdle ? 16 : 8,
            paddingRight: isIdle ? 16 : 8,
            borderColor: isIdle ? "var(--border-hairline)" : "var(--border-hairline)",
            backgroundColor: isIdle ? "var(--bg-base)" : "var(--bg-raised)",
          }}
          transition={{ type: "spring", stiffness: 180, damping: 26, mass: 0.8 }}
          className="hidden lg:flex items-center border border-border-hairline rounded-full gap-1 shadow-2xl backdrop-blur-md relative overflow-hidden select-none"
        >
          <AnimatePresence>
            {isIdle ? (
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
              <motion.div
                key="expanded-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-row flex-nowrap items-center gap-1 w-full h-full whitespace-nowrap"
              >
                {NAV_LINKS.map((item, idx) => {
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
                          className="absolute inset-0 bg-text-primary/10 rounded-full z-0"
                          transition={{ type: "spring", stiffness: 350, damping: 28 }}
                        />
                      )}
                    </div>
                  );
                })}
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="ml-2 relative z-10">
                  <Link
                    href="#contact"
                    className="flex items-center gap-1.5 bg-text-primary text-bg-base px-4.5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-full whitespace-nowrap hover:opacity-90 transition-opacity shadow-md"
                  >
                    Let&apos;s Talk
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17L17 7" />
                      <path d="M7 7h10v10" />
                    </svg>
                  </Link>
                </motion.div>
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
    </>
  );
}
