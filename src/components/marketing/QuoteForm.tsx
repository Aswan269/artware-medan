import { useId, useState } from "react";
import type { FormEvent } from "react";
import FormField from "../ui/FormField";
import Button from "../ui/Button";
import { services } from "../../data/services";
import { CONTACT } from "../../config/contact";

/**
 * Struktur data form — dirancang agar mudah dipakai untuk integrasi
 * WhatsApp/API pada sprint berikutnya (belum diimplementasikan di sini).
 */
export type QuoteFormData = {
  name: string;
  company?: string;
  whatsapp: string;
  email?: string;
  category: string; // menyimpan Service.id, bukan label — sumber: src/data/services.ts
  description: string;
  quantity?: string;
  deadline?: string;
  location?: string;
  notes?: string;
};

type FormErrors = Partial<Record<keyof QuoteFormData, string>>;

const emptyForm: QuoteFormData = {
  name: "",
  company: "",
  whatsapp: "",
  email: "",
  category: "",
  description: "",
  quantity: "",
  deadline: "",
  location: "",
  notes: "",
};

/** Style input/select/textarea konsisten dengan §10 design system (underline, bukan kotak penuh). */
const inputClass =
  "w-full font-body text-base text-text bg-bg-elevated border-0 border-b-[1.5px] " +
  "border-hairline-strong rounded-none px-1 py-3 transition-colors duration-fast " +
  "focus:border-amber placeholder:text-text-faint";

const inputErrorClass = "border-error";

function isValidWhatsapp(raw: string): boolean {
  const normalized = raw.replace(/[\s\-().]/g, "");
  return /^\+?\d{8,15}$/.test(normalized);
}

function isValidEmail(raw: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw.trim());
}

function validate(data: QuoteFormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.name.trim()) {
    errors.name = "Nama wajib diisi.";
  }

  if (!data.whatsapp.trim()) {
    errors.whatsapp = "Nomor WhatsApp wajib diisi.";
  } else if (!isValidWhatsapp(data.whatsapp)) {
    errors.whatsapp =
      "Nomor WhatsApp tidak valid. Gunakan format seperti 08xxxxxxxxxx atau +62xxxxxxxxxx.";
  }

  if (!data.category) {
    errors.category = "Pilih kategori kebutuhan.";
  }

  if (!data.description.trim()) {
    errors.description = "Deskripsi kebutuhan wajib diisi.";
  }

  if (data.email && data.email.trim() && !isValidEmail(data.email)) {
    errors.email = "Format email tidak valid.";
  }

  return errors;
}

function buildWhatsappSummary(data: QuoteFormData, categoryLabel: string): string {
  const lines = [
    "Halo Artware Medan, saya ingin menanyakan penawaran dengan detail berikut:",
    "",
    `Nama: ${data.name}`,
  ];
  if (data.company) lines.push(`Perusahaan/Instansi: ${data.company}`);
  lines.push(`WhatsApp: ${data.whatsapp}`);
  if (data.email) lines.push(`Email: ${data.email}`);
  lines.push(`Kategori Kebutuhan: ${categoryLabel}`);
  lines.push(`Deskripsi Kebutuhan: ${data.description}`);
  if (data.quantity) lines.push(`Perkiraan Jumlah: ${data.quantity}`);
  if (data.deadline) lines.push(`Target/Deadline: ${data.deadline}`);
  if (data.location) lines.push(`Lokasi Pekerjaan/Pengiriman: ${data.location}`);
  if (data.notes) lines.push(`Catatan Tambahan: ${data.notes}`);
  return lines.join("\n");
}

/**
 * QuoteForm — HANYA validasi & penyiapan data di sisi frontend.
 * Tidak ada fetch/API call/pengiriman ke server (sesuai batasan Sprint 5).
 * Saat valid, data disiapkan dalam bentuk ringkasan + link WhatsApp berisi
 * pesan pre-filled memakai nomor placeholder dari src/config/contact.ts —
 * BUKAN nomor baru yang dikarang.
 */
