/**
 * DATA CAPABILITY — JASA BORONGAN MEDAN
 * ----------------------------------------------------------------
 * Daftar cakupan kemampuan Jasa Borongan Medan untuk section "Tentang Jasa Borongan Medan".
 *
 * PENTING:
 * - Ini adalah gambaran CAKUPAN kemampuan, bukan katalog produk final.
 * - Item "Kebutuhan Pendukung Lainnya" sengaja bersifat terbuka (furniture,
 *   bendera, lampu, display, pekerjaan custom) — jangan menambah contoh
 *   produk lain yang belum dikonfirmasi pemilik bisnis.
 * - Menambah kategori baru cukup menambah object baru ke array ini;
 *   nomor urut pada tampilan dihitung otomatis dari posisi array.
 */

export type Capability = {
  id: string;
  label: string;
  description?: string;
};

export const capabilities: Capability[] = [
  {
    id: "kebutuhan-kantor",
    label: "Kebutuhan Kantor",
    description:
      "Perlengkapan dan kebutuhan operasional untuk mendukung aktivitas kantor sehari-hari.",
  },
  {
    id: "event-aktivasi",
    label: "Event & Aktivasi",
    description:
      "Perlengkapan dan produksi pendukung untuk kegiatan atau aktivasi perusahaan dan instansi.",
  },
  {
    id: "printing-media-promosi",
    label: "Printing & Media Promosi",
    description: "Produksi cetak dan media promosi sesuai kebutuhan komunikasi visual.",
  },
  {
    id: "custom-borongan",
    label: "Custom & Borongan",
    description:
      "Pekerjaan yang disesuaikan dengan spesifikasi klien, termasuk pengerjaan dalam jumlah besar.",
  },
  {
    id: "kebutuhan-pendukung-lainnya",
    label: "Kebutuhan Pendukung Lainnya",
    description:
      "Termasuk furniture, bendera, lampu, display, dan kebutuhan custom lain di luar kategori standar.",
  },
  
];
