import type { ReactNode } from "react";

interface EyebrowLabelProps {
  children: ReactNode;
  onNavy?: boolean;
  className?: string;
}

/**
 * EyebrowLabel — satu-satunya elemen "aksen dossier" yang dipakai di Hero.
 * Sengaja dibuat kecil & tunggal agar tetap terasa sebagai aksen (30%),
 * bukan struktur dominan.
 */
export default function EyebrowLabel({
  children,
  onNavy = false,
  className = "",
}: EyebrowLabelProps) {
  return (
    <span
      className={`inline-block font-mono text-xs tracking-wider uppercase ${
        onNavy ? "text-text-on-navy/70" : "text-amber-dark"
      } ${className}`}
    >
      {children}
    </span>
  );
}
