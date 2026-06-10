"use client";

import { useEffect, useRef } from "react";

type AnimVariant = "up" | "left" | "right" | "scale";

const variantClass: Record<AnimVariant, string> = {
  up: "ck-anim",
  left: "ck-anim-left",
  right: "ck-anim-right",
  scale: "ck-anim-scale",
};

interface Props {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  variant?: AnimVariant;
  delay?: number; // ms
  threshold?: number;
  as?: keyof React.JSX.IntrinsicElements;
}

export default function Anim({
  children,
  className = "",
  style,
  variant = "up",
  delay = 0,
  threshold = 0.12,
  as: Tag = "div",
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (delay) el.style.transitionDelay = `${delay}ms`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in-view");
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold]);

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} className={`${variantClass[variant]} ${className}`} style={style}>
      {children}
    </Tag>
  );
}
