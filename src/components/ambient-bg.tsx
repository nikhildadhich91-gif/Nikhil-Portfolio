import React from "react";
import { StripedPattern } from "@/components/ui/striped-pattern";

export function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 h-screen w-full overflow-hidden bg-bg-base">
      <StripedPattern className="text-black dark:text-white opacity-[0.03] dark:opacity-[0.06] [mask-image:radial-gradient(700px_circle_at_50%_0%,white,transparent)]" />
    </div>
  );
}
