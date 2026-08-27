import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { Project } from "../../data/projects";
import { getProjectAlt } from "../../data/projects";
import PlaceholderImage from "../ui/PlaceholderImage";

interface ProjectCardProps {
  project: Project;
  /**
   * Kartu "featured" ditampilkan lebih besar (lebar 2 kolom di tablet/desktop,
   * aspect foto lebih landscape) untuk memberi focal point di awal grid.
   * Ini SATU-SATUNYA variasi ukuran yang dipakai — sistem yang konsisten,
   * bukan ukuran acak per kartu.
   */
  featured?: boolean;
}

/**
 * ProjectCard — "dossier-inspired project card".
 *
 * Struktur meta mengikuti pola dossier (kategori kecil mono uppercase →
 * judul → client → lokasi/tahun), tapi tanpa garis-garis berlebihan ala
 * invoice/surat jalan: hanya SATU hairline tipis yang memisahkan foto dari
 * blok teks, sisanya mengandalkan whitespace & typography hierarchy.
 *
 * Foto adalah elemen dominan (menempati ~60-70% tinggi kartu), sesuai
 * arahan bahwa Portofolio adalah tempat visual boleh lebih menonjol.
 */
export default function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const alt = getProjectAlt(project);
  const aspect = featured ? "aspect-[16/9]" : "aspect-[4/3]";
  const imageSources = project.images?.length ? project.images : project.image ? [project.image] : [];
  const [activeImage, setActiveImage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  useEffect(() => {
    if (imageSources.length < 2 || isPaused) return;

    const slideshow = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % imageSources.length);
    }, 4000);

    return () => window.clearInterval(slideshow);
  }, [imageSources.length, isPaused]);

  useEffect(() => {
    if (!isGalleryOpen && selectedImage === null) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (selectedImage !== null) {
        setSelectedImage(null);
      } else {
        setIsGalleryOpen(false);
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isGalleryOpen, selectedImage]);

  const openGallery = () => setIsGalleryOpen(true);

  return (
    <article
      className="h-full flex flex-col bg-bg-elevated border border-hairline rounded-md overflow-hidden cursor-pointer"
      role="button"
      tabIndex={0}
      aria-label={`Buka galeri foto ${project.category}`}
      onClick={openGallery}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openGallery();
        }
      }}
    >
      {imageSources.length ? (
        <div
          className={`relative w-full ${aspect} overflow-hidden`}
          aria-roledescription={imageSources.length > 1 ? "carousel" : undefined}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          {imageSources.map((source, index) => (
            <img
              key={source}
              src={source}
              alt={index === activeImage ? alt : ""}
              aria-hidden={index !== activeImage}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                index === activeImage ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          {imageSources.length > 1 && (
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5" aria-label="Pilih foto proyek">
              {imageSources.map((source, index) => (
                <button
                  key={source}
                  type="button"
                  aria-label={`Tampilkan foto ${index + 1}`}
                  aria-current={index === activeImage}
                  onClick={(event) => {
                    event.stopPropagation();
                    setActiveImage(index);
                  }}
                  className={`h-1.5 rounded-full transition-all ${
                    index === activeImage ? "w-5 bg-white" : "w-1.5 bg-white/60"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <PlaceholderImage label={alt} aspect={aspect} />
      )}

      <div className="flex-1 flex flex-col p-5 md:p-6 border-t border-hairline">
        <span className="font-mono text-xs tracking-wide uppercase text-amber-dark">
          {project.category}
        </span>

        <h3
          className={`mt-2 font-display font-semibold text-text leading-snug ${
            featured ? "text-xl md:text-2xl" : "text-lg"
          }`}
        >
          {project.title}
        </h3>

        {project.description && (
          <p className="mt-2 text-sm text-text-muted leading-relaxed">{project.description}</p>
        )}

        <div className="mt-auto pt-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          {project.client && (
            <span className="text-sm text-text-muted">{project.client}</span>
          )}
          {(project.location || project.year) && (
            <span className="font-mono text-xs tracking-wide uppercase text-text-faint">
              {[project.location, project.year].filter(Boolean).join(" · ")}
            </span>
          )}
        </div>
      </div>

      {isGalleryOpen && createPortal(
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby={`gallery-title-${project.id}`}
          onClick={() => setIsGalleryOpen(false)}
        >
          <div
            className="relative max-h-full w-full max-w-5xl overflow-y-auto rounded-md bg-bg-elevated p-5 md:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <span className="font-mono text-xs uppercase tracking-wide text-amber-dark">
                  {project.category}
                </span>
                <h2 id={`gallery-title-${project.id}`} className="mt-2 text-xl font-display font-semibold text-text md:text-2xl">
                  {project.title}
                </h2>
              </div>
              <button
                type="button"
                aria-label="Tutup galeri"
                onClick={() => setIsGalleryOpen(false)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-hairline text-xl text-text-muted hover:bg-bg-muted"
              >
                ×
              </button>
            </div>

            {imageSources.length ? (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                {imageSources.map((source, index) => (
                  <button
                    key={source}
                    type="button"
                    aria-label={`Perbesar foto ${index + 1}`}
                    onClick={() => {
                      setIsGalleryOpen(false);
                      setSelectedImage(index);
                    }}
                    className="group relative aspect-[4/3] w-full overflow-hidden rounded-sm"
                  >
                    <img
                      src={source}
                      alt={`${alt}, foto ${index + 1}`}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <span className="absolute inset-0 flex items-center justify-center bg-black/0 text-white opacity-0 transition-opacity group-hover:bg-black/25 group-hover:opacity-100">
                      <span className="rounded-full bg-black/60 px-3 py-1.5 text-xs">Perbesar</span>
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <PlaceholderImage label={alt} aspect="aspect-[4/3]" />
            )}
          </div>
        </div>,
        document.body,
      )}

      {selectedImage !== null && imageSources[selectedImage] && createPortal(
        <div
          className="fixed inset-0 z-[60] flex h-[100dvh] w-screen items-center justify-center bg-black/85 p-6 md:p-10"
          role="dialog"
          aria-modal="true"
          aria-label={`Foto ${selectedImage + 1} dari ${imageSources.length}`}
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative flex h-full w-full items-center justify-center" onClick={(event) => event.stopPropagation()}>
            <img
              src={imageSources[selectedImage]}
              alt={`${alt}, foto ${selectedImage + 1}`}
              className="max-h-[calc(100dvh-3rem)] max-w-[calc(100vw-3rem)] rounded-lg object-contain shadow-2xl md:max-h-[calc(100dvh-5rem)] md:max-w-[calc(100vw-5rem)]"
            />
            <button
              type="button"
              aria-label="Tutup foto diperbesar"
              onClick={() => setSelectedImage(null)}
              className="fixed left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-2xl text-black hover:bg-white md:left-6 md:top-6"
            >
              ×
            </button>
          </div>
        </div>,
        document.body,
      )}
    </article>
  );
}
