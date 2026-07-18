"use client";

import { useEffect, useRef, useState } from "react";
import type { JSX, ReactNode } from "react";
import { usePrefersReducedMotion } from "@/lib/client-hooks";
import { cx } from "@/lib/cx";
import styles from "./Reveal.module.css";

interface RevealProps {
  readonly children: ReactNode;
  readonly delayMs?: number;
  readonly className?: string | undefined;
}

export function Reveal({
  children,
  delayMs = 0,
  className,
}: RevealProps): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (node === null || reducedMotion) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setSeen(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
    };
  }, [reducedMotion]);

  const visible = reducedMotion || seen;

  return (
    <div
      ref={ref}
      className={cx(styles.reveal, className)}
      data-visible={visible ? "true" : "false"}
      style={{ transitionDelay: `${String(delayMs)}ms` }}
    >
      {children}
    </div>
  );
}
