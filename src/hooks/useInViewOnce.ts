import { useEffect, useRef, useState } from "react";

/**
 * useInViewOnce — mendeteksi kapan elemen pertama kali masuk viewport.
 * Dipakai untuk animasi reveal subtle (opacity + translateY) tanpa
 * menambah dependency animasi eksternal. Berhenti mengamati setelah
 * terlihat sekali (tidak berulang tiap scroll, sesuai design system).
 */
export function useInViewOnce<T extends HTMLElement>(
  options: IntersectionObserverInit = { threshold: 0.15 }
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Jika browser tidak mendukung IntersectionObserver, langsung tampilkan.
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      });
    }, options);

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, inView };
}
