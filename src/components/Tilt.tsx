"use client";

import { useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";

interface TiltProps {
  children: ReactNode;
  className?: string;
  max?: number;
  scale?: number;
}

export default function Tilt({ children, className = "", max = 8, scale = 1.02 }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");
  const prefersReducedMotion = useReducedMotion();

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const rotateX = -y * max;
    const rotateY = x * max;
    setTransform(`rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`);
  };

  const handleLeave = () => {
    setTransform("");
  };

  return (
    <div
      ref={ref}
      className={`tilt-wrap ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div className="tilt-inner" style={{ transform }}>
        {children}
      </div>
    </div>
  );
}
