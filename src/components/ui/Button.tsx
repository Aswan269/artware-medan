import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonSharedProps {
  variant?: ButtonVariant;
  children: ReactNode;
  icon?: ReactNode;
  onNavy?: boolean;
}

type ButtonAsAnchorProps = ButtonSharedProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    /** Default. Me-render elemen <a> (perilaku asli, tidak berubah). */
    as?: "a";
  };

type ButtonAsButtonProps = ButtonSharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    /** Me-render elemen <button> sungguhan — dipakai untuk aksi form (submit/reset). */
    as: "button";
  };

type ButtonProps = ButtonAsAnchorProps | ButtonAsButtonProps;

const base =
  "inline-flex items-center justify-center gap-2 font-body font-medium text-sm sm:text-base " +
  "rounded-sm px-6 py-3 min-h-[44px] md:min-h-[48px] transition-colors duration-fast " +
  "border disabled:opacity-50 disabled:cursor-not-allowed";

const variantClass: Record<ButtonVariant, string> = {
  primary: "bg-amber border-amber text-text-on-amber hover:bg-amber-dark hover:border-amber-dark",
  secondary: "bg-transparent border-navy text-navy hover:bg-navy hover:text-text-on-navy",
  ghost: "bg-transparent border-transparent text-text hover:text-navy",
};

const variantOnNavyClass: Record<ButtonVariant, string> = {
  primary: "bg-amber border-amber text-text-on-amber hover:bg-amber-dark hover:border-amber-dark",
  secondary:
    "bg-transparent border-bg text-text-on-navy hover:bg-bg hover:text-navy",
  ghost: "bg-transparent border-transparent text-text-on-navy hover:opacity-80",
};

/**
 * Button — implementasi §9 design system.
 * Varian "secondary" dipakai untuk CTA "Konsultasi via WhatsApp" (aksi kedua),
 * "primary" untuk "Minta Penawaran" (aksi utama/konversi).
 *
 * Secara default me-render <a> (perilaku asli sejak Sprint 1, tidak berubah
 * untuk semua pemakaian yang sudah ada di Navbar/Hero/MobileNav).
 * Set `as="button"` untuk aksi form (mis. submit) yang butuh elemen <button>
 * semantik, bukan link — ditambahkan pada Sprint 5 untuk QuoteForm.
 */
export default function Button(props: ButtonProps) {
  const { variant = "primary", children, icon, onNavy = false, className = "", as, ...rest } =
    props;
  const classes = onNavy ? variantOnNavyClass[variant] : variantClass[variant];

  if (as === "button") {
    return (
      <button
        className={`${base} ${classes} ${className}`}
        {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {icon}
        {children}
      </button>
    );
  }

  return (
    <a
      className={`${base} ${classes} ${className}`}
      {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
    >
      {icon}
      {children}
    </a>
  );
}
