import type { ElementType, ReactNode } from "react";

type ContainerWidth = "max" | "narrow" | "wide";

interface ContainerProps {
  children: ReactNode;
  /**
   * "max"    -> lebar umum section (1280px) — default
   * "narrow" -> blok teks panjang (760px)
   * "wide"   -> galeri/portofolio penuh (1440px)
   */
  width?: ContainerWidth;
  as?: ElementType;
  className?: string;
}

const widthClass: Record<ContainerWidth, string> = {
  max: "max-w-container",
  narrow: "max-w-narrow",
  wide: "max-w-wide",
};

/**
 * Container — pembatas lebar konten dengan padding responsif konsisten
 * (20px mobile / 40px tablet / 64px desktop), sesuai token §4 design system.
 */
export default function Container({
  children,
  width = "max",
  as: Tag = "div",
  className = "",
}: ContainerProps) {
  return (
    <Tag
      className={`w-full ${widthClass[width]} mx-auto px-5 sm:px-10 md:px-16 ${className}`}
    >
      {children}
    </Tag>
  );
}
