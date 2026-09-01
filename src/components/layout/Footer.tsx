import Container from "./Container";
import { services } from "../../data/services";
import { CONTACT } from "../../config/contact";

const navLinkClass =
  "text-sm text-text-on-navy hover:text-amber transition-colors duration-fast";

/**
 * Footer — penutup homepage.
 *
 * Semua anchor memakai ID section yang SUDAH ADA di project (tidak
 * membuat route/halaman baru):
 *   Beranda          -> "/"                         (sama seperti navItems.ts)
 *   Layanan          -> "#layanan"                   (ServiceGrid, Sprint 2)
 *   Portofolio       -> "#portofolio"                (PortfolioGrid, Sprint 3)
 *   Tentang          -> "#tentang"                   (CapabilitySection, Sprint 4)
 *   Minta Penawaran  -> CONTACT.quoteFormAnchor       (QuoteSection, Sprint 5)
 *   Kontak           -> "#kontak"                     (ContactInfo, Sprint 6)
 *
 * Daftar layanan diambil dari src/data/services.ts (data-driven, tidak
 * hardcode) — semua mengarah ke "#layanan" karena belum ada halaman detail
 * per layanan (di luar scope).
 *
 * Tidak ada klaim legalitas/partner resmi. BPJS Ketenagakerjaan sengaja
 * tidak disebutkan di sini.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer aria-label="Footer" className="on-navy bg-navy">
      <Container>
        <div className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          <div className="md:col-span-4">
            <p className="font-display font-semibold text-lg text-text-on-navy">
              Jasa Borongan Medan
            </p>
            <p className="mt-3 text-sm text-text-on-navy/70 leading-relaxed max-w-[280px]">
              Vendor kebutuhan kantor, event, printing &amp; media promosi, serta
              pekerjaan custom/borongan untuk perusahaan dan instansi.
            </p>
            <p className="mt-4 font-mono text-xs tracking-wide uppercase text-text-on-navy/60">
              Sumatera Utara &amp; Aceh
            </p>
          </div>

          <nav aria-label="Navigasi footer" className="md:col-span-3 md:col-start-6">
            <h3 className="font-mono text-xs tracking-wide uppercase text-text-on-navy/60">
              Navigasi
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              <li>
                <a href="/" className={navLinkClass}>
                  Beranda
                </a>
              </li>
              <li>
                <a href="#layanan" className={navLinkClass}>
                  Layanan
                </a>
              </li>
              <li>
                <a href="#portofolio" className={navLinkClass}>
                  Portofolio
                </a>
              </li>
              <li>
                <a href="#tentang" className={navLinkClass}>
                  Tentang
                </a>
              </li>
              <li>
                <a href={CONTACT.quoteFormAnchor} className={navLinkClass}>
                  Minta Penawaran
                </a>
              </li>
              <li>
                <a href="#kontak" className={navLinkClass}>
                  Kontak
                </a>
              </li>
            </ul>
          </nav>

          <nav aria-label="Layanan footer" className="md:col-span-3 md:col-start-9">
            <h3 className="font-mono text-xs tracking-wide uppercase text-text-on-navy/60">
              Layanan
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {services.map((service) => (
                <li key={service.id}>
                  <a href="#layanan" className={navLinkClass}>
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="py-6 border-t border-bg/15 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-xs text-text-on-navy/60">
            © {year} Jasa Borongan Medan. Seluruh hak cipta dilindungi.
          </p>
          <a href={CONTACT.whatsappUrl} className={navLinkClass}>
            Hubungi via WhatsApp
          </a>
        </div>
      </Container>
    </footer>
  );
}
