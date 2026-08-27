import Container from "../layout/Container";
import EyebrowLabel from "../ui/EyebrowLabel";
import Reveal from "../ui/Reveal";
import Button from "../ui/Button";
import { CONTACT } from "../../config/contact";

/**
 * ClosingCTA — closing statement sebelum Contact/Footer.
 *
 * Komposisi SENGAJA berbeda dari Hero (split kiri/kanan rata) maupun
 * QuoteSection (split kiri ramping/kanan lebar berisi form): section ini
 * SATU kolom, terpusat (centered), tanpa split kiri-kanan sama sekali —
 * murni pernyataan penutup dengan whitespace besar di kiri-kanan sebagai
 * focal point, di atas panel navy (satu lagi pemakaian navy yang
 * strategis, kali ini sebagai penutup sebelum Contact/Footer).
 *
 * CTA "Minta Penawaran" mengarah ke section QuoteSection yang sudah ada
 * (CONTACT.quoteFormAnchor) — TIDAK membuat form baru. CTA sekunder
 * "WhatsApp" memakai CONTACT.whatsappUrl yang sama persis dipakai di
 * Sprint 1 & 5 — tidak ada nomor baru yang di-hardcode.
 */
export default function ClosingCTA() {
  return (
    <section
      id="siap-memulai"
      aria-labelledby="closing-cta-heading"
      className="on-navy bg-navy py-16 sm:py-[88px] md:py-[120px]"
    >
      <Container>
        <Reveal className="max-w-[680px] mx-auto flex flex-col items-center text-center">
          <EyebrowLabel onNavy>Siap Memulai?</EyebrowLabel>

          <h2
            id="closing-cta-heading"
            className="mt-4 text-3xl md:text-4xl lg:text-[48px] font-display font-semibold text-text-on-navy leading-tight"
          >
            Bahas kebutuhan produksi dan pekerjaan borongan Anda.
          </h2>

          <p className="mt-4 text-base md:text-lg text-text-on-navy leading-relaxed max-w-[520px]">
            Hubungi Artware Medan untuk membahas kebutuhan kantor, event, printing,
            custom, atau pekerjaan borongan Anda.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button variant="primary" href={CONTACT.quoteFormAnchor}>
              Minta Penawaran
            </Button>
            <Button variant="secondary" onNavy href={CONTACT.whatsappUrl}>
              WhatsApp
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
