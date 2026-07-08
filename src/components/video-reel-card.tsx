"use client";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { HoverVideoPlayer } from "@/components/ui/hover-video-player";

export function VideoReelCard({
  videoSrc,
  thumbnailSrc,
  title,
}: {
  videoSrc: string;
  thumbnailSrc: string;
  title: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <div className="flex flex-col gap-4 w-full text-left">
      <motion.div
        animate={shouldReduceMotion ? "expanded" : "collapsed"}
        whileHover={shouldReduceMotion ? undefined : "expanded"}
        initial={false}
        className="flex aspect-video w-full items-center justify-center"
      >
        <motion.div
          variants={{ collapsed: { scale: 0.98 }, expanded: { scale: 1 } }}
          transition={{ type: "spring", duration: 0.42, bounce: 0 }}
          className={cn(
            "group relative flex flex-col overflow-hidden rounded-xl transform-gpu w-full h-full",
            "bg-[#12171D] ring-1 ring-white/[0.08]"
          )}
        >
          <HoverVideoPlayer
            videoSrc={videoSrc}
            thumbnailSrc={thumbnailSrc}
            enableControls
            style={{ width: "100%", height: "100%", aspectRatio: "16/9" }}
          />
        </motion.div>
      </motion.div>
      <p className="font-mono text-[10px] uppercase tracking-wider text-[#8B93A1]">{title}</p>
    </div>
  );
}
