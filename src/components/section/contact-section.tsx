import Link from "next/link";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { DATA } from "@/data/resume";
import { Icons } from "@/components/icons";

export default function ContactSection() {
  return (
    <div className="border rounded-xl p-10 relative">
      <div className="absolute -top-4 border bg-primary z-10 rounded-xl px-4 py-1 left-1/2 -translate-x-1/2">
        <span className="text-background text-sm font-medium">Contact</span>
      </div>
      <div className="absolute inset-0 top-0 left-0 right-0 h-1/2 rounded-xl overflow-hidden">
        <FlickeringGrid
          className="h-full w-full"
          squareSize={2}
          gridGap={2}
          style={{
            maskImage: "linear-gradient(to bottom, black, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
          }}
        />
      </div>
      <div className="relative flex flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          Get in Touch
        </h2>
        <p className="mx-auto max-w-lg text-muted-foreground text-balance">
          Want to chat? Just shoot me a message on LinkedIn, WhatsApp or Email
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 mt-1">
          <Link
            href="mailto:roysurbakti23@gmail.com"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-sm text-muted-foreground shadow-xs transition-colors hover:bg-muted hover:text-foreground"
          >
            <Icons.email className="size-3.5" />
            roysurbakti23@gmail.com
          </Link>
          <Link
            href="https://wa.me/6285267773968"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-sm text-muted-foreground shadow-xs transition-colors hover:bg-muted hover:text-foreground"
          >
            <Icons.whatsapp className="size-4 " />
            085267773968
          </Link>
        </div>
      </div>
    </div>
  );
}

