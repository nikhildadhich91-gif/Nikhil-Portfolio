'use client';
import { useEffect, useRef, useState } from 'react';
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
  onClick
}) => {
  const words = sentence.split(separator);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastActiveIndex, setLastActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [focusRect, setFocusRect] = useState({ x: 0, y: 0, width: 0, height: 0 });

  useEffect(() => {
    if (!manualMode) {
      const interval = setInterval(
        () => {
          setCurrentIndex(prev => (prev + 1) % words.length);
        },
        (animationDuration + pauseBetweenAnimations) * 1000
      );

      return () => clearInterval(interval);
    }
  }, [manualMode, animationDuration, pauseBetweenAnimations, words.length]);

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
    if (manualMode) {
      setLastActiveIndex(index);
      setCurrentIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (manualMode) {
      setCurrentIndex(lastActiveIndex ?? 0);
    }
  };

  return (
    <div 
      className="focus-container" 
      ref={containerRef}
      onClick={onClick}
    >
      {words.map((word, index) => {
        const isActive = index === currentIndex;
        return (
          <span
            key={index}
            ref={el => {
              wordRefs.current[index] = el;
            }}
            className={`focus-word ${manualMode ? 'manual' : ''} ${isActive && !manualMode ? 'active' : ''}`}
            style={{
              filter: isActive ? 'blur(0px)' : `blur(${blurAmount}px)`,
              cursor: onClick ? 'pointer' : 'default',
              transition: `filter ${animationDuration}s ease, color ${animationDuration}s ease`,
              color: isActive ? 'var(--text-primary)' : 'var(--text-muted)'
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {word}
          </span>
        );
      })}

      <motion.div
        className="focus-frame"
        animate={{
          x: focusRect.x,
          y: focusRect.y,
          width: focusRect.width,
          height: focusRect.height,
          opacity: currentIndex >= 0 ? 1 : 0
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
      </motion.div>
    </div>
  );
};

export default TrueFocus;
