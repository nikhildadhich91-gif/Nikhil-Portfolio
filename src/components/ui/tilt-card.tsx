"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Tilt } from "@/components/ui/tilt";

export interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  status?: "LIVE" | "IN PROGRESS" | "CASE STUDY";
  imageSrc?: string;
  imageAlt?: string;
  href?: string;
  accent?: "signal" | "ai";
}

const STATUS_CLASSES: Record<NonNullable<TiltCardProps["status"]>, string> = {
  LIVE: "bg-emerald-500/15 text-emerald-300",
  "IN PROGRESS": "bg-amber-500/20 text-amber-300",
  "CASE STUDY": "bg-sky-500/15 text-sky-300",
};

export function TiltCard({
  title,
  description,
  status = "LIVE",
  imageSrc,
  imageAlt = "",
  href,
  accent = "signal",
  className,
  ...props
}: TiltCardProps) {
  const accentColor = accent === "ai" ? "var(--accent-ai)" : "var(--accent-signal)";
  
  const inner = (
    <Tilt
      rotationFactor={9}
      className={cn(
        "relative group overflow-hidden bg-bg-raised border border-border-hairline rounded-2xl text-left",
        "flex flex-col gap-4 h-52 sm:h-56 md:h-60 w-full",
        "hover:shadow-2xl hover:scale-[1.02] transition-all duration-400 ease-out",
        className
      )}
      style={{ boxShadow: `0 0 0 1px var(--border-hairline)` }}
    >
      <div className="flex flex-row justify-between px-6 py-5">
        <div className="flex flex-col gap-1 flex-1 mr-2">
          <h3 className="text-lg font-display tracking-tight leading-tight text-text-primary">{title}</h3>
          {description && <p className="text-text-muted text-xs leading-relaxed mt-1">{description}</p>}
        </div>
        <span className={cn("h-fit rounded-full px-3 py-1 font-mono text-[9px] font-bold tracking-wider whitespace-nowrap", STATUS_CLASSES[status])}>
          {status}
        </span>
      </div>
      {imageSrc && (
        <img
          src={imageSrc}
          alt={imageAlt}
          loading="lazy"
          decoding="async"
          className="absolute z-10 top-24 w-72 -right-10 rotate-[-5deg] border border-border-hairline rounded-md transition-transform duration-300 ease-out group-hover:-rotate-3 group-hover:-translate-y-1"
        />
      )}
      <div
        className="pointer-events-none absolute -inset-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
        style={{ background: `radial-gradient(circle at 30% 30%, ${accentColor}22, transparent 60%)` }}
      />
    </Tilt>
  );

  if (href) {
    return (
      <a href={href} className="block cursor-pointer" {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {inner}
      </a>
    );
  }
  return <div {...props}>{inner}</div>;
}
