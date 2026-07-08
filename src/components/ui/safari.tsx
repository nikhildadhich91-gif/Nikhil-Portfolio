"use client";
import React from "react";
import { cn } from "@/lib/utils";

interface SafariProps extends React.HTMLAttributes<HTMLDivElement> {
  url?: string;
  children?: React.ReactNode;
}

export function Safari({ url, children, className, ...props }: SafariProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border-hairline bg-white dark:bg-[#12171D] overflow-hidden shadow-2xl flex flex-col w-full aspect-[16/10]",
        className
      )}
      {...props}
    >
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-100/80 dark:bg-[#0A0E12]/80 border-b border-black/[0.06] dark:border-white/[0.05] shrink-0 select-none">
        {/* Left window actions */}
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56] opacity-80" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E] opacity-80" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F] opacity-80" />
        </div>
        {/* Address bar */}
        <div className="flex-1 max-w-md mx-4">
          <div className="bg-gray-200/60 dark:bg-[#12171D] border border-black/[0.06] dark:border-white/[0.06] rounded-md px-3 py-1 text-center font-mono text-[10px] text-gray-500 dark:text-[#8B93A1] truncate flex items-center justify-center gap-1.5">
            <svg className="w-3.5 h-3.5 opacity-60 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span className="truncate">{url || "localhost:3000"}</span>
          </div>
        </div>
        {/* Right side dummy spacer */}
        <div className="flex gap-1 opacity-0 w-[52px]" />
      </div>
      {/* Content wrapper */}
      <div className="flex-1 w-full relative overflow-hidden bg-gray-50 dark:bg-[#0A0E12]">
        {children}
      </div>
    </div>
  );
}
