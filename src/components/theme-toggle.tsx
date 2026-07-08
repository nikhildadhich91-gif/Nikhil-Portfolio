"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { GripHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type AnimationVariant =
  | "circle"
  | "rectangle"
  | "gif"
  | "polygon"
  | "circle-blur";

export type AnimationStart =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "center"
  | "top-center"
  | "bottom-center"
  | "bottom-up"
  | "top-down"
  | "left-right"
  | "right-left";

interface Animation {
  name: string;
  css: string;
}

const getPositionCoords = (position: AnimationStart) => {
  switch (position) {
    case "top-left":
      return { cx: "0", cy: "0" };
    case "top-right":
      return { cx: "40", cy: "0" };
    case "bottom-left":
      return { cx: "0", cy: "40" };
    case "bottom-right":
      return { cx: "40", cy: "40" };
    case "top-center":
      return { cx: "20", cy: "0" };
    case "bottom-center":
      return { cx: "20", cy: "40" };
    case "bottom-up":
    case "top-down":
    case "left-right":
    case "right-left":
      return { cx: "20", cy: "20" };
  }
};

const generateSVG = (variant: AnimationVariant, start: AnimationStart) => {
  if (variant === "circle-blur") {
    if (start === "center") {
      return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><defs><filter id="blur"><feGaussianBlur stdDeviation="2"/></filter></defs><circle cx="20" cy="20" r="18" fill="white" filter="url(%23blur)"/></svg>`;
    }
    const positionCoords = getPositionCoords(start);
    if (!positionCoords) return "";
    const { cx, cy } = positionCoords;
    return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><defs><filter id="blur"><feGaussianBlur stdDeviation="2"/></filter></defs><circle cx="${cx}" cy="${cy}" r="18" fill="white" filter="url(%23blur)"/></svg>`;
  }

  if (start === "center") return "";
  if (variant === "rectangle") return "";

  const positionCoords = getPositionCoords(start);
  if (!positionCoords) return "";
  const { cx, cy } = positionCoords;

  if (variant === "circle") {
    return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><circle cx="${cx}" cy="${cy}" r="20" fill="white"/></svg>`;
  }

  return "";
};

const getTransformOrigin = (start: AnimationStart) => {
  switch (start) {
    case "top-left":
      return "top left";
    case "top-right":
      return "top right";
    case "bottom-left":
      return "bottom left";
    case "bottom-right":
      return "bottom right";
    case "top-center":
      return "top center";
    case "bottom-center":
      return "bottom center";
    case "bottom-up":
    case "top-down":
    case "left-right":
    case "right-left":
      return "center";
  }
};

export const createAnimation = (
  variant: AnimationVariant,
  start: AnimationStart = "center",
  blur = false,
  url?: string,
): Animation => {
  const svg = generateSVG(variant, start);
  const transformOrigin = getTransformOrigin(start);

  if (variant === "rectangle") {
    const getClipPath = (direction: AnimationStart) => {
      switch (direction) {
        case "bottom-up":
          return {
            from: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          };
        case "top-down":
          return {
            from: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          };
        case "left-right":
          return {
            from: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
            to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          };
        case "right-left":
          return {
            from: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
            to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          };
        case "top-left":
          return {
            from: "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)",
            to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          };
        case "top-right":
          return {
            from: "polygon(100% 0%, 100% 0%, 100% 0%, 100% 0%)",
            to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          };
        case "bottom-left":
          return {
            from: "polygon(0% 100%, 0% 100%, 0% 100%, 0% 100%)",
            to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          };
        case "bottom-right":
          return {
            from: "polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%)",
            to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          };
        default:
          return {
            from: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          };
      }
    };

    const clipPath = getClipPath(start);

    return {
      name: `${variant}-${start}${blur ? "-blur" : ""}`,
      css: `
       ::view-transition-group(root) {
        animation-duration: 1.2s;
        animation-timing-function: var(--expo-out);
      }
            
      ::view-transition-new(root) {
        animation-name: reveal-light-${start}${blur ? "-blur" : ""};
        ${blur ? "filter: blur(2px);" : ""}
      }

      ::view-transition-old(root),
      .dark::view-transition-old(root) {
        animation: none;
        z-index: -1;
      }
      .dark::view-transition-new(root) {
        animation-name: reveal-dark-${start}${blur ? "-blur" : ""};
        ${blur ? "filter: blur(2px);" : ""}
      }

      @keyframes reveal-dark-${start}${blur ? "-blur" : ""} {
        from {
          clip-path: ${clipPath.from};
          ${blur ? "filter: blur(8px);" : ""}
        }
        ${blur ? "50% { filter: blur(4px); }" : ""}
        to {
          clip-path: ${clipPath.to};
          ${blur ? "filter: blur(0px);" : ""}
        }
      }

      @keyframes reveal-light-${start}${blur ? "-blur" : ""} {
        from {
          clip-path: ${clipPath.from};
          ${blur ? "filter: blur(8px);" : ""}
        }
        ${blur ? "50% { filter: blur(4px); }" : ""}
        to {
          clip-path: ${clipPath.to};
          ${blur ? "filter: blur(0px);" : ""}
        }
      }
      `,
    };
  }
  if (variant === "circle" && start === "center") {
    return {
      name: `${variant}-${start}${blur ? "-blur" : ""}`,
      css: `
       ::view-transition-group(root) {
        animation-duration: 1.2s;
        animation-timing-function: var(--expo-out);
      }
            
      ::view-transition-new(root) {
        animation-name: reveal-light${blur ? "-blur" : ""};
        ${blur ? "filter: blur(2px);" : ""}
      }

      ::view-transition-old(root),
      .dark::view-transition-old(root) {
        animation: none;
        z-index: -1;
      }
      .dark::view-transition-new(root) {
        animation-name: reveal-dark${blur ? "-blur" : ""};
        ${blur ? "filter: blur(2px);" : ""}
      }

      @keyframes reveal-dark${blur ? "-blur" : ""} {
        from {
          clip-path: circle(0% at 50% 50%);
          ${blur ? "filter: blur(8px);" : ""}
        }
        ${blur ? "50% { filter: blur(4px); }" : ""}
        to {
          clip-path: circle(100.0% at 50% 50%);
          ${blur ? "filter: blur(0px);" : ""}
        }
      }

      @keyframes reveal-light${blur ? "-blur" : ""} {
        from {
           clip-path: circle(0% at 50% 50%);
           ${blur ? "filter: blur(8px);" : ""}
        }
        ${blur ? "50% { filter: blur(4px); }" : ""}
        to {
          clip-path: circle(100.0% at 50% 50%);
          ${blur ? "filter: blur(0px);" : ""}
        }
      }
      `,
    };
  }
  if (variant === "gif") {
    return {
      name: `${variant}-${start}`,
      css: `
      ::view-transition-group(root) {
        animation-timing-function: var(--expo-in);
      }

      ::view-transition-new(root) {
        mask: url('${url}') center / 0 no-repeat;
        animation: scale 3s;
      }

      ::view-transition-old(root),
      .dark::view-transition-old(root) {
        animation: scale 3s;
      }

      @keyframes scale {
        0% {
          mask-size: 0;
        }
        10% {
          mask-size: 50vmax;
        }
        90% {
          mask-size: 50vmax;
        }
        100% {
          mask-size: 2000vmax;
        }
      }`,
    };
  }

  if (variant === "circle-blur") {
    if (start === "center") {
      return {
        name: `${variant}-${start}`,
        css: `
        ::view-transition-group(root) {
          animation-timing-function: var(--expo-out);
        }

         ::view-transition-new(root) {
          mask: url('${svg}') center / 0 no-repeat;
          mask-origin: content-box;
          animation: scale 1.6s;
          transform-origin: center;
        }

        ::view-transition-old(root),
        .dark::view-transition-old(root) {
          animation: scale 1.6s;
          transform-origin: center;
          z-index: -1;
        }

        @keyframes scale {
          to {
            mask-size: 350vmax;
          }
        }
        `,
      };
    }

    return {
      name: `${variant}-${start}`,
      css: `
      ::view-transition-group(root) {
        animation-timing-function: var(--expo-out);
      }

      ::view-transition-new(root) {
        mask: url('${svg}') ${start.replace("-", " ")} / 0 no-repeat;
        mask-origin: content-box;
        animation: scale 1.6s;
        transform-origin: ${transformOrigin};
      }

      ::view-transition-old(root),
      .dark::view-transition-old(root) {
        animation: scale 1.6s;
        transform-origin: ${transformOrigin};
        z-index: -1;
      }

      @keyframes scale {
        to {
          mask-size: 350vmax;
        }
      }
      `,
    };
  }

  if (variant === "polygon") {
    const getPolygonClipPaths = (position: AnimationStart) => {
      switch (position) {
        case "top-left":
          return {
            darkFrom: "polygon(50% -71%, -50% 71%, -50% 71%, 50% -71%)",
            darkTo: "polygon(50% -71%, -50% 71%, 50% 171%, 171% 50%)",
            lightFrom: "polygon(171% 50%, 50% 171%, 50% 171%, 171% 50%)",
            lightTo: "polygon(171% 50%, 50% 171%, -50% 71%, 50% -71%)",
          };
        case "top-right":
          return {
            darkFrom: "polygon(150% -71%, 250% 71%, 250% 71%, 150% -71%)",
            darkTo: "polygon(150% -71%, 250% 71%, 50% 171%, -71% 50%)",
            lightFrom: "polygon(-71% 50%, 50% 171%, 50% 171%, -71% 50%)",
            lightTo: "polygon(-71% 50%, 50% 171%, 250% 71%, 150% -71%)",
          };
        default:
          return {
            darkFrom: "polygon(50% -71%, -50% 71%, -50% 71%, 50% -71%)",
            darkTo: "polygon(50% -71%, -50% 71%, 50% 171%, 171% 50%)",
            lightFrom: "polygon(171% 50%, 50% 171%, 50% 171%, 171% 50%)",
            lightTo: "polygon(171% 50%, 50% 171%, -50% 71%, 50% -71%)",
          };
      }
    };

    const clipPaths = getPolygonClipPaths(start);

    return {
      name: `${variant}-${start}${blur ? "-blur" : ""}`,
      css: `
      ::view-transition-group(root) {
        animation-duration: 1.2s;
        animation-timing-function: var(--expo-out);
      }
            
      ::view-transition-new(root) {
        animation-name: reveal-light-${start}${blur ? "-blur" : ""};
        ${blur ? "filter: blur(2px);" : ""}
      }

      ::view-transition-old(root),
      .dark::view-transition-old(root) {
        animation: none;
        z-index: -1;
      }
      .dark::view-transition-new(root) {
        animation-name: reveal-dark-${start}${blur ? "-blur" : ""};
        ${blur ? "filter: blur(2px);" : ""}
      }

      @keyframes reveal-dark-${start}${blur ? "-blur" : ""} {
        from {
          clip-path: ${clipPaths.darkFrom};
          ${blur ? "filter: blur(8px);" : ""}
        }
        ${blur ? "50% { filter: blur(4px); }" : ""}
        to {
          clip-path: ${clipPaths.darkTo};
          ${blur ? "filter: blur(0px);" : ""}
        }
      }

      @keyframes reveal-light-${start}${blur ? "-blur" : ""} {
        from {
          clip-path: ${clipPaths.lightFrom};
          ${blur ? "filter: blur(8px);" : ""}
        }
        ${blur ? "50% { filter: blur(4px); }" : ""}
        to {
          clip-path: ${clipPaths.lightTo};
          ${blur ? "filter: blur(0px);" : ""}
        }
      }
      `,
    };
  }

  if (variant === "circle" && start !== "center") {
    const getClipPathPosition = (position: AnimationStart) => {
      switch (position) {
        case "top-left":
          return "0% 0%";
        case "top-right":
          return "100% 0%";
        case "bottom-left":
          return "0% 100%";
        case "bottom-right":
          return "100% 100%";
        case "top-center":
          return "50% 0%";
        case "bottom-center":
          return "50% 100%";
        default:
          return "50% 50%";
      }
    };

    const clipPosition = getClipPathPosition(start);

    return {
      name: `${variant}-${start}${blur ? "-blur" : ""}`,
      css: `
       ::view-transition-group(root) {
        animation-duration: 1.5s;
        animation-timing-function: var(--expo-out);
      }
            
      ::view-transition-new(root) {
        animation-name: reveal-light-${start}${blur ? "-blur" : ""};
        ${blur ? "filter: blur(2px);" : ""}
      }

      ::view-transition-old(root),
      .dark::view-transition-old(root) {
        animation: none;
        z-index: -1;
      }
      .dark::view-transition-new(root) {
        animation-name: reveal-dark-${start}${blur ? "-blur" : ""};
        ${blur ? "filter: blur(2px);" : ""}
      }

      @keyframes reveal-dark-${start}${blur ? "-blur" : ""} {
        from {
          clip-path: circle(0% at ${clipPosition});
          ${blur ? "filter: blur(8px);" : ""}
        }
        ${blur ? "50% { filter: blur(4px); }" : ""}
        to {
          clip-path: circle(150.0% at ${clipPosition});
          ${blur ? "filter: blur(0px);" : ""}
        }
      }

      @keyframes reveal-light-${start}${blur ? "-blur" : ""} {
        from {
           clip-path: circle(0% at ${clipPosition});
           ${blur ? "filter: blur(8px);" : ""}
        }
        ${blur ? "50% { filter: blur(4px); }" : ""}
        to {
          clip-path: circle(150.0% at ${clipPosition});
          ${blur ? "filter: blur(0px);" : ""}
        }
      }
      `,
    };
  }

  return {
    name: `${variant}-${start}${blur ? "-blur" : ""}`,
    css: `
      ::view-transition-group(root) {
        animation-timing-function: var(--expo-in);
      }
      ::view-transition-new(root) {
        mask: url('${svg}') ${start.replace("-", " ")} / 0 no-repeat;
        mask-origin: content-box;
        animation: scale-${start}${blur ? "-blur" : ""} 1.6s;
        transform-origin: ${transformOrigin};
        ${blur ? "filter: blur(2px);" : ""}
      }
      ::view-transition-old(root),
      .dark::view-transition-old(root) {
        animation: scale-${start}${blur ? "-blur" : ""} 1.6s;
        transform-origin: ${transformOrigin};
        z-index: -1;
      }
      @keyframes scale-${start}${blur ? "-blur" : ""} {
        from {
          ${blur ? "filter: blur(8px);" : ""}
        }
        ${blur ? "50% { filter: blur(4px); }" : ""}
        to {
          mask-size: 2000vmax;
          ${blur ? "filter: blur(0px);" : ""}
        }
      }
    `,
  };
};

const updateStyles = (css: string) => {
  if (typeof window === "undefined") return;
  const styleId = "theme-transition-styles";
  let styleElement = document.getElementById(styleId) as HTMLStyleElement;

  if (!styleElement) {
    styleElement = document.createElement("style");
    styleElement.id = styleId;
    document.head.appendChild(styleElement);
  }

  styleElement.textContent = css;
};

// Hook for custom theme toggle state
export const useThemeToggle = ({
  variant = "circle",
  start = "center",
  blur = false,
  gifUrl = "",
}: {
  variant?: AnimationVariant;
  start?: AnimationStart;
  blur?: boolean;
  gifUrl?: string;
} = {}) => {
  const [isDark, setIsDark] = useState(true);

  // Sync state with HTML class list on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isCurrentlyDark = document.documentElement.classList.contains("dark");
      setIsDark(isCurrentlyDark);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    const nextDark = !isDark;
    const animation = createAnimation(variant, start, blur, gifUrl);
    updateStyles(animation.css);

    const switchTheme = () => {
      if (nextDark) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
        setIsDark(true);
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
        setIsDark(false);
      }
    };

    if (typeof window === "undefined" || !document.startViewTransition) {
      switchTheme();
      return;
    }

    document.startViewTransition(switchTheme);
  }, [isDark, variant, start, blur, gifUrl]);

  return {
    isDark,
    toggleTheme,
  };
};

export const ThemeToggleButton = ({
  className = "",
  variant = "circle",
  start = "center",
  blur = false,
  gifUrl = "",
  onClick,
}: {
  className?: string;
  variant?: AnimationVariant;
  start?: AnimationStart;
  blur?: boolean;
  gifUrl?: string;
  onClick?: () => void;
}) => {
  const { isDark, toggleTheme } = useThemeToggle({
    variant,
    start,
    blur,
    gifUrl,
  });

  const handleToggle = () => {
    toggleTheme();
    if (onClick) onClick();
  };

  return (
    <button
      type="button"
      className={cn(
        "size-10 cursor-pointer rounded-full bg-bg-raised border border-border-hairline p-2 transition-all duration-300 active:scale-95 flex items-center justify-center text-text-primary hover:bg-bg-raised/80 hover:text-accent-signal",
        className,
      )}
      onClick={handleToggle}
      aria-label="Toggle theme"
    >
      <span className="sr-only">Toggle theme</span>
      <svg viewBox="0 0 240 240" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <motion.g
          animate={{ rotate: isDark ? -180 : 0 }}
          transition={{ ease: "easeInOut", duration: 0.5 }}
        >
          <path
            d="M120 67.5C149.25 67.5 172.5 90.75 172.5 120C172.5 149.25 149.25 172.5 120 172.5"
            fill="currentColor"
          />
          <path
            d="M120 67.5C90.75 67.5 67.5 90.75 67.5 120C67.5 149.25 90.75 172.5 120 172.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="10"
          />
        </motion.g>
        <motion.path
          animate={{ rotate: isDark ? 180 : 0 }}
          transition={{ ease: "easeInOut", duration: 0.5 }}
          d="M120 3.75C55.5 3.75 3.75 55.5 3.75 120C3.75 184.5 55.5 236.25 120 236.25C184.5 236.25 236.25 184.5 236.25 120C236.25 55.5 184.5 3.75 120 3.75ZM120 214.5V172.5C90.75 172.5 67.5 149.25 67.5 120C67.5 90.75 90.75 67.5 120 67.5V25.5C172.5 25.5 214.5 67.5 214.5 120C214.5 172.5 172.5 214.5 120 214.5Z"
          fill="currentColor"
        />
      </svg>
    </button>
  );
};

export const ThemeToggleOptions = ({
  variant,
  start,
  blur,
  setVariant,
  setStart,
  setBlur,
  onClose,
}: {
  variant: AnimationVariant;
  start: AnimationStart;
  blur: boolean;
  setVariant: (variant: AnimationVariant) => void;
  setStart: (start: AnimationStart) => void;
  setBlur: (blur: boolean) => void;
  onClose?: () => void;
}) => {
  return (
    <motion.div
      drag
      dragMomentum={false}
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 10 }}
      className="fixed z-50 top-20 right-6 md:right-16 flex w-[265px] flex-col gap-3 rounded-2xl border border-border-hairline bg-bg-raised/95 p-4 backdrop-blur-md shadow-2xl text-text-primary select-none cursor-default font-sans"
    >
      <div className="flex items-center justify-between border-b border-border-hairline pb-2 mb-1">
        <span className="size-4 cursor-grab active:cursor-grabbing text-text-muted flex items-center justify-center">
          <GripHorizontal className="size-4 opacity-60 hover:opacity-100" />
        </span>
        <p className="text-[10px] font-mono uppercase tracking-wider text-text-muted font-bold">
          Transition Settings
        </p>
        <button
          onClick={onClose}
          className="p-1 rounded hover:bg-bg-base/50 text-text-muted hover:text-text-primary transition-colors cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex flex-col gap-2 font-mono text-[10px]">
        {/* Variant */}
        <div className="flex justify-between items-center py-1">
          <span className="text-text-muted uppercase font-bold w-16">variant :</span>
          <div className="flex flex-wrap items-center justify-end gap-1.5 flex-1">
            {(["circle", "rectangle", "gif", "polygon", "circle-blur"] as AnimationVariant[]).map((v) => (
              <button
                key={v}
                onClick={() => setVariant(v)}
                className={cn(
                  "cursor-pointer px-1.5 py-0.5 rounded transition-all",
                  variant === v
                    ? "bg-[#FF8A3D]/20 text-[#FF8A3D] font-bold"
                    : "text-text-muted hover:text-text-primary hover:bg-bg-base/30"
                )}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Blur */}
        <div className="flex justify-between items-center py-1">
          <span className="text-text-muted uppercase font-bold w-16">blur :</span>
          <div className="flex items-center justify-end gap-1.5 flex-1">
            <button
              onClick={() => setBlur(false)}
              className={cn(
                "cursor-pointer px-1.5 py-0.5 rounded transition-all",
                !blur
                  ? "bg-[#FF8A3D]/20 text-[#FF8A3D] font-bold"
                  : "text-text-muted hover:text-text-primary hover:bg-bg-base/30"
              )}
            >
              off
            </button>
            <button
              onClick={() => setBlur(true)}
              className={cn(
                "cursor-pointer px-1.5 py-0.5 rounded transition-all",
                blur
                  ? "bg-[#FF8A3D]/20 text-[#FF8A3D] font-bold"
                  : "text-text-muted hover:text-text-primary hover:bg-bg-base/30"
              )}
            >
              on
            </button>
          </div>
        </div>

        {/* Start Position */}
        {(variant === "circle" ||
          variant === "rectangle" ||
          variant === "polygon" ||
          variant === "circle-blur") && (
          <div className="flex flex-col gap-1.5 py-1">
            <span className="text-text-muted uppercase font-bold">start direction :</span>
            <div className="flex flex-wrap items-center justify-start gap-1">
              {(variant === "circle" || variant === "circle-blur") && (
                <button
                  onClick={() => setStart("center")}
                  className={cn(
                    "cursor-pointer px-1.5 py-0.5 rounded transition-all",
                    start === "center"
                      ? "bg-[#FF8A3D]/20 text-[#FF8A3D] font-bold"
                      : "text-text-muted hover:text-text-primary hover:bg-bg-base/30"
                  )}
                >
                  center
                </button>
              )}

              {variant === "rectangle" && (
                <>
                  {(["bottom-up", "top-down", "left-right", "right-left"] as AnimationStart[]).map((d) => (
                    <button
                      key={d}
                      onClick={() => setStart(d)}
                      className={cn(
                        "cursor-pointer px-1.5 py-0.5 rounded transition-all",
                        start === d
                          ? "bg-[#FF8A3D]/20 text-[#FF8A3D] font-bold"
                          : "text-text-muted hover:text-text-primary hover:bg-bg-base/30"
                      )}
                    >
                      {d}
                    </button>
                  ))}
                </>
              )}

              {(variant === "circle" ||
                variant === "polygon" ||
                variant === "circle-blur") && (
                <>
                  {(["top-left", "top-right"] as AnimationStart[]).map((d) => (
                    <button
                      key={d}
                      onClick={() => setStart(d)}
                      className={cn(
                        "cursor-pointer px-1.5 py-0.5 rounded transition-all",
                        start === d
                          ? "bg-[#FF8A3D]/20 text-[#FF8A3D] font-bold"
                          : "text-text-muted hover:text-text-primary hover:bg-bg-base/30"
                      )}
                    >
                      {d}
                    </button>
                  ))}
                  {variant !== "polygon" && (
                    <>
                      {(["bottom-left", "bottom-right"] as AnimationStart[]).map((d) => (
                        <button
                          key={d}
                          onClick={() => setStart(d)}
                          className={cn(
                            "cursor-pointer px-1.5 py-0.5 rounded transition-all",
                            start === d
                              ? "bg-[#FF8A3D]/20 text-[#FF8A3D] font-bold"
                              : "text-text-muted hover:text-text-primary hover:bg-bg-base/30"
                          )}
                        >
                          {d}
                        </button>
                      ))}
                    </>
                  )}
                </>
              )}

              {(variant === "circle" || variant === "circle-blur") && (
                <>
                  {(["top-center", "bottom-center"] as AnimationStart[]).map((d) => (
                    <button
                      key={d}
                      onClick={() => setStart(d)}
                      className={cn(
                        "cursor-pointer px-1.5 py-0.5 rounded transition-all",
                        start === d
                          ? "bg-[#FF8A3D]/20 text-[#FF8A3D] font-bold"
                          : "text-text-muted hover:text-text-primary hover:bg-bg-base/30"
                      )}
                    >
                      {d}
                    </button>
                  ))}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
