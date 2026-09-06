/* eslint-disable @next/next/no-img-element */
"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ChevronLeft, ChevronRight, Code2, GitBranch, X, ZoomIn } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import Markdown from "react-markdown";
import { createPortal } from "react-dom";
import { Icons } from "@/components/icons";

/* ──────────────────────────────────────────────────────────────
   GitHub Preview Card — shown when project has no screenshots
────────────────────────────────────────────────────────────── */
function GithubPreviewCard({
  title,
  tags,
  href,
}: {
  title: string;
  tags: readonly string[];
  href?: string;
}) {
  let repoName = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  if (href && href.includes("github.com/")) {
    const parts = href.split("github.com/")[1]?.split("/");
    if (parts && parts.length >= 2) {
      repoName = `${parts[0]}/${parts[1]}`;
    } else if (parts && parts[0]) {
      repoName = parts[0];
    }
  } else {
    repoName = `Roy-Sebastian/${repoName}`;
  }

  const primaryTech = tags[0] || "Code";

  const getLanguageColor = (tech: string) => {
    const t = tech.toLowerCase();
    if (t.includes("go")) return "bg-cyan-400";
    if (t.includes("react") || t.includes("next")) return "bg-sky-400";
    if (t.includes("node") || t.includes("express") || t.includes("js") || t.includes("javascript")) return "bg-amber-400";
    if (t.includes("type") || t.includes("ts")) return "bg-blue-500";
    if (t.includes("postgre") || t.includes("sql")) return "bg-indigo-400";
    if (t.includes("laravel") || t.includes("php")) return "bg-red-500";
    return "bg-emerald-400";
  };

  const cardContent = (
    <div className="w-full h-48 bg-[#0d1117] text-white p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden border-b border-border/40 select-none group/gh cursor-pointer hover:bg-[#121721] transition-colors">
      {/* Grid background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293720_1px,transparent_1px),linear-gradient(to_bottom,#1f293720_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

      {/* Decorative ambient lighting */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl pointer-events-none group-hover/gh:bg-primary/35 transition-all duration-500" />
      <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-blue-500/10 rounded-full blur-xl pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="p-1.5 rounded-md bg-white/10 text-white shrink-0 group-hover/gh:bg-white/20 transition-colors">
            <Icons.github className="size-4" />
          </div>
          <span className="text-xs font-mono text-gray-400 truncate max-w-[200px] group-hover/gh:text-gray-200 transition-colors">
            {repoName}
          </span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-[10px] font-medium font-mono px-2 py-0.5 rounded-full border border-gray-700 bg-gray-800/80 text-gray-300">
            Public
          </span>
          <ArrowUpRight className="size-3.5 text-gray-400 group-hover/gh:text-white group-hover/gh:translate-x-0.5 group-hover/gh:-translate-y-0.5 transition-all" />
        </div>
      </div>

      {/* Center Body */}
      <div className="relative z-10 my-auto pt-2">
        <h4 className="text-sm font-semibold tracking-tight text-white line-clamp-1 mb-1.5 group-hover/gh:text-primary-foreground transition-colors">
          {title}
        </h4>
        <div className="flex items-center gap-2 text-xs text-gray-400 font-mono">
          <div className="flex items-center gap-1 text-gray-400">
            <GitBranch className="size-3.5" />
            <span className="text-[11px]">main</span>
          </div>
          <span className="text-gray-600">•</span>
          <div className="flex items-center gap-1.5">
            <span className={cn("size-2 rounded-full", getLanguageColor(primaryTech))} />
            <span className="text-gray-300 text-[11px] font-sans">{primaryTech}</span>
          </div>
        </div>
      </div>

      {/* Footer Badges */}
      <div className="relative z-10 flex items-center justify-between pt-2 border-t border-gray-800/80">
        <div className="flex items-center gap-1.5 overflow-hidden">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono bg-gray-800/90 text-gray-300 px-2 py-0.5 rounded border border-gray-700/60"
            >
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="text-[10px] font-mono text-gray-500">+{tags.length - 3}</span>
          )}
        </div>
        <div className="flex items-center gap-1 text-[11px] font-mono text-gray-400 group-hover/gh:text-gray-200 transition-colors">
          <Code2 className="size-3.5" />
          <span className="text-[10px]">Repository</span>
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full h-48 focus:outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}

