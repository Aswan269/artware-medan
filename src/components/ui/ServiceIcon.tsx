import type { SVGProps } from "react";

type IconComponent = (props: SVGProps<SVGSVGElement>) => React.JSX.Element;

const baseProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const OfficeIcon: IconComponent = (props) => (
  <svg {...baseProps} {...props}>
    <path d="M4 21V6.5L12 3l8 3.5V21" stroke="currentColor" />
    <path d="M4 21h16" stroke="currentColor" />
    <path d="M9 21v-6h6v6" stroke="currentColor" />
    <path d="M9 11h.01M15 11h.01M9 8h.01M15 8h.01" stroke="currentColor" />
  </svg>
);

const EventIcon: IconComponent = (props) => (
  <svg {...baseProps} {...props}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="1.5" stroke="currentColor" />
    <path d="M3.5 9.5h17" stroke="currentColor" />
    <path d="M8 3v3.5M16 3v3.5" stroke="currentColor" />
    <path d="M7.5 13.5h2M11 13.5h2M14.5 13.5h2M7.5 17h2M11 17h2" stroke="currentColor" />
  </svg>
);

const PrintingIcon: IconComponent = (props) => (
  <svg {...baseProps} {...props}>
    <path d="M6.5 8.5V3.5h11v5" stroke="currentColor" />
    <rect x="3.5" y="8.5" width="17" height="8" rx="1.25" stroke="currentColor" />
    <path d="M6.5 15.5h11v5h-11z" stroke="currentColor" />
    <path d="M6.5 12h.01" stroke="currentColor" />
  </svg>
);

const CustomIcon: IconComponent = (props) => (
  <svg {...baseProps} {...props}>
    <path d="M12 3.5 20 8v8l-8 4.5L4 16V8z" stroke="currentColor" />
    <path d="M4 8l8 4.5L20 8" stroke="currentColor" />
    <path d="M12 12.5V21" stroke="currentColor" />
  </svg>
);

/**
 * Ikon fallback — dipakai otomatis jika kategori baru ditambahkan di
 * services.ts tanpa key ikon yang sudah terdaftar. Memastikan grid tetap
 * aman ditambah tanpa perlu menyentuh komponen ikon setiap saat.
 */
const GenericIcon: IconComponent = (props) => (
  <svg {...baseProps} {...props}>
    <rect x="4" y="4" width="7" height="7" rx="1" stroke="currentColor" />
    <rect x="13" y="4" width="7" height="7" rx="1" stroke="currentColor" />
    <rect x="4" y="13" width="7" height="7" rx="1" stroke="currentColor" />
    <rect x="13" y="13" width="7" height="7" rx="1" stroke="currentColor" />
  </svg>
);

const iconRegistry: Record<string, IconComponent> = {
  office: OfficeIcon,
  event: EventIcon,
  printing: PrintingIcon,
  custom: CustomIcon,
};

interface ServiceIconProps extends SVGProps<SVGSVGElement> {
  name: string;
}

/**
 * ServiceIcon — resolusi ikon berdasarkan string key dari data layanan.
 * Key yang tidak dikenali tidak menyebabkan error, hanya jatuh ke ikon
 * generik (lihat GenericIcon di atas).
 */
export default function ServiceIcon({ name, ...props }: ServiceIconProps) {
  const Icon = iconRegistry[name] ?? GenericIcon;
  return <Icon {...props} />;
}
