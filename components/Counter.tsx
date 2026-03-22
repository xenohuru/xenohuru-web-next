'use client';

import { useEffect, useRef, useState } from 'react';

interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
}

export function Counter({ end, duration = 2000, suffix = '' }: CounterProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateCounter();
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCounter = () => {
    const startTime = Date.now();
    const step = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuad = (t: number) => t * (2 - t);
      const current = Math.floor(end * easeOutQuad(progress));
      
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  };

  return (
    <div ref={elementRef} className="inline-flex items-baseline gap-1">
      <span className="text-4xl sm:text-5xl font-display font-bold">{count}</span>
      {suffix && <span className="text-white/40 text-xs">{suffix}</span>}
    </div>
  );
}