/* ──────────────────────────────────────────────────────────────
   Lightbox — full-screen modal with left/right navigation
────────────────────────────────────────────────────────────── */
function Lightbox({
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

  const prev = useCallback(() => {
    setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  }, [images.length]);

  const next = useCallback(() => {
    setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, prev, next]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const content = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} image lightbox`}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 size-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
        aria-label="Close lightbox"
      >
        <X className="size-5" />
      </button>

      {/* Counter */}
      {images.length > 1 && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-black/50 text-white text-xs px-3 py-1 rounded-full font-medium">
          {current + 1} / {images.length}
        </div>
      )}

      {/* Left arrow */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); prev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 size-10 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeft className="size-6" />
        </button>
      )}

      {/* Right arrow */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); next(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 size-10 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors"
          aria-label="Next image"
        >
          <ChevronRight className="size-6" />
        </button>
      )}

      {/* Image strip */}
      <div
        className="relative w-full max-w-5xl mx-auto px-16 flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="overflow-hidden w-full rounded-xl shadow-2xl">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {images.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`${title} screenshot ${idx + 1}`}
                className="w-full shrink-0 object-contain max-h-[80vh] rounded-xl select-none"
                draggable={false}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Dot indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => { e.stopPropagation(); setCurrent(idx); }}
              className={cn(
                "h-1.5 rounded-full transition-all duration-200",
                idx === current ? "bg-white w-5" : "bg-white/40 w-1.5"
              )}
              aria-label={`Go to image ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );

  // Render into document.body via portal to escape card overflow:hidden
  if (typeof window === "undefined") return null;
  return createPortal(content, document.body);
}

/* ──────────────────────────────────────────────────────────────
   Small inline slider shown inside the card (thumbnail)
────────────────────────────────────────────────────────────── */
function CardSlider({
  images,
  title,
  onClickImage,
}: {
  images: readonly string[];
  title: string;
  onClickImage: (idx: number) => void;
}) {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-play slideshow every 3 seconds (pauses on hover)
  useEffect(() => {
    if (images.length <= 1 || isHovered) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(timer);
  }, [images.length, isHovered]);

  if (images.length === 0) return <div className="w-full h-48 bg-muted" />;

  const prev = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  };
  const next = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));
  };

  return (
    <div
      className="relative w-full h-48 overflow-hidden group/slider bg-slate-950"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slides (Smooth Crossfade Transition) */}
      <div className="relative w-full h-full">
        {images.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`${title} screenshot ${idx + 1}`}
            className={cn(
              "absolute inset-0 w-full h-48 object-cover object-top cursor-zoom-in transition-opacity duration-700 ease-in-out select-none",
              idx === current ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            )}
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onClickImage(idx); }}
            draggable={false}
          />
        ))}
      </div>

      {/* Zoom hint overlay */}
      <div
        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-opacity pointer-events-none z-20"
      >
        <div className="bg-black/40 backdrop-blur-xs rounded-full p-2 text-white">
          <ZoomIn className="size-5" />
        </div>
      </div>

      {/* Prev / Next — only shown when multiple images */}
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-30 size-7 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-opacity"
            aria-label="Previous image"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-30 size-7 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-opacity"
            aria-label="Next image"
          >
            <ChevronRight className="size-4" />
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-30">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCurrent(idx); }}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  idx === current ? "bg-white w-3.5" : "bg-white/40 w-1.5"
                )}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   ProjectCard
────────────────────────────────────────────────────────────── */
interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  images?: readonly string[];
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  image,
  video,
  images,
  links,
  className,
}: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Build image list: prefer `images` array, fallback to single `image`
  const imageList: readonly string[] =
    images && images.length > 0 ? images : image ? [image] : [];

  // Find the GitHub source link if any
  const githubLink = links?.find(
    (l) => l.type === "Source" || l.href.includes("github.com")
  );

  return (
    <>
      {/* Lightbox portal */}
      {lightboxIndex !== null && imageList.length > 0 && (
        <Lightbox
          images={imageList}
          initialIndex={lightboxIndex}
          title={title}
          onClose={() => setLightboxIndex(null)}
        />
      )}

      <div
        className={cn(
          "flex flex-col h-full border border-border rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 bg-card",
          className
        )}
      >
        {/* Media area */}
        <div className="relative shrink-0">
          {video ? (
            <video
              src={video}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-48 object-cover object-top"
            />
          ) : imageList.length > 0 ? (
            <CardSlider
              images={imageList}
              title={title}
              onClickImage={(idx) => setLightboxIndex(idx)}
            />
          ) : (
            <GithubPreviewCard
              title={title}
              tags={tags}
              href={githubLink?.href || href}
            />
          )}
        </div>

        {/* Card body */}
        <div className="p-5 flex flex-col gap-3 flex-1">
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold text-base text-foreground leading-snug">{title}</h3>
            <time className="text-xs text-muted-foreground font-sans">{dates}</time>
          </div>

          <div className="text-xs prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
            <Markdown>{description}</Markdown>
          </div>

          <div className="mt-auto flex flex-col gap-2 pt-1">
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    className="text-[10px] font-medium border border-border/60 bg-muted/60 text-muted-foreground px-2 py-0.5 rounded-md"
                    variant="outline"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {links && links.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5">
                {links.map((link, idx) => (
                  <Link
                    href={link.href}
                    key={idx}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Badge
                      className="flex items-center gap-1 text-[11px] bg-primary text-primary-foreground hover:bg-primary/90 px-2.5 py-1 rounded-md font-medium"
                      variant="default"
                    >
                      {link.icon}
                      {link.type}
                    </Badge>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
