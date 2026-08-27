import Container from "../layout/Container";
import EyebrowLabel from "../ui/EyebrowLabel";
import Reveal from "../ui/Reveal";
import { capabilities } from "../../data/capabilities";

/**
 * CapabilitySection — section "Tentang Artware" / Capability Statement.
 *
 * Komposisi SENGAJA berbeda dari section sebelumnya, supaya homepage tidak
 * terasa seperti "Hero → Card Grid → Portfolio Card → Card Grid lagi":
 * - Hero      = split kiri/kanan sejajar (teks vs visual).
 * - Services  = header 2 kolom asimetris + grid 4 kartu seragam.
 * - Portfolio = header 1 kolom sempit + grid foto (1 kartu featured).
 * - Tentang (section ini) = alur editorial vertikal 5 bagian: intro →
 *   satu blok pernyataan besar di atas panel navy full-bleed (jeda visual
 *   strategis, SATU-SATUNYA di homepage ini) → daftar kemampuan bergaya
 *   list bernomor (bukan kartu) → blok custom/borongan 2 kolom asimetris
 *   → satu kalimat penutup. Tidak ada grid kartu identik sama sekali di
 *   section ini.
 *
 * Tidak ada foto/placeholder tambahan di section ini — sesuai arahan,
 * typography & layout yang membawa section ini, bukan gambar (menghindari
 * halaman terasa penuh placeholder kosong).
 *
 * Data kemampuan 100% dari src/data/capabilities.ts.
 */
export default function CapabilitySection() {
  return (
    <section
      id="tentang"
      aria-labelledby="capability-heading"
      className="py-16 sm:py-[88px] md:py-[120px]"
    >
      {/* 1. Section introduction */}
      <Container>
        <Reveal className="max-w-[680px]">
          <EyebrowLabel>Tentang Artware</EyebrowLabel>
          <h2
            id="capability-heading"
            className="mt-4 text-3xl md:text-4xl lg:text-[48px] font-display font-semibold text-text leading-tight"
          >
            Partner kerja untuk kebutuhan produksi, kantor, dan event
          </h2>
          <p className="mt-4 text-base md:text-lg text-text-muted leading-relaxed">
            Artware Medan banyak menangani kebutuhan operasional untuk perusahaan,
            kantor, dan berbagai instansi — mulai dari kebutuhan yang bersifat rutin
            hingga permintaan yang sifatnya custom dan borongan.
          </p>
        </Reveal>
      </Container>

      {/* 2. Capability statement — satu panel navy full-bleed sebagai jeda visual strategis */}
      <Reveal
        as="div"
        delayMs={80}
        className="on-navy bg-navy mt-12 md:mt-20 py-12 md:py-20"
      >
        <Container>
          <p className="max-w-[820px] font-display font-semibold text-2xl md:text-4xl lg:text-[44px] leading-snug text-text-on-navy">
            Ketika kebutuhan tidak datang dalam bentuk yang standar, pekerjaan
            dapat disesuaikan dengan kebutuhan proyek.
          </p>
        </Container>
      </Reveal>

      <Container>
        {/* 3. Capability categories — list editorial bernomor, bukan kartu */}
        <Reveal as="div" delayMs={140} className="mt-16 md:mt-24">
          <h3 className="font-mono text-xs tracking-wide uppercase text-text-faint">
            Cakupan Kemampuan
          </h3>

          <ul className="mt-6 border-t border-hairline">
            {capabilities.map((capability, index) => (
              <li
                key={capability.id}
                className="py-6 md:py-7 border-b border-hairline flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-8"
              >
                <span
                  className="font-mono text-sm text-amber-dark shrink-0 sm:w-12"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="flex-1">
                  <h4 className="font-display font-semibold text-lg md:text-xl text-text">
                    {capability.label}
                  </h4>
                  {capability.description && (
                    <p className="mt-1 text-sm md:text-base text-text-muted leading-relaxed max-w-[560px]">
                      {capability.description}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* 4. Custom & project-based work — blok 2 kolom asimetris */}
        <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
          <div className="md:col-span-4">
            <h3 className="font-display font-semibold text-2xl md:text-3xl text-text leading-snug">
              Pekerjaan custom &amp; borongan
            </h3>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <p className="text-base md:text-lg text-text-muted leading-relaxed">
              Tidak semua kebutuhan kantor atau event datang dengan spesifikasi yang
              sama. Artware dapat menyesuaikan pekerjaan berdasarkan permintaan
              spesifik klien, termasuk pengerjaan dalam jumlah besar (borongan)
              maupun kebutuhan yang menggabungkan beberapa jenis pekerjaan
              sekaligus.
            </p>
          </div>
        </div>

        {/* 5. Closing statement */}
        <div className="mt-16 md:mt-24 max-w-[720px]">
          <p className="font-display font-medium text-xl md:text-2xl text-text leading-snug">
            Untuk kebutuhan yang lebih spesifik atau di luar kategori standar, tim
            Artware dapat membahas detail pekerjaan sesuai proyek Anda.
          </p>
        </div>
      </Container>
    </section>
  );
}
