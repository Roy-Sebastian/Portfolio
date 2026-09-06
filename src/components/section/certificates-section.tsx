/* eslint-disable @next/next/no-img-element */
"use client";

import { DATA } from "@/data/resume";
import BlurFade from "@/components/magicui/blur-fade";
import { ExternalLink, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

const BLUR_FADE_DELAY = 0.04;

/* ─────────────────────────────────────────────
   Lightbox modal for certificate images
───────────────────────────────────────────── */
function CertLightbox({
  images,
  initialIndex,
  title,
  onClose,
}: {
  images: readonly string[];
  initialIndex: number;
  title: string;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(initialIndex);

  const prev = useCallback(
    () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1)),
    [images.length]
  );
  const next = useCallback(
    () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1)),
    [images.length]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, prev, next]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const content = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/92 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} certificate lightbox`}
    >
      {/* Close button */}
      <button
        className="absolute top-4 right-4 z-10 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
        onClick={onClose}
        aria-label="Close"
      >
        <X className="size-5" />
      </button>

      {/* Title + page indicator */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/80 text-sm font-medium bg-black/40 rounded-full px-4 py-1 backdrop-blur-sm">
        {title} &mdash; {current + 1} / {images.length}
      </div>

      {/* Image */}
      <div
        className="relative max-w-4xl w-[90vw] max-h-[85vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[current]}
          alt={`${title} page ${current + 1}`}
          className="w-full h-full object-contain rounded-lg shadow-2xl select-none"
          draggable={false}
        />
      </div>

      {/* Prev / Next */}
      {images.length > 1 && (
        <>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/25 transition-colors"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous image"
          >
            <ChevronLeft className="size-6" />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/25 transition-colors"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next image"
          >
            <ChevronRight className="size-6" />
          </button>
          {/* Dot indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                aria-label={`Go to page ${i + 1}`}
                className={`size-2 rounded-full transition-all ${
                  i === current ? "bg-white scale-125" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );

  return createPortal(content, document.body);
}

/* ─────────────────────────────────────────────
   Certificate Card
───────────────────────────────────────────── */
type Certificate = (typeof DATA.certificates)[number];

function CertCard({ cert, delay }: { cert: Certificate; delay: number }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <BlurFade delay={delay}>
        <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow hover:shadow-md transition-all duration-300 h-full">
          {/* Thumbnail — click to open lightbox */}
          <div
            className="relative w-full aspect-[4/3] overflow-hidden cursor-zoom-in bg-muted"
            onClick={() => setLightboxIndex(0)}
          >
            <img
              src={cert.images[0]}
              alt={cert.title}
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              draggable={false}
            />
            {/* Page count badge */}
            {cert.images.length > 1 && (
              <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs rounded-full px-2 py-0.5 backdrop-blur-sm">
                {cert.images.length} halaman
              </div>
            )}
            {/* Zoom hint */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <span className="text-white text-xs font-medium bg-black/40 rounded-full px-3 py-1">Klik untuk zoom</span>
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-1.5 p-4">
            <h3 className="font-semibold text-sm leading-tight line-clamp-2 text-foreground">
              {cert.title}
            </h3>
            <div className="flex items-center justify-between gap-2 mt-1">
              <div className="flex flex-col gap-0.5">
                <span className="text-xs text-muted-foreground font-medium">{cert.issuer}</span>
                <span className="text-xs text-muted-foreground">{cert.date}</span>
              </div>
              {cert.credentialUrl && cert.credentialUrl !== "#" && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1 text-xs text-primary hover:underline shrink-0"
                  title="Lihat Sertifikat"
                >
                  <ExternalLink className="size-3" />
                  Verifikasi
                </a>
              )}
            </div>
          </div>
        </div>
      </BlurFade>

      {lightboxIndex !== null && (
        <CertLightbox
          images={cert.images}
          initialIndex={lightboxIndex}
          title={cert.title}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}

/* ─────────────────────────────────────────────
   Main section export
───────────────────────────────────────────── */
export default function CertificatesSection() {
  const certs = DATA.certificates;
  if (!certs) return null;

  return (
    <div className="flex min-h-0 flex-col gap-y-8">
      <div className="flex flex-col gap-y-4 items-center justify-center">
        <div className="flex items-center w-full">
          <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
          <div className="border bg-primary z-10 rounded-xl px-4 py-1">
            <span className="text-background text-sm font-medium">My Certificates</span>
          </div>
          <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
        </div>
        <div className="flex flex-col gap-y-3 items-center justify-center">
          <BlurFade delay={BLUR_FADE_DELAY * 14}>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">My Certificates & Courses</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 14.5}>
            <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed text-balance text-center">
              Courses and certifications I&apos;ve completed to strengthen my skills in software development and web technologies.
            </p>
          </BlurFade>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto auto-rows-fr">
        {certs.map((cert, i) => (
          <BlurFade key={cert.credentialId} delay={BLUR_FADE_DELAY * 15 + i * 0.07} className="h-full">
            <CertCard
              cert={cert}
              delay={0}
            />
          </BlurFade>
        ))}
      </div>
    </div>
  );
}
