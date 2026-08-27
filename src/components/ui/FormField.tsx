import type { ReactNode } from "react";

interface FormFieldProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
}

/**
 * FormField — label selalu terlihat (bukan placeholder), indikasi wajib
 * yang accessible (bukan cuma tanda "*"), dan error message yang terhubung
 * ke field via aria-describedby (id={htmlFor}-error), sesuai §10 design
 * system + persyaratan aksesibilitas Sprint 5.
 *
 * Error TIDAK hanya mengandalkan warna: disertai ikon peringatan + teks
 * pesan spesifik.
 */
export default function FormField({
  id,
  label,
  required = false,
  error,
  hint,
  children,
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="font-mono text-xs tracking-wide uppercase text-text-muted"
      >
        {label}
        {required && (
          <>
            <span aria-hidden="true" className="text-amber-dark">
              {" "}
              *
            </span>
            <span className="sr-only"> (wajib diisi)</span>
          </>
        )}
      </label>

      {children}

      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          className="flex items-start gap-1.5 text-sm text-error"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            className="mt-0.5 shrink-0"
          >
            <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4" />
            <path d="M8 5v3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            <circle cx="8" cy="10.75" r="0.75" fill="currentColor" />
          </svg>
          <span>{error}</span>
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-sm text-text-faint">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
