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

  return (
    <article className="h-full flex flex-col bg-bg-elevated border border-hairline rounded-md overflow-hidden">
      {project.image ? (
        <img src={project.image} alt={alt} className={`w-full ${aspect} object-cover`} />
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
    </article>
  );
}