export default function QuoteForm() {
  const idPrefix = useId();
  const [form, setForm] = useState<QuoteFormData>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedData, setSubmittedData] = useState<QuoteFormData | null>(null);

  const fieldId = (name: string) => `${idPrefix}-${name}`;

  function updateField<K extends keyof QuoteFormData>(key: K, value: QuoteFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSubmittedData(form);
    } else {
      // Pindahkan fokus ke field bermasalah pertama agar mudah dikoreksi via keyboard.
      const firstErrorKey = Object.keys(validationErrors)[0];
      const el = document.getElementById(fieldId(firstErrorKey));
      el?.focus();
    }
  }

  function handleNewRequest() {
    setForm(emptyForm);
    setErrors({});
    setSubmittedData(null);
  }

  if (submittedData) {
    const categoryLabel =
      services.find((s) => s.id === submittedData.category)?.title ?? submittedData.category;
    const whatsappMessage = buildWhatsappSummary(submittedData, categoryLabel);
    const whatsappHref = `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    return (
      <div className="border border-hairline rounded-md bg-bg-elevated p-6 md:p-8">
        <h3 className="font-display font-semibold text-xl md:text-2xl text-text">
          Data permintaan Anda sudah siap.
        </h3>
        <p className="mt-2 text-sm md:text-base text-text-muted leading-relaxed">
          Permintaan belum terkirim ke Artware secara otomatis. Silakan lanjutkan melalui
          WhatsApp agar tim kami dapat segera menindaklanjuti kebutuhan Anda.
        </p>

        <dl className="mt-6 border-t border-hairline">
          {[
            ["Nama", submittedData.name],
            ["Perusahaan / Instansi", submittedData.company],
            ["WhatsApp", submittedData.whatsapp],
            ["Email", submittedData.email],
            ["Kategori Kebutuhan", categoryLabel],
            ["Deskripsi Kebutuhan", submittedData.description],
            ["Perkiraan Jumlah", submittedData.quantity],
            ["Target / Deadline", submittedData.deadline],
            ["Lokasi Pekerjaan / Pengiriman", submittedData.location],
            ["Catatan Tambahan", submittedData.notes],
          ]
            .filter(([, value]) => Boolean(value))
            .map(([label, value]) => (
              <div key={label} className="py-3 border-b border-hairline flex flex-col gap-0.5">
                <dt className="font-mono text-xs tracking-wide uppercase text-text-faint">
                  {label}
                </dt>
                <dd className="text-sm md:text-base text-text">{value}</dd>
              </div>
            ))}
        </dl>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Button variant="primary" href={whatsappHref} target="_blank" rel="noreferrer">
            Lanjutkan via WhatsApp
          </Button>
          <Button as="button" type="button" variant="ghost" onClick={handleNewRequest}>
            Kirim permintaan baru
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
      <fieldset className="flex flex-col gap-5">
        <legend className="block mb-5 font-mono text-xs tracking-wide uppercase text-text-faint">
          Kontak
        </legend>

        <FormField id={fieldId("name")} label="Nama" required error={errors.name}>
          <input
            id={fieldId("name")}
            name="name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? `${fieldId("name")}-error` : undefined}
            placeholder="Nama lengkap Anda"
            className={`${inputClass} ${errors.name ? inputErrorClass : ""}`}
          />
        </FormField>

        <FormField id={fieldId("company")} label="Nama Perusahaan / Instansi">
          <input
            id={fieldId("company")}
            name="company"
            type="text"
            autoComplete="organization"
            value={form.company}
            onChange={(e) => updateField("company", e.target.value)}
            placeholder="Jika mewakili perusahaan atau instansi"
            className={inputClass}
          />
        </FormField>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField
            id={fieldId("whatsapp")}
            label="Nomor WhatsApp"
            required
            error={errors.whatsapp}
          >
            <input
              id={fieldId("whatsapp")}
              name="whatsapp"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={form.whatsapp}
              onChange={(e) => updateField("whatsapp", e.target.value)}
              aria-required="true"
              aria-invalid={!!errors.whatsapp}
              aria-describedby={errors.whatsapp ? `${fieldId("whatsapp")}-error` : undefined}
              placeholder="08xxxxxxxxxx"
              className={`${inputClass} ${errors.whatsapp ? inputErrorClass : ""}`}
            />
          </FormField>

          <FormField id={fieldId("email")} label="Email" error={errors.email}>
            <input
              id={fieldId("email")}
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? `${fieldId("email")}-error` : undefined}
              placeholder="nama@perusahaan.com"
              className={`${inputClass} ${errors.email ? inputErrorClass : ""}`}
            />
          </FormField>
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-5">
        <legend className="block mb-5 font-mono text-xs tracking-wide uppercase text-text-faint">
          Kebutuhan Pekerjaan
        </legend>

        <FormField
          id={fieldId("category")}
          label="Kategori Kebutuhan"
          required
          error={errors.category}
        >
          <select
            id={fieldId("category")}
            name="category"
            value={form.category}
            onChange={(e) => updateField("category", e.target.value)}
            aria-required="true"
            aria-invalid={!!errors.category}
            aria-describedby={errors.category ? `${fieldId("category")}-error` : undefined}
            className={`${inputClass} ${errors.category ? inputErrorClass : ""}`}
          >
            <option value="">Pilih kategori kebutuhan</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.title}
              </option>
            ))}
          </select>
        </FormField>

        <FormField
          id={fieldId("description")}
          label="Deskripsi Kebutuhan"
          required
          error={errors.description}
        >
          <textarea
            id={fieldId("description")}
            name="description"
            rows={5}
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
            aria-required="true"
            aria-invalid={!!errors.description}
            aria-describedby={errors.description ? `${fieldId("description")}-error` : undefined}
            placeholder="Jelaskan jenis pekerjaan atau kebutuhan Anda — misalnya kebutuhan cetak, perlengkapan kantor, furniture, atau event."
            className={`${inputClass} resize-y ${errors.description ? inputErrorClass : ""}`}
          />
        </FormField>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField id={fieldId("quantity")} label="Perkiraan Jumlah">
            <input
              id={fieldId("quantity")}
              name="quantity"
              type="text"
              value={form.quantity}
              onChange={(e) => updateField("quantity", e.target.value)}
              placeholder="mis. 50 pcs / 2 set"
              className={inputClass}
            />
          </FormField>

          <FormField id={fieldId("deadline")} label="Target / Deadline">
            <input
              id={fieldId("deadline")}
              name="deadline"
              type="text"
              value={form.deadline}
              onChange={(e) => updateField("deadline", e.target.value)}
              placeholder="mis. akhir bulan ini"
              className={inputClass}
            />
          </FormField>
        </div>

        <FormField id={fieldId("location")} label="Lokasi Pekerjaan / Pengiriman">
          <input
            id={fieldId("location")}
            name="location"
            type="text"
            value={form.location}
            onChange={(e) => updateField("location", e.target.value)}
            placeholder="mis. kantor Anda di Medan / lokasi event"
            className={inputClass}
          />
        </FormField>

        <FormField id={fieldId("notes")} label="Catatan Tambahan">
          <textarea
            id={fieldId("notes")}
            name="notes"
            rows={3}
            value={form.notes}
            onChange={(e) => updateField("notes", e.target.value)}
            placeholder="Informasi lain yang perlu diketahui tim Artware"
            className={`${inputClass} resize-y`}
          />
        </FormField>
      </fieldset>

      <div>
        <Button as="button" type="submit" variant="primary">
          Minta Penawaran
        </Button>
        <p className="mt-3 text-sm text-text-faint">
          Data akan disiapkan untuk dikirim melalui WhatsApp pada langkah berikutnya — belum
          terkirim otomatis ke server kami.
        </p>
      </div>
    </form>
  );
}
