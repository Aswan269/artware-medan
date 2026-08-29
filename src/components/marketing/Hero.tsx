import Container from "../layout/Container";
import Button from "../ui/Button";
import EyebrowLabel from "../ui/EyebrowLabel";
import { CONTACT } from "../../config/contact";

const serviceTags = ["Kebutuhan Kantor", "Kebutuhan Event", "Printing & Media Promosi", "Custom / Borongan"];

/**
 * Hero — §4 revisi: prioritas business clarity.
 * Pengunjung harus langsung paham: apa itu Artware, layanan utama,
 * area layanan, dan cara menghubungi — tanpa klaim angka/statistik (revisi #8).
 */
export default function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="pt-12 pb-16 md:pt-20 md:pb-24">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-center">
          {/* Kolom teks */}
          <div className="md:col-span-6 flex flex-col items-start">
            <EyebrowLabel>Vendor Kebutuhan Kantor, Event & Printing</EyebrowLabel>

            <h1
              id="hero-heading"
              className="mt-4 text-4xl md:text-5xl lg:text-[64px] font-display font-semibold text-text leading-tight"
            >
              Mitra operasional untuk kebutuhan kantor, event, dan produksi cetak perusahaan Anda
            </h1>

            <p className="mt-5 text-base md:text-lg text-text-muted leading-relaxed max-w-[520px]">
              Artware Medan melayani perusahaan, instansi, dan event organizer di{" "}
              <span className="text-text font-medium">Sumatera Utara &amp; Aceh</span> — mulai
              dari pesanan kebutuhan kantor rutin hingga pekerjaan custom dan borongan skala
              besar, dikerjakan sesuai standar yang bisa diandalkan.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button variant="primary" href={CONTACT.quoteFormAnchor}>
                Minta Penawaran
              </Button>
              <Button variant="secondary" href={CONTACT.whatsappUrl}>
                Konsultasi via WhatsApp
              </Button>
            </div>

            {/* Metadata pendukung konteks bisnis — ringan, bukan tabel/dokumen */}
            <ul
              aria-label="Bidang layanan utama"
              className="mt-10 flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs tracking-wide uppercase text-text-muted"
            >
              {serviceTags.map((tag) => (
                <li key={tag} className="flex items-center gap-2">
                  <span className="inline-block w-1 h-1 bg-amber-dark" aria-hidden="true" />
                  {tag}
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom visual */}
          <div className="md:col-span-6">
            <img
              src="/images/kebutuhan-event/panggung-rakornis.jpeg"
              alt="Panggung event dengan backdrop dan layar LED"
              className="aspect-[4/3] w-full border border-hairline-strong object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
