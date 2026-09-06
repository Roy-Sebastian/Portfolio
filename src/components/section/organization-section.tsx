/* eslint-disable @next/next/no-img-element */
'use client';
import { DATA } from '@/data/resume';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

function LogoImage({ src, alt }: { src: string; alt: string }) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return (
      <div className="size-16 border border-border/40 rounded-full shadow-xs bg-muted flex items-center justify-center font-semibold text-base text-muted-foreground flex-none shrink-0 overflow-hidden">
        {alt ? alt.charAt(0) : 'O'}
      </div>
    );
  }

  return (
    <div className="size-16 border border-border/40 rounded-full shadow-xs overflow-hidden bg-background flex items-center justify-center flex-none shrink-0">
      <img
        src={src}
        alt={alt}
        className="w-[52px] h-[52px] object-contain"
        onError={() => setImageError(true)}
      />
    </div>
  );
}

export default function OrganizationSection() {
  return (
    <div className="w-full flex flex-col gap-6">
      {DATA.organization.map((item) => (
        <div key={item.company} className="w-full flex flex-col gap-2">
          <div className="flex items-center gap-x-3 justify-between w-full text-left">
            <div className="flex items-center gap-x-3 flex-1 min-w-0">
              <LogoImage src={item.logoUrl} alt={item.company} />
              <div className="flex-1 min-w-0 gap-0.5 flex flex-col">
                <div className="font-semibold leading-none flex items-center gap-2">
                  {item.href ? (
                    <Link
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 hover:underline group"
                    >
                      <span>{item.company}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  ) : (
                    <span>{item.company}</span>
                  )}
                </div>
                <div className="font-sans text-sm text-muted-foreground">
                  {item.title}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs tabular-nums text-muted-foreground text-right flex-none">
              <span>
                {item.start} - {item.end ?? 'Present'}
              </span>
            </div>
          </div>
          {item.description && (
            <div className="ml-[76px] text-xs sm:text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
              {item.description}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
