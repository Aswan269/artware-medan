import Container from "../layout/Container";
import EyebrowLabel from "../ui/EyebrowLabel";
import Reveal from "../ui/Reveal";
import ServiceCard from "./ServiceCard";
import { services } from "../../data/services";

/**
 * ServiceGrid — section "Layanan".
 *
 * Komposisi SENGAJA dibuat berbeda dari Hero:
 * Hero  = split kiri/kanan (teks vs visual), sejajar penuh.
 * Services = header asimetris (heading kiri lebih lebar, supporting text
 * di kolom kanan yang lebih sempit dan diberi jarak/offset), baru diikuti
 * grid kartu di bawahnya. Ini menghindari kesan "semua section pakai pola
 * yang sama" sesuai creative direction.
 *
 * Tidak ada hairline pembatas section di sini — pemisahan dari Hero di
 * atasnya murni mengandalkan whitespace (py besar), bukan garis, supaya
 * tidak terasa seperti dokumen bersekat-sekat.
 *
 * Data 100% berasal dari src/data/services.ts. Menambah kategori baru
 * (mis. kategori ke-5, ke-6, dst.) cukup menambah object baru di file
 * tersebut — grid di bawah otomatis menyesuaikan jumlah kolom/baris
 * tanpa perlu mengubah komponen ini.
 */
export default function ServiceGrid() {
  return (
    <section id="layanan" aria-labelledby="services-heading" className="py-16 sm:py-[88px] md:py-[120px]">
      <Container>
        {/* Header asimetris: heading kiri (lebih lebar), supporting text kanan (lebih sempit, offset) */}
        <Reveal className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 md:items-end">
          <div className="md:col-span-7">
            <EyebrowLabel>Layanan</EyebrowLabel>
            <h2
              id="services-heading"
              className="mt-4 text-3xl md:text-4xl lg:text-[48px] font-display font-semibold text-text leading-tight max-w-[560px]"
            >
              Satu vendor untuk berbagai kebutuhan operasional
            </h2>
          </div>

          <div className="md:col-span-4 md:col-start-9">
            <p className="text-base md:text-lg text-text-muted leading-relaxed">
              Jasa Borongan Medan menangani beragam kebutuhan perusahaan, kantor,
              instansi, dan event — dari perlengkapan rutin hingga pekerjaan
              custom dan borongan sesuai spesifikasi klien.
            </p>
          </div>
        </Reveal>

        {/* Grid layanan — data-driven, otomatis menyesuaikan jumlah item */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {services.map((service, index) => (
            <Reveal key={service.id} delayMs={Math.min(index * 60, 240)} className="h-full">
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
