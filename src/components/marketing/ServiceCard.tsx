import type { Service } from "../../data/services";
import ServiceIcon from "../ui/ServiceIcon";

interface ServiceCardProps {
  service: Service;
}

/**
 * ServiceCard — tidak pernah menerima nama/deskripsi layanan yang di-hardcode.
 * Semua konten berasal dari prop `service` (lihat src/data/services.ts).
 *
 * Catatan desain: kartu ini SENGAJA tidak diberi hover-affordance warna amber
 * seperti pada draft awal design system, karena kartu belum bisa diklik
 * (belum ada halaman detail layanan pada Sprint 2 ini). Memberi hover warna
 * aksen tanpa aksi nyata akan menyesatkan pengguna. Border hanya sedikit
 * menegas saat hover sebagai micro-polish, bukan penanda "bisa diklik".
 */
export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="group h-full bg-bg-elevated border border-hairline rounded-md p-6 md:p-7 flex flex-col transition-colors duration-fast hover:border-hairline-strong">
      <ServiceIcon
        name={service.icon}
        className="w-7 h-7 md:w-8 md:h-8 text-navy"
        strokeWidth={1.5}
      />

      <h3 className="mt-5 font-display font-semibold text-lg md:text-xl text-text leading-snug">
        {service.title}
      </h3>

      <p className="mt-2 text-sm md:text-base text-text-muted leading-relaxed">
        {service.description}
      </p>

      {service.items && service.items.length > 0 && (
        <ul className="mt-4 pt-4 border-t border-hairline flex flex-col gap-1.5">
          {service.items.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-text-muted">
              <span className="mt-2 w-1 h-1 shrink-0 bg-amber-dark" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
