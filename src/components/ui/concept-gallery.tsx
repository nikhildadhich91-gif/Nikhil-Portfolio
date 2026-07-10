"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Flip } from "gsap/dist/Flip";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Flip);
}

const GALLERY_IMAGES = [
  "/assets/Visual_Concept__A_202604251723.jpeg",
  "/assets/Visual_Concept__A_202604251723 (1).jpeg",
  "/assets/Visual_Concept__A_202604251723 (2).jpeg",
  "/assets/Visual_Concept__A_202604251723 (3).jpeg",
  "/assets/Visual_Concept__A_202604251724.jpeg",
  "/assets/Visual_Concept__A_202604251730.jpeg",
  "/assets/Visual_Concept__A_202604251723.jpeg",     // Repeated to complete the 8-grid layout
  "/assets/Visual_Concept__A_202604251723 (1).jpeg", // Repeated to complete the 8-grid layout
];

export function ConceptGallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trackElement = trackRef.current;
    const galleryElement = galleryRef.current;
    const wrapElement = wrapRef.current;
    if (!trackElement || !galleryElement || !wrapElement) return;

    let ctx: gsap.Context;

    // Timeout to ensure styled-jsx classes have been fully loaded/parsed
    const timer = setTimeout(() => {
      const galleryItems = galleryElement.querySelectorAll(".gallery__item");

      ctx = gsap.context(() => {
        // 1. Temporarily add final class to capture final fullscreen positions
        galleryElement.classList.add("gallery--final");
        const flipState = Flip.getState(galleryItems);
        
        // 2. Remove class to return to initial bento layout
        galleryElement.classList.remove("gallery--final");

        // 3. Set up the Flip animation tween
        const flip = Flip.to(flipState, {
          simple: true,
          ease: "none",
        });

        // 4. Create timeline mapped to the track scroll position (pinSpacing: false)
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: trackElement,
            start: "top top",
            end: "bottom top",
            scrub: true,
            pin: wrapElement,
            pinSpacing: false,
            invalidateOnRefresh: true,
          },
        });

        // Add the Flip zoom animation to run for the first part of the scroll track
        tl.add(flip, 0);
        
        // Add a delay/empty spacer to keep it static at the end while the next section overlays it
        tl.to({}, { duration: 0.83 }); 
      }, trackElement);
    }, 150);

    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      {/* CSS Styles for the Bento Grid and Fixed/Overlay Stacking Layers */}
      <style jsx global>{`
        .gallery-track {
          position: relative;
          width: 100%;
          height: 220vh; /* 120vh for zoom animation + 100vh for overlay reveal scroll */
          background: var(--bg-base);
          border-top: 1px solid var(--border-hairline);
        }

        .gallery-wrap {
          position: relative;
          width: 100%;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: var(--bg-base);
          z-index: 5 !important;
        }

        /* Override ScrollTrigger's automatic pin-spacer z-index */
        .pin-spacer {
          z-index: 5 !important;
        }

        .gallery {
          position: relative;
          width: 100%;
          height: 100%;
          flex: none;
        }

        .gallery__item {
          background-position: 50% 50%;
          background-size: cover;
          flex: none;
          position: relative;
          border-radius: 1.5rem;
          overflow: hidden;
          border: 1px solid var(--border-hairline);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
        }

        .gallery__item img {
          object-fit: cover;
          width: 100%;
          height: 100%;
        }

        .gallery--bento {
          display: grid;
          gap: 1.5vh;
          grid-template-columns: repeat(3, 31vw);
          grid-template-rows: repeat(4, 21vh);
          justify-content: center;
          align-content: center;
        }

        @media (max-width: 768px) {
          .gallery--bento {
            grid-template-columns: repeat(3, 30vw);
            grid-template-rows: repeat(4, 15vh);
            gap: 1vh;
          }
          .gallery--final.gallery--bento {
            grid-template-columns: repeat(3, 100vw);
            grid-template-rows: repeat(4, 30vh);
            gap: 0px;
          }
        }

        /* The final state to Flip into: covers full viewport with 0 gaps */
        .gallery--final.gallery--bento {
          grid-template-columns: repeat(3, 100vw);
          grid-template-rows: repeat(4, 50vh);
          gap: 0px;
        }

        /* Specific grid layout child areas */
        .gallery--bento .gallery__item:nth-child(1) {
          grid-area: 1 / 1 / 3 / 2;
        }
        .gallery--bento .gallery__item:nth-child(2) {
          grid-area: 1 / 2 / 2 / 3;
        }
        .gallery--bento .gallery__item:nth-child(3) {
          grid-area: 2 / 2 / 4 / 3;
        }
        .gallery--bento .gallery__item:nth-child(4) {
          grid-area: 1 / 3 / 3 / 3;
        }
        .gallery--bento .gallery__item:nth-child(5) {
          grid-area: 3 / 1 / 4 / 2;
        }
        .gallery--bento .gallery__item:nth-child(6) {
          grid-area: 3 / 3 / 5 / 4;
        }
        .gallery--bento .gallery__item:nth-child(7) {
          grid-area: 4 / 1 / 5 / 2;
        }
        .gallery--bento .gallery__item:nth-child(8) {
          grid-area: 4 / 2 / 5 / 3;
        }
      `}</style>

      <div ref={trackRef} className="gallery-track">
        <div ref={wrapRef} className="gallery-wrap">
          <div ref={galleryRef} className="gallery gallery--bento" id="gallery-8">
            {GALLERY_IMAGES.map((src, i) => (
              <div key={i} className="gallery__item">
                <img src={src} alt={`AI Concept #${i + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
