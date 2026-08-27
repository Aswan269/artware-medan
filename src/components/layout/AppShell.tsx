import type { ReactNode } from "react";
import Navbar from "../navigation/Navbar";
import Footer from "./Footer";

interface AppShellProps {
  children: ReactNode;
}

/**
 * AppShell — kerangka global aplikasi.
 * Sprint 6: menambahkan Footer setelah <main> (sudah diantisipasi sejak
 * komentar Sprint 1 di bawah). Navbar & skip-link tidak diubah.
 */
export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen w-full bg-bg text-text flex flex-col">
      <a href="#main-content" className="skip-link">
        Lewati ke konten utama
      </a>
      <Navbar />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
