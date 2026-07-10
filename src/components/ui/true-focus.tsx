'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './true-focus.css';

interface TrueFocusProps {
  sentence?: string;
  separator?: string;
  manualMode?: boolean;
  blurAmount?: number;
  borderColor?: string;
  glowColor?: string;
  animationDuration?: number;
  pauseBetweenAnimations?: number;
  onClick?: () => void;
  specialLoadMode?: boolean;
  startTrigger?: boolean;
  onComplete?: () => void;
}

const TrueFocus: React.FC<TrueFocusProps> = ({
  sentence = 'True Focus',
  separator = ' ',
  manualMode = false,
  blurAmount = 5,
  borderColor = '#ff8a3d', // Default to theme's orange
  glowColor = 'rgba(255, 138, 61, 0.6)',
  animationDuration = 0.5,
  pauseBetweenAnimations = 1,
  onClick,
  specialLoadMode = false,
  startTrigger = true,
  onComplete
}) => {
  const words = sentence.split(separator);
  const [currentIndex, setCurrentIndex] = useState<number | null>(0);
  const [lastActiveIndex, setLastActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [focusRect, setFocusRect] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [isFinished, setIsFinished] = useState(false);

  // Auto animation mode (non-special load mode)
  useEffect(() => {
    if (!manualMode && !specialLoadMode) {
      const interval = setInterval(
        () => {
          setCurrentIndex(prev => (prev === null ? 0 : (prev + 1) % words.length));
        },
        (animationDuration + pauseBetweenAnimations) * 1000
      );

      return () => clearInterval(interval);
    }
  }, [manualMode, specialLoadMode, animationDuration, pauseBetweenAnimations, words.length]);

  // Special load animation mode
  useEffect(() => {
    if (specialLoadMode) {
      if (!startTrigger) {
        // Keep it fully visible and not blurred before loader finishes
        setCurrentIndex(-1);
        setIsFinished(true);
        return;
      }

      // Loader has finished! Start the focus animation
      setCurrentIndex(0);
      setIsFinished(false);

      const timer = setTimeout(() => {
        setIsFinished(true);
        setCurrentIndex(-1);
        if (onComplete) onComplete();
      }, 2000); // Focus for exactly 2 seconds

      return () => clearTimeout(timer);
    }
  }, [specialLoadMode, startTrigger, onComplete]);

  useEffect(() => {
    if (currentIndex === null || currentIndex === -1) return;
    if (!wordRefs.current[currentIndex] || !containerRef.current) return;

    const parentRect = containerRef.current.getBoundingClientRect();
    const activeWord = wordRefs.current[currentIndex];
    
    if (activeWord) {
      const activeRect = activeWord.getBoundingClientRect();

      setFocusRect({
        x: activeRect.left - parentRect.left,
        y: activeRect.top - parentRect.top,
        width: activeRect.width,
        height: activeRect.height
      });
    }
  }, [currentIndex, words.length]);

  const handleMouseEnter = (index: number) => {
    if (manualMode && !isFinished) {
      setLastActiveIndex(index);
      setCurrentIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (manualMode && !isFinished) {
      setCurrentIndex(lastActiveIndex ?? 0);
    }
  };

  return (
    <span 
      className="focus-container" 
      ref={containerRef}
      onClick={onClick}
      style={{ display: 'inline-flex', width: '100%', gap: '0.28em', justifyContent: 'inherit', flexWrap: 'wrap' }}
    >
      {words.map((word, index) => {
        const isActive = index === currentIndex;
        
        let wordContent: React.ReactNode = word;
        if (word.includes("builder")) {
          // Replace "builder" with styled span
          const parts = word.split("builder");
          wordContent = (
            <>
              {parts[0]}
              <span className="text-accent font-accent lowercase tracking-normal italic font-normal">
                builder
              </span>
              {parts[1]}
            </>
          );
        }

        return (
          <React.Fragment key={index}>
            <span
              ref={el => {
                wordRefs.current[index] = el;
              }}
              className={`focus-word ${manualMode ? 'manual' : ''} ${isActive && !manualMode ? 'active' : ''}`}
              style={{
                filter: isFinished 
                  ? 'blur(0px)' 
                  : (isActive ? 'blur(0px)' : `blur(${blurAmount}px)`),
                cursor: onClick ? 'pointer' : 'default',
                transition: `filter ${animationDuration}s ease, color ${animationDuration}s ease`,
                color: isFinished
                  ? 'var(--text-primary)'
                  : (isActive ? 'var(--text-primary)' : 'var(--text-muted)')
              }}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              {wordContent}
            </span>
            {/* Insert a line break after the first block on the home page */}
            {index === 0 && separator === "|" && <div className="w-full h-0" />}
          </React.Fragment>
        );
      })}

      <motion.span
        className="focus-frame"
        animate={{
          x: focusRect.x,
          y: focusRect.y,
          width: focusRect.width,
          height: focusRect.height,
          opacity: (currentIndex !== null && currentIndex >= 0 && !isFinished) ? 1 : 0
        }}
        transition={{
          duration: animationDuration
        }}
        style={{
          border: 'none',
          pointerEvents: 'none',
          position: 'absolute',
          top: 0,
          left: 0
        }}
      >
        <span className="corner top-left" style={{ borderColor, filter: `drop-shadow(0px 0px 4px ${glowColor})` }}></span>
        <span className="corner top-right" style={{ borderColor, filter: `drop-shadow(0px 0px 4px ${glowColor})` }}></span>
        <span className="corner bottom-left" style={{ borderColor, filter: `drop-shadow(0px 0px 4px ${glowColor})` }}></span>
        <span className="corner bottom-right" style={{ borderColor, filter: `drop-shadow(0px 0px 4px ${glowColor})` }}></span>
      </motion.span>
    </span>
  );
};

export default TrueFocus;
