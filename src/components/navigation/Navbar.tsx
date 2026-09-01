import { useEffect, useState } from "react";
import Container from "../layout/Container";
import Button from "../ui/Button";
import MobileNav from "./MobileNav";
import { navItems } from "./navItems";
import { CONTACT } from "../../config/contact";

/**
 * Navbar — §11 design system.
 * - Border bawah hanya muncul setelah scroll (bukan hairline statis),
 *   sesuai revisi #3: divider dipakai fungsional, bukan otomatis di semua tempat.
 * - CTA utama tetap terlihat di semua breakpoint (termasuk mobile, di luar hamburger).
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 8);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 bg-bg transition-colors duration-base border-b ${
        scrolled ? "border-hairline" : "border-transparent"
      }`}
    >
      <Container>
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo (placeholder teks — ganti dengan logo asli saat tersedia) */}
          <a
            href="/"
            className="font-display font-semibold text-base sm:text-lg md:text-xl text-navy tracking-tight whitespace-nowrap shrink-0"
          >
            Jasa Borongan Medan
          </a>

          {/* Nav desktop */}
          <nav aria-label="Navigasi utama" className="hidden md:block">
            <ul className="flex items-center gap-8">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="font-body font-medium text-sm text-text pb-1 border-b-[1.5px] border-transparent hover:text-navy hover:border-amber transition-colors duration-fast"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA desktop */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="secondary" href={CONTACT.whatsappUrl}>
              Konsultasi via WhatsApp
            </Button>
            <Button variant="primary" href={CONTACT.quoteFormAnchor}>
              Minta Penawaran
            </Button>
          </div>

          {/* CTA + hamburger mobile */}
          <div className="flex items-center gap-1.5 sm:gap-2 md:hidden shrink-0">
            <Button
              variant="primary"
              href={CONTACT.quoteFormAnchor}
              className="!px-3 !py-2 text-xs sm:text-sm whitespace-nowrap"
            >
              Minta Penawaran
            </Button>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Buka menu navigasi"
              aria-haspopup="dialog"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              className="p-2 -mr-2 text-text hover:text-navy transition-colors duration-fast shrink-0"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M3 6H21M3 12H21M3 18H21"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </Container>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
