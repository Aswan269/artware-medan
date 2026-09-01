/**
 * DATA LAYANAN — JASA BORONGAN MEDAN
 * ----------------------------------------------------------------
 * Sumber data tunggal untuk section "Layanan".
 *
 * Cara menambah kategori baru:
 *   1. Tambahkan object baru ke array `services` di bawah.
 *   2. Isi `icon` dengan salah satu key yang tersedia di
 *      `src/components/ui/ServiceIcon.tsx`. Jika key tidak dikenali,
 *      ikon fallback generik akan otomatis dipakai — UI tidak akan rusak.
 *   3. Grid (ServiceGrid) akan otomatis menyesuaikan jumlah kolom/baris,
 *      tidak perlu mengubah komponen apa pun.
 *
 * Cara menambah daftar pekerjaan/item di dalam satu kategori:
 *   - Isi array `items` (opsional). Jika kosong/tidak diisi, kartu akan
 *     tetap tampil normal tanpa daftar item.
 *
 * PENTING: hanya 4 kategori awal yang sudah dikonfirmasi yang dimasukkan
 * sebagai data produksi. Jangan menambah kategori baru di file ini tanpa
 * konfirmasi dari pemilik bisnis.
 */

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
  items?: string[];
};

export const services: Service[] = [
  {
    id: "perlengkapan-fasilitas-kantor",
    title: "Perlengkapan & Fasilitas Kantor",
    description:
      "Berbagai kebutuhan fisik dan perlengkapan untuk mendukung fasilitas dan operasional kantor.",
    icon: "office",
  },
  {
    id: "kebutuhan-event",
    title: "Kebutuhan Event",
    description:
      "Berbagai kebutuhan produksi dan perlengkapan untuk kegiatan atau event perusahaan dan instansi.",
    icon: "event",
  },
  {
    id: "printing-media-promosi",
    title: "Printing & Media Promosi",
    description:
      "Kebutuhan cetak dan media promosi seperti spanduk, bendera, banner, dan kebutuhan sejenis.",
    icon: "printing",
  },
  {
    id: "custom-borongan",
    title: "Custom & Borongan",
    description:
      "Pekerjaan berdasarkan kebutuhan dan spesifikasi klien, termasuk pekerjaan dalam jumlah besar atau pengadaan berbagai kebutuhan sekaligus.",
    icon: "custom",
  },
];
