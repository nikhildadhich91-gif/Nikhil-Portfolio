import React from "react";
import { cn } from "@/lib/utils";

interface StripedPatternProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export function StripedPattern({ className, ...props }: StripedPatternProps) {
  return (
    <svg
      className={cn("absolute inset-0 h-full w-full", className)}
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <pattern
          id="striped-pattern"
          width="30"
          height="30"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="30"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#striped-pattern)" />
    </svg>
  );
}
