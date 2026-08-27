export interface NavItem {
  label: string;
  href: string;
}

/**
 * href di bawah mengarah ke ID section yang sudah ada di homepage
 * (sama seperti anchor yang dipakai Footer sejak Sprint 6):
 *   Layanan    -> #layanan     (ServiceGrid, Sprint 2)
 *   Portofolio -> #portofolio  (PortfolioGrid, Sprint 3)
 *   Tentang    -> #tentang     (CapabilitySection, Sprint 4)
 *   Kontak     -> #kontak      (ContactInfo, Sprint 6)
 */
export const navItems: NavItem[] = [
  { label: "Beranda", href: "/" },
  { label: "Layanan", href: "#layanan" },
  { label: "Portofolio", href: "#portofolio" },
  { label: "Tentang", href: "#tentang" },
  { label: "Kontak", href: "#kontak" },
];
