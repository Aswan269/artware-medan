import Container from "../layout/Container";
import EyebrowLabel from "../ui/EyebrowLabel";
import Reveal from "../ui/Reveal";
import { CONTACT } from "../../config/contact";

/**
 * ContactInfo — informasi kontak & wilayah layanan.
 *
 * TIDAK ada data yang dikarang: alamat, email, dan jam operasional
 * ditampilkan sebagai placeholder eksplisit sampai pemilik bisnis
 * memberikan datanya. Nomor WhatsApp memakai CONTACT yang sama dengan
 * Sprint 1 & 5 (tidak ditampilkan sebagai digit mentah, hanya link).
 *
 * Layout SENGAJA bukan grid 4-6 kartu kecil ala dashboard — dua kolom
 * longgar (kontak vs wilayah layanan) dipisahkan whitespace, bukan card
 * atau border kotak. Wilayah layanan ditampilkan sebagai treatment
 * tipografi sederhana (bukan peta), sesuai batasan Sprint 6.
 */
export default function ContactInfo() {
  return (
    <section id="kontak" aria-labelledby="contact-heading" className="py-16 sm:py-[88px] md:py-[120px]">
      <Container>
        <Reveal
          as="div"
          className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8"
        >
          {/* Kontak */}
          <div className="md:col-span-6">
            <EyebrowLabel>Kontak</EyebrowLabel>
            <h2
              id="contact-heading"
              className="mt-4 text-2xl md:text-3xl font-display font-semibold text-text leading-tight"
            >
              Hubungi Kami
            </h2>

            <dl className="mt-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <dt className="font-mono text-xs tracking-wide uppercase text-text-faint">
                  WhatsApp
                </dt>
                <dd>
                  <a
                    href={CONTACT.whatsappUrl}
                    className="text-base text-text underline decoration-hairline-strong underline-offset-4 hover:text-navy hover:decoration-amber transition-colors duration-fast"
                  >
                    Hubungi via WhatsApp
                  </a>
                </dd>
              </div>

              <div className="flex flex-col gap-1">
                <dt className="font-mono text-xs tracking-wide uppercase text-text-faint">
                  Email
                </dt>
                <dd className="text-base text-text-muted">Email akan ditambahkan</dd>
              </div>

              <div className="flex flex-col gap-1">
                <dt className="font-mono text-xs tracking-wide uppercase text-text-faint">
                  Alamat
                </dt>
                <dd className="text-base text-text-muted">Alamat akan ditambahkan</dd>
              </div>

              <div className="flex flex-col gap-1">
                <dt className="font-mono text-xs tracking-wide uppercase text-text-faint">
                  Jam Operasional
                </dt>
                <dd className="text-base text-text-muted">
                  Jam operasional akan ditambahkan
                </dd>
              </div>
            </dl>
          </div>

          {/* Wilayah Layanan — treatment tipografi, bukan peta */}
          <div className="md:col-span-5 md:col-start-8">
            <h3 className="font-mono text-xs tracking-wide uppercase text-text-faint">
              Wilayah Layanan
            </h3>
            <div className="mt-4 flex flex-col">
              <span className="font-display font-semibold text-3xl md:text-4xl text-text leading-tight">
                Sumatera Utara
              </span>
              <span className="font-display font-semibold text-3xl md:text-4xl text-text leading-tight">
                Aceh
              </span>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
