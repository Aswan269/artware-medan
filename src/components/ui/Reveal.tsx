import type { ElementType, ReactNode } from "react";
import { useInViewOnce } from "../../hooks/useInViewOnce";

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  delayMs?: number;
  className?: string;
}

/**
 * Reveal — animasi subtle opacity 0→1 + translateY 8px→0, sekali per elemen.
 * Durasi/easing mengikuti token design system (--duration-slow, --ease-standard).
 * `prefers-reduced-motion` sudah ditangani secara global di global.css
 * (memaksa semua transition-duration ke ~0), jadi tidak perlu logika tambahan
 * di sini.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  delayMs = 0,
  className = "",
}: RevealProps) {
  const { ref, inView } = useInViewOnce<HTMLElement>();

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(var(--reveal-distance))",
        transition: `opacity var(--duration-slow) var(--ease-standard) ${delayMs}ms, transform var(--duration-slow) var(--ease-standard) ${delayMs}ms`,
      }}
    >
      {children}
    </Tag>
  );
}
