"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Safari } from "@/components/ui/safari";

const LIVE_SITES = [
  {
    label: "Bitwise Consulting",
    url: "bitwise-ag.vercel.app",
    src: "https://bitwise-ag.vercel.app/",
    originalUrl: "https://bitwise-ag.vercel.app/",
  },
  {
    label: "Utkarsh Builder",
    url: "utkarsh-builder-production.up.railway.app",
    src: "https://utkarsh-builder-production.up.railway.app/",
    originalUrl: "https://utkarsh-builder-production.up.railway.app/",
  },
];

export function LiveSitePreview() {
  const [active, setActive] = useState(0);
  const [iframeLoading, setIframeLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const logTimerRef = useRef<NodeJS.Timeout | null>(null);

  const site = LIVE_SITES[active];

  // Reset loading and trigger animations when active site changes
  useEffect(() => {
    setIframeLoading(true);
    setLoadingProgress(0);
    setTerminalLogs([]);

    // Simulate progress bar filling up slowly until iframe loads
    if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    progressTimerRef.current = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 85) return prev; // cap at 85% until fully loaded
        return prev + Math.floor(Math.random() * 8) + 4;
      });
    }, 150);

    // Terminal log animation simulation
    const logs = [
      "Connecting to secure host...",
      "Resolving DNS handshake...",
      "Establishing sandboxed iframe tunnel...",
      "Injecting layout resources...",
      "Preparing active workspace..."
    ];
    
    let logIdx = 0;
    if (logTimerRef.current) clearInterval(logTimerRef.current);
    logTimerRef.current = setInterval(() => {
      if (logIdx < logs.length) {
        setTerminalLogs((prev) => [...prev, `[LOG] ${logs[logIdx]}`]);
        logIdx++;
      } else {
        if (logTimerRef.current) clearInterval(logTimerRef.current);
      }
    }, 250);

    return () => {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      if (logTimerRef.current) clearInterval(logTimerRef.current);
    };
  }, [active]);

  const handleLoadComplete = () => {
    if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    setLoadingProgress(100);
    setTimeout(() => {
      setIframeLoading(false);
    }, 300); // minor delay for transition satisfaction
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full font-sans">
      <div className="relative w-full max-w-[1100px] border border-border-hairline rounded-2xl p-1 bg-bg-raised/40 backdrop-blur-md shadow-3xl">
        <Safari url={site.url} className="w-full">
          <div className="w-full h-full min-h-[350px] sm:min-h-[450px] md:min-h-[500px] absolute inset-0 bg-white dark:bg-bg-base overflow-hidden">
            
            {/* Live iframe */}
            <iframe
              src={site.src}
              className="w-full h-full border-0 pointer-events-auto absolute inset-0 bg-white dark:bg-bg-base z-10"
              title={site.label}
              onLoad={handleLoadComplete}
            />

            {/* Preloader Overlay Screen */}
            <AnimatePresence>
              {iframeLoading && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 bg-white dark:bg-bg-base z-20 flex flex-col items-center justify-center p-6 sm:p-12"
                >
                  <div className="w-full max-w-md flex flex-col gap-6 text-left">
                    {/* Fake Loading Terminal */}
                    <div className="w-full bg-gray-100 dark:bg-[#05070a] border border-gray-200 dark:border-[#1a202c] rounded-lg p-4 font-mono text-[10px] text-emerald-600 dark:text-emerald-400 min-h-[140px] flex flex-col gap-1.5 shadow-inner">
                      <div className="flex items-center gap-1.5 border-b border-gray-200 dark:border-[#1a202c] pb-2 mb-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
                        <span className="text-[8px] text-gray-500 dark:text-text-muted/60 ml-2 uppercase tracking-wider">Site Sandbox Loader</span>
                      </div>
                      
                      {terminalLogs.map((log, i) => (
                        <div key={i} className="leading-normal animate-pulse">
                          {log}
                        </div>
                      ))}
                      
                      <div className="flex items-center gap-1 mt-auto">
                        <span className="animate-ping w-1 h-3 bg-emerald-600 dark:bg-emerald-400 inline-block" />
                        <span className="text-gray-400 dark:text-text-muted/40">awaiting response...</span>
                      </div>
                    </div>

                    {/* Progress Bar Container */}
                    <div className="space-y-2">
                      <div className="flex justify-between font-mono text-[9px] text-gray-500 dark:text-text-muted uppercase tracking-wider font-bold">
                        <span>CONNECTING SECURE TUNNEL</span>
                        <span>{loadingProgress}%</span>
                      </div>
                      <div className="w-full h-1 bg-gray-200 dark:bg-[#1a202c] rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-text-primary"
                          initial={{ width: "0%" }}
                          animate={{ width: `${loadingProgress}%` }}
                          transition={{ duration: 0.2 }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Float Overlay helper */}
            <div className="absolute bottom-4 right-4 z-30 pointer-events-auto">
              <a
                href={site.originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 bg-bg-raised border border-border-hairline hover:border-text-primary text-xs font-mono px-3.5 py-2 rounded-full text-text-muted hover:text-text-primary transition-all shadow-xl"
              >
                Open Live
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>
          </div>
        </Safari>
      </div>

      <div className="flex gap-3 relative z-30">
        {LIVE_SITES.map((s, i) => (
          <button
            key={s.url}
            onClick={() => setActive(i)}
            className={`font-mono text-[11px] uppercase tracking-wider px-4 py-2 rounded-full border transition-all cursor-pointer ${
              i === active
                ? "border-text-primary text-text-primary bg-text-primary/10 font-bold"
                : "border-border-hairline text-text-muted hover:text-text-primary hover:border-text-muted"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
