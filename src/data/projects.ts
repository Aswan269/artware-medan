/**
 * DATA PROYEK / PORTOFOLIO — ARTWARE MEDAN
 * ----------------------------------------------------------------
 * ⚠️  STATUS: DATA CONTOH / PLACEHOLDER SEMENTARA.
 *
 * Seluruh entri di bawah ini adalah data contoh untuk keperluan
 * pengembangan tampilan, BUKAN data proyek final yang sudah dikonfirmasi.
 * Sebelum situs live:
 *   - Ganti `title`, `description`, `location`, `year` dengan data asli.
 *   - Isi `image` dengan path foto proyek asli begitu tersedia (lihat
 *     catatan di bawah interface `Project`).
 *   - Isi `client` dengan nama klien HANYA jika publikasi nama tersebut
 *     sudah dikonfirmasi/diizinkan secara tertulis. Selama belum, gunakan
 *     placeholder "Klien / Instansi" seperti pada seluruh entri di bawah.
 *
 * KHUSUS BPJS Ketenagakerjaan: struktur data ini SUDAH bisa menampung
 * `client: "BPJS Ketenagakerjaan"` kapan pun publikasinya dikonfirmasi.
 * Sampai saat itu, JANGAN mengisi nilai tersebut — tetap gunakan
 * placeholder generik agar situs tidak membuat klaim yang belum
 * diverifikasi.
 *
 * Cara menambah proyek baru:
 *   Tambahkan satu object baru ke array `projects`. PortfolioGrid &
 *   ProjectCard akan otomatis menyesuaikan tanpa perlu diubah.
 */

export type Project = {
  id: string;
  title: string;
  category: string;
  location?: string;
  year?: string;
  client?: string;
  description?: string;
  /**
   * Path/URL foto proyek asli. Kosongkan (undefined) jika foto belum
   * tersedia — ProjectCard akan otomatis menampilkan placeholder yang
   * jelas ditandai, bukan broken image.
   */
  image?: string;
  /** Beberapa foto proyek untuk slideshow autoplay di ProjectCard. */
  images?: string[];
};

/** Placeholder netral untuk client yang belum dikonfirmasi untuk dipublikasikan. */
export const UNCONFIRMED_CLIENT_LABEL = "Klien / Instansi";

/**
 * Menyusun alt text deskriptif dari data proyek — dipakai baik untuk foto
 * asli maupun untuk aria-label placeholder, supaya tidak pernah ada gambar
 * tanpa teks alternatif yang bermakna.
 */
export function getProjectAlt(project: Project): string {
  const parts = [project.title];
  if (project.location) parts.push(`di ${project.location}`);
  parts.push(`— kategori ${project.category}`);
  return parts.join(" ");
}

export const projects: Project[] = [
  {
    id: "produksi-media-promosi",
    title: "Produksi Media Promosi",
    category: "Printing & Media Promosi",
    location: "Medan",
    client: UNCONFIRMED_CLIENT_LABEL,
    description:
      "Produksi media promosi cetak untuk mendukung kebutuhan komunikasi visual klien.",
    images: [
    "/images/tes1.jpeg",
    "/images/tes-2.jpeg",
    "/images/tes-3.jpeg",
    "/images/tes-4.jpeg",
  ],
  },
  {
    id: "pengadaan-perlengkapan-kantor",
    title: "Pengadaan Perlengkapan Kantor",
    category: "Perlengkapan & Fasilitas Kantor",
    location: "Medan",
    client: UNCONFIRMED_CLIENT_LABEL,
    description:
      "Pengadaan dan pemasangan perlengkapan kantor untuk mendukung operasional harian.",
  },
  {
    id: "produksi-perlengkapan-event-korporat",
    title: "Produksi Perlengkapan Event Korporat",
    category: "Kebutuhan Event",
    location: "Medan",
    client: UNCONFIRMED_CLIENT_LABEL,
    description:
      "Penyediaan perlengkapan dan produksi pendukung untuk kegiatan/event perusahaan.",
  },
  {
    id: "pekerjaan-custom-borongan",
    title: "Pekerjaan Custom & Pengadaan Borongan",
    category: "Custom & Borongan",
    location: "Medan",
    client: UNCONFIRMED_CLIENT_LABEL,
    description:
      "Pekerjaan sesuai spesifikasi klien dalam jumlah besar atau kebutuhan gabungan.",
  },
  {
    id: "produksi-spanduk-banner",
    title: "Produksi Spanduk & Banner",
    category: "Printing & Media Promosi",
    location: "Medan",
    client: UNCONFIRMED_CLIENT_LABEL,
    description: "Produksi spanduk dan banner untuk kebutuhan promosi dan informasi.",
  },
];
