interface PlaceholderImageProps {
  label: string;
  aspect?: string; // Tailwind aspect-ratio class, mis. "aspect-[4/3]"
  className?: string;
}

/**
 * PlaceholderImage — pengganti foto proyek asli sementara data belum tersedia.
 * Dibuat murni dengan CSS/SVG (tanpa stock image eksternal) dan ditandai
 * jelas sebagai PLACEHOLDER agar mudah diidentifikasi & diganti nanti.
 */
export default function PlaceholderImage({
  label,
  aspect = "aspect-[4/3]",
  className = "",
}: PlaceholderImageProps) {
  return (
    <div
      role="img"
      aria-label={`Placeholder — ${label}, akan diganti dengan foto proyek asli`}
      className={`relative w-full ${aspect} bg-navy-tint border border-hairline-strong overflow-hidden ${className}`}
    >
      <svg
        className="absolute inset-0 w-full h-full opacity-40"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <pattern
          id="placeholder-hatch"
          width="16"
          height="16"
          patternTransform="rotate(45)"
          patternUnits="userSpaceOnUse"
        >
          <line x1="0" y1="0" x2="0" y2="16" stroke="#B9B5AC" strokeWidth="1" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#placeholder-hatch)" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 gap-2">
        <span className="font-mono text-[11px] tracking-wider uppercase text-navy bg-bg/90 border border-hairline-strong px-3 py-1">
          Placeholder Foto Proyek
        </span>
        <span className="font-body text-sm text-text-muted max-w-[240px]">
          {label}
        </span>
      </div>
    </div>
  );
}
