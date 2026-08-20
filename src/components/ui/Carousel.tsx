"use client";

import * as React from "react";
import { useEffect, useRef, useState, useMemo } from "react";
import { gsap } from "gsap";
import { CarouselCard, CarouselCardProps } from "./CarouselCard";

interface CarouselProps {
  items: Omit<CarouselCardProps, "angle" | "radius" | "setRef">[];
}

export function Carousel({ items }: CarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [radius, setRadius] = useState(1200);

  // Duplicate items to form a continuous loop
  const duplicatedItems = useMemo(() => {
    if (!items || items.length === 0) return [];
    const desiredTotal = 12; 
    const repeatCount = Math.max(1, Math.ceil(desiredTotal / items.length));
    const result: typeof items = [];
    
    for (let i = 0; i < repeatCount; i++) {
      items.forEach((item) => {
        result.push({ ...item, id: `${item.id}-${i}` });
      });
    }
    return result;
  }, [items]);

  const anglePerItem = 360 / duplicatedItems.length;

  const drag = useRef({
    isDown: false,
    startX: 0,
    rotationY: 0,
    targetRotationY: 0,
    velocity: 0,
    autoRotateSpeed: 0.05, 
  });

  useEffect(() => {
    const updateRadius = () => {
      // Measure an actual rendered card instead of duplicating the
      // width/breakpoint values from CarouselCard's CSS. This keeps the
      // radius in sync with the card's real size at any viewport width,
      // including the continuous clamp() scaling used in CarouselCard.
      const firstCard = cardsRef.current.find((el): el is HTMLDivElement => !!el);
      if (!firstCard) return;

      const cardWidth = firstCard.offsetWidth;
      const gap = cardWidth * 0.09;

      // Calculate radius so cards form a continuous circle
      const calculatedRadius = ((cardWidth + gap) / 2) / Math.tan(Math.PI / duplicatedItems.length);
      setRadius(calculatedRadius);
    };

    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, [duplicatedItems.length]);

  // Main animation loop
  useEffect(() => {
    let animationFrame: number;
    
    const animate = () => {
      if (!drag.current.isDown) {
        drag.current.targetRotationY += drag.current.velocity;
        drag.current.velocity *= 0.95; 
        
        if (Math.abs(drag.current.velocity) < 0.1) {
          // Auto rotate slowly
          drag.current.targetRotationY -= drag.current.autoRotateSpeed;
        }
      }
      
      drag.current.rotationY += (drag.current.targetRotationY - drag.current.rotationY) * 0.1;
      
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        
        const baseAngle = i * anglePerItem;
        let globalAngle = (baseAngle + drag.current.rotationY) % 360;
        if (globalAngle < 0) globalAngle += 360; 
        
        // In a true concave view, we want to look at the BACK wall of the cylinder.
        // The back wall is around 180 degrees.
        const distanceFrom180 = Math.abs(globalAngle - 180);
        const isVisible = distanceFrom180 < 150; // Only show cards within a 150-degree arc in front of us
        
        if (isVisible) {
          const rad = (globalAngle * Math.PI) / 180;
          
          // Calculate X and Z on the circular path
          const x = Math.sin(rad) * radius;
          const z = Math.cos(rad) * radius;
          
          // Face the center of the cylinder (0,0). 
          // Angle 180 faces 0 (straight towards the camera).
          const rotY = globalAngle + 180;
          
          card.style.visibility = "visible";
          card.style.transform = `translate(-50%, -50%) translate3d(${x}px, 0, ${z}px) rotateY(${rotY}deg)`;
          
          // Smooth opacity fade at the edges of the view
          // const depthOpacity = Math.max(0, 1 - distanceFrom180 / 300);
          const depthOpacity = 1;
          card.style.opacity = depthOpacity.toString();
        } else {
          card.style.visibility = "hidden";
          card.style.opacity = "0";
        }
      });
      
      animationFrame = requestAnimationFrame(animate);
    };
    
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [radius, anglePerItem]);

  const handlePointerDown = (e: React.PointerEvent) => {
    drag.current.isDown = true;
    drag.current.startX = e.clientX;
    drag.current.velocity = 0; 
    if (containerRef.current) {
      containerRef.current.style.cursor = "grabbing";
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!drag.current.isDown) return;
    const deltaX = e.clientX - drag.current.startX;
    drag.current.startX = e.clientX;
    
    // We reverse sensitivity: dragging right (deltaX > 0) means cards move right.
    // Moving cards right means we want globalAngle to DECREASE (go from 180 towards 0).
    const sensitivity = 0.15;
    drag.current.targetRotationY -= deltaX * sensitivity;
    drag.current.velocity = -deltaX * sensitivity; 
  };

  const handlePointerUp = () => {
    drag.current.isDown = false;
    if (containerRef.current) {
      containerRef.current.style.cursor = "grab";
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[clamp(380px,90vw,680px)] flex items-center justify-center overflow-hidden cursor-grab touch-pan-y select-none"
      style={{ perspective: "1000px" }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <div 
        ref={trackRef}
        className="relative w-full h-full flex items-center justify-center"
        style={{ transformStyle: "preserve-3d" }}
      >
        {duplicatedItems.map((item, i) => (
          <CarouselCard
            key={item.id}
            {...item}
            setRef={(el) => {
              cardsRef.current[i] = el;
            }}
          />
        ))}
      </div>
    </div>
  );
}