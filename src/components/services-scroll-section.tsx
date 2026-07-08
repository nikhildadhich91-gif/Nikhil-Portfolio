"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EdgeBlur } from "@/components/ui/edge-blur";
import { SERVICES_DATA } from "@/lib/services-data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Flatten the services record into an ordered list
const SERVICES_LIST = Object.values(SERVICES_DATA).map((s, i) => ({
  num: String(i + 1).padStart(2, "0"),
  title: s.title,
  desc: s.description,
  tech: s.techTags ?? [],
  accent: s.accent === "signal" ? "#FF6B35" : s.accent === "violet" ? "#8B5CF6" : s.accent === "amber" ? "#F59E0B" : "#64748B",
}));

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export function ServicesScrollSection() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const scrollWindowRef = useRef<HTMLDivElement>(null);
  const listWrapperRef = useRef<HTMLDivElement>(null);
  const pinnedContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !triggerRef.current ||
      !scrollWindowRef.current ||
      !listWrapperRef.current ||
      !pinnedContentRef.current
    ) return;

    const ctx = gsap.context(() => {
      const calculateScroll = () => {
        const windowHeight = scrollWindowRef.current!.clientHeight;
        const listHeight = listWrapperRef.current!.scrollHeight;
        return Math.max(0, listHeight - windowHeight);
      };

      let scrollDistance = calculateScroll();

      const update3DEffects = () => {
        if (!scrollWindowRef.current || !listWrapperRef.current) return;
        const containerRect = scrollWindowRef.current.getBoundingClientRect();
        const containerCenter = containerRect.top + containerRect.height / 2;
        const containerHeight = containerRect.height;
        const items = listWrapperRef.current.querySelectorAll(".service-item-card");

        items.forEach((item) => {
          const rect = item.getBoundingClientRect();
          const itemCenter = rect.top + rect.height / 2;

          const dist = (itemCenter - containerCenter) / (containerHeight / 2);
          const clampedDist = Math.min(1.2, Math.max(-1.2, dist));
          const absDist = Math.abs(clampedDist);

          const scale = 1 - absDist * 0.08;
          const rotateX = -clampedDist * 12;
          const opacity = 1 - absDist * 0.55;

          const htmlItem = item as HTMLElement;
          htmlItem.style.transform = `perspective(1200px) rotateX(${rotateX}deg) scale(${scale})`;
          htmlItem.style.transformStyle = "preserve-3d";
          htmlItem.style.opacity = `${Math.max(0.2, opacity)}`;
        });
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          pin: pinnedContentRef.current,
          pinSpacing: true,
          invalidateOnRefresh: true,
          onUpdate: update3DEffects,
          onRefresh: update3DEffects,
        },
      });

      if (scrollDistance > 0) {
        tl.to(listWrapperRef.current, {
          y: -scrollDistance,
          ease: "none",
          onUpdate: update3DEffects,
        });
      }

      setTimeout(update3DEffects, 100);

      const handleResize = () => {
        scrollDistance = calculateScroll();
        ScrollTrigger.refresh();
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" className="w-full border-t border-border-hairline">
      {/* 1. Trigger: defines how long we scroll through the pinned section */}
      <div
        ref={triggerRef}
        style={{ height: `${Math.max(240, SERVICES_LIST.length * 30)}vh` }}
        className="relative w-full"
      >
        {/* 2. Pinned container — stays fixed while trigger scrolls */}
        <div
          ref={pinnedContentRef}
          className="h-screen w-full overflow-hidden flex flex-col justify-start py-10 md:py-16 relative"
        >
          {/* Section header */}
          <div className="max-w-5xl mx-auto px-6 lg:px-16 w-full shrink-0">
            <div className="text-center mb-6 md:mb-10 select-none">
              <span className="font-mono text-xs uppercase tracking-widest text-text-muted mb-2 block">
                THE COMPETENCIES
              </span>
              <h2 className="text-3xl sm:text-4xl font-display text-text-primary font-bold">
                Core Engineering Capabilities
              </h2>
              <p className="text-text-muted mt-4 text-xs sm:text-sm max-w-md mx-auto">
                I don&apos;t sell consulting packages; I ship working software.
                Each service represents an active engineering domain I build in daily.
              </p>
            </div>
          </div>

          {/* 3. Scroll window — masks the moving list */}
          <div
            ref={scrollWindowRef}
            className="relative overflow-hidden w-full flex-1 border-t border-b border-border-hairline"
          >
            {/* 4. Translated list wrapper — GSAP moves this up as you scroll */}
            <div
              ref={listWrapperRef}
              className="relative z-0 max-w-5xl mx-auto px-6 lg:px-16 py-6 pb-20 pt-8"
            >
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "50px" }}
                variants={{
                  hidden: {},
                  show: {
                    transition: {
                      delayChildren: 0,
                      staggerChildren: 0.12,
                    },
                  },
                }}
                className="flex flex-col border-t border-border-hairline"
              >
                {SERVICES_LIST.map((srv) => (
                  <motion.div
                    key={srv.num}
                    variants={itemVariants}
                    transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                    className="service-item-card py-8 md:py-12 border-b border-border-hairline flex flex-col md:flex-row items-start gap-6 md:gap-12 group hover:bg-bg-raised/20 transition-colors duration-300 px-3 md:px-4 rounded-xl text-left"
                    style={{ willChange: "transform, opacity" }}
                  >
                    {/* Index Number */}
                    <div className="w-14 md:w-28 shrink-0 select-none">
                      <span
                        className="text-3xl md:text-6xl font-light font-display opacity-20 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ color: srv.accent }}
                      >
                        {srv.num}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-3 md:space-y-4">
                      <h3 className="text-xl md:text-2xl font-bold font-display text-text-primary group-hover:text-text-primary transition-colors">
                        {srv.title}
                      </h3>
                      <p className="text-text-muted text-xs sm:text-sm leading-relaxed max-w-3xl">
                        {srv.desc}
                      </p>
                      {/* Tech Badges */}
                      {srv.tech.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-1">
                          {srv.tech.map((t) => (
                            <span
                              key={t}
                              className="font-mono text-[9px] uppercase tracking-wider px-2.5 py-1 rounded bg-bg-raised border border-border-hairline text-text-muted"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Edge fade blurs */}
            <EdgeBlur position="top" height={70} />
            <EdgeBlur position="bottom" height={90} />
          </div>
        </div>
      </div>
    </section>
  );
}
