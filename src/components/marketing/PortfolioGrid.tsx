import Container from "../layout/Container";
import EyebrowLabel from "../ui/EyebrowLabel";
import Reveal from "../ui/Reveal";
import ProjectCard from "./ProjectCard";
import { projects } from "../../data/projects";

/**
 * PortfolioGrid — section "Portofolio / Proyek".
 *
 * Komposisi SENGAJA berbeda dari ServiceGrid maupun Hero, supaya section
 * tidak terasa berulang:
 * - Hero     = split kiri/kanan sejajar (teks vs visual).
 * - Services = header dua kolom asimetris (heading vs supporting text
 *              berdampingan dengan offset).
 * - Portfolio (section ini) = header SATU kolom, rata kiri, lebar dibatasi
 *              (bukan penuh), menyisakan whitespace kanan yang besar —
 *              ritme visual ketiga yang berbeda dari dua section sebelumnya.
 *
 * Grid proyek memakai SATU kartu "featured" (proyek pertama) yang lebih
 * lebar & foto lebih landscape, sisanya seragam — sistem yang konsisten
 * untuk menciptakan focal point tanpa menjadi bento grid acak.
 *
 * Tidak ada hairline pembatas antar-section di sini; pemisahan dari
 * Services murni memakai whitespace (py besar), sesuai creative direction.
 *
 * Data 100% dari src/data/projects.ts (lihat catatan status placeholder
 * di file tersebut). Menambah proyek baru cukup menambah object baru —
 * grid & kartu featured/standar menyesuaikan otomatis (item pertama dalam
 * array selalu menjadi featured).
 */
export default function PortfolioGrid() {
  return (
    <section
      id="portofolio"
      aria-labelledby="portfolio-heading"
      className="py-16 sm:py-[88px] md:py-[120px]"
    >
      <Container>
        {/* Header satu kolom, rata kiri, lebar dibatasi — beda ritme dari Services */}
        <Reveal as="div" className="max-w-[640px]">
          <EyebrowLabel>Portofolio</EyebrowLabel>
          <h2
            id="portfolio-heading"
            className="mt-4 text-3xl md:text-4xl lg:text-[48px] font-display font-semibold text-text leading-tight"
          >
            Sebagian dari pekerjaan yang telah kami kerjakan
          </h2>
          <p className="mt-4 text-base md:text-lg text-text-muted leading-relaxed">
            Beberapa contoh pekerjaan yang menggambarkan cakupan layanan Jasa Borongan Medan
            untuk perusahaan, instansi, dan event. Dokumentasi foto akan terus
            diperbarui.
          </p>
        </Reveal>

        {/* Grid proyek — kartu pertama featured (lebih lebar), sisanya seragam */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {projects.map((project, index) => {
            const isFeatured = index === 0;
            return (
              <Reveal
                key={project.id}
                delayMs={Math.min(index * 60, 240)}
                className={`h-full ${isFeatured ? "sm:col-span-2 md:col-span-2" : ""}`}
              >
                <ProjectCard project={project} featured={isFeatured} />
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
