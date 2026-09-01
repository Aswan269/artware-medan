import { useEffect, useRef } from "react";
import { navItems } from "./navItems";
import Button from "../ui/Button";
import { CONTACT } from "../../config/contact";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

/**
 * MobileNav — overlay fullscreen untuk breakpoint mobile/tablet.
 * - Menutup dengan tombol close, tombol Escape, atau klik link.
 * - Body scroll dikunci selama overlay terbuka.
 * - Fokus dipindah ke overlay saat dibuka (accessibility dasar).
 */
export default function MobileNav({ open, onClose }: MobileNavProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      firstLinkRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={panelRef}
      id="mobile-nav"
      role="dialog"
      aria-modal="true"
      aria-label="Menu navigasi"
      className="fixed inset-0 z-50 bg-bg border-t border-hairline md:hidden flex flex-col"
    >
      <div className="flex items-center justify-between px-5 h-16 border-b border-hairline">
        <span className="font-display font-semibold text-lg text-navy">
          Jasa Borongan Medan
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup menu"
          className="p-2 -mr-2 text-text hover:text-navy transition-colors duration-fast"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M6 6L18 18M18 6L6 18"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <nav aria-label="Navigasi utama mobile" className="flex-1 flex flex-col justify-between px-5 py-8">
        <ul className="flex flex-col gap-1">
          {navItems.map((item, index) => (
            <li key={item.label} className="border-b border-hairline">
              <a
                ref={index === 0 ? firstLinkRef : undefined}
                href={item.href}
                onClick={onClose}
                className="block py-4 font-display font-semibold text-2xl text-text hover:text-navy transition-colors duration-fast"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-3 pt-8">
          <Button variant="secondary" href={CONTACT.whatsappUrl} onClick={onClose}>
            Konsultasi via WhatsApp
          </Button>
          <Button variant="primary" href={CONTACT.quoteFormAnchor} onClick={onClose}>
            Minta Penawaran
          </Button>
        </div>
      </nav>
    </div>
  );
}
