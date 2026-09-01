import Container from "../layout/Container";
import EyebrowLabel from "../ui/EyebrowLabel";
import Reveal from "../ui/Reveal";
import Button from "../ui/Button";
import QuoteForm from "./QuoteForm";
import { CONTACT } from "../../config/contact";

/**
 * QuoteSection — section "Minta Penawaran".
 *
 * Komposisi BARU, berbeda dari semua section sebelumnya:
 * - Hero      = split kiri/kanan sejajar rata (teks vs visual, rasio ~1:1).
 * - Services  = header 2 kolom asimetris (heading berat) + grid 4 kartu.
 * - Portfolio = header 1 kolom sempit + grid foto (1 featured).
 * - Capability= alur editorial vertikal + 1 panel navy full-bleed.
 * - Minta Penawaran (section ini) = split kiri/kanan asimetris dengan
 *   BOBOT TERBALIK dari Hero: kolom kiri (intro) lebih ramping (4/12),
 *   kolom kanan (form) yang justru lebih lebar (7/12) — form adalah
 *   elemen utama yang harus terasa lapang, bukan sekadar pendamping teks.
 *   Tidak ada grid kartu di section ini sama sekali.
 *
 * `id="minta-penawaran"` di section ini mengaktifkan tombol-tombol
 * "Minta Penawaran" yang sudah ada sejak Sprint 1 di Navbar/Hero/MobileNav
 * (semuanya mengarah ke CONTACT.quoteFormAnchor = "#minta-penawaran").
 * Tidak ada perubahan pada file Navbar/Hero/MobileNav — link tersebut
 * otomatis berfungsi begitu section ini memiliki id yang sesuai.
 */
export default function QuoteSection() {
  return (
    <section
      id="minta-penawaran"
      aria-labelledby="quote-heading"
      className="py-16 sm:py-[88px] md:py-[120px]"
    >
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Kiri: intro — ramping, bukan dominan */}
          <Reveal as="div" className="md:col-span-4">
            <EyebrowLabel>Minta Penawaran</EyebrowLabel>
            <h2
              id="quote-heading"
              className="mt-4 text-3xl md:text-4xl font-display font-semibold text-text leading-tight"
            >
              Sampaikan kebutuhan Anda
            </h2>
            <p className="mt-4 text-base text-text-muted leading-relaxed">
              Isi form berikut agar tim Jasa Borongan Medan dapat memahami kebutuhan Anda —
              baik untuk pekerjaan rutin, custom, maupun borongan — sebelum
              menyiapkan penawaran.
            </p>

            <div className="mt-8 pt-6 border-t border-hairline">
              <p className="text-sm text-text-muted leading-relaxed">
                Lebih suka berbicara langsung? Hubungi kami melalui WhatsApp.
              </p>
              <Button
                variant="secondary"
                href={CONTACT.whatsappUrl}
                className="mt-4"
              >
                Konsultasi via WhatsApp
              </Button>
            </div>
          </Reveal>

          {/* Kanan: form — lapang, elemen utama section ini */}
          <Reveal as="div" delayMs={80} className="md:col-span-7 md:col-start-6">
            <QuoteForm />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
