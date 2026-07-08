"use client";
import React, { useRef, useState, useEffect } from "react";

interface HoverVideoPlayerProps {
  videoSrc: string;
  thumbnailSrc: string;
  enableControls?: boolean;
  style?: React.CSSProperties;
}

export function HoverVideoPlayer({
  videoSrc,
  thumbnailSrc,
  enableControls = false,
  style,
}: HoverVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isHovered) {
      setIsLoading(true);
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsLoading(false);
          })
          .catch((error) => {
            console.log("Video playback interrupted:", error);
            setIsLoading(false);
          });
      }
    } else {
      video.pause();
      video.currentTime = 0;
      setIsLoading(false);
    }
  }, [isHovered]);

  return (
    <div
      className="relative w-full h-full cursor-pointer overflow-hidden rounded-xl bg-black"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={style}
    >
      {/* Thumbnail image shown when idle */}
      <img
        src={thumbnailSrc}
        alt="Video thumbnail"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 z-10 ${
          isHovered && !isLoading ? "opacity-0" : "opacity-100"
        }`}
      />
      {/* Loading overlay */}
      {isHovered && isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-20">
          <div className="w-6 h-6 border-2 border-[#FF8A3D] border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      {/* Actual video element */}
      <video
        ref={videoRef}
        src={videoSrc}
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
        controls={enableControls && isHovered}
      />
    </div>
  );
}
