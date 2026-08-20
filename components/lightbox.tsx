"use client";

import { useEffect, type TouchEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { EditorialImage } from "@/components/EditorialImage";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

type LightboxItem = {
  src: string;
  title: string;
  category: string;
  ratio: string;
};

export function Lightbox({
  item,
  onClose,
  onNavigate,
  direction,
  index,
  total,
}: {
  item: LightboxItem | null;
  onClose: () => void;
  onNavigate: (direction: 1 | -1) => void;
  direction: 1 | -1;
  index: number;
  total: number;
}) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!item) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        onNavigate(-1);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        onNavigate(1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [item, onNavigate]);

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    if (touch) {
      const start = { x: touch.clientX, y: touch.clientY };
      event.currentTarget.dataset.touchX = String(start.x);
      event.currentTarget.dataset.touchY = String(start.y);
    }
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.changedTouches[0];
    const startX = Number(event.currentTarget.dataset.touchX || 0);
    const startY = Number(event.currentTarget.dataset.touchY || 0);
    delete event.currentTarget.dataset.touchX;
    delete event.currentTarget.dataset.touchY;
    if (!touch) return;
    const deltaX = touch.clientX - startX;
    const deltaY = touch.clientY - startY;
    if (Math.abs(deltaX) < 56 || Math.abs(deltaX) < Math.abs(deltaY) * 1.2)
      return;
    onNavigate(deltaX < 0 ? 1 : -1);
  };

  return (
    <Dialog open={Boolean(item)} onOpenChange={open => !open && onClose()}>
      <DialogContent className="flex h-[100dvh] max-w-none flex-col justify-center rounded-none border-0 bg-background p-6 text-foreground sm:max-w-none md:p-12 [&>button]:right-6 [&>button]:top-6 [&>button]:rounded-none [&>button]:border [&>button]:border-foreground/35 [&>button]:p-2 [&>button]:text-foreground">
        <DialogTitle className="sr-only">
          {item?.title ?? "Portfolio image"}
        </DialogTitle>
        <DialogDescription className="sr-only">
          Expanded photograph from Shanzae Zia&apos;s selected portfolio.
          Swipe left or right on touch devices, or use the left and right
          arrow keys, to change images.
        </DialogDescription>
        {item ? (
          <>
            <div
              className="image-frame relative mx-auto flex max-h-[76dvh] w-full max-w-6xl touch-pan-y items-center justify-center overflow-hidden bg-card"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <motion.div
                key={item.src}
                initial={
                  reduceMotion ? false : { opacity: 0, x: direction * 28 }
                }
                animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                transition={{ duration: 0.28, ease: EASE }}
                className="flex max-h-[76dvh] w-full items-center justify-center"
              >
                <EditorialImage
                  key={item.src}
                  src={item.src}
                  alt={`Shanzae Zia photography — ${item.title}`}
                  sizes="(min-width: 1280px) 1152px, (min-width: 768px) 90vw, 100vw"
                  className="max-h-[76dvh] w-auto max-w-full object-contain"
                />
              </motion.div>
              <button
                type="button"
                onClick={() => onNavigate(-1)}
                className="absolute left-3 top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 items-center justify-center border border-foreground/35 bg-background/85 text-foreground backdrop-blur-sm transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring sm:inline-flex"
                aria-label="Previous portfolio image"
              >
                <ChevronLeft size={21} />
              </button>
              <button
                type="button"
                onClick={() => onNavigate(1)}
                className="absolute right-3 top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 items-center justify-center border border-foreground/35 bg-background/85 text-foreground backdrop-blur-sm transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring sm:inline-flex"
                aria-label="Next portfolio image"
              >
                <ChevronRight size={21} />
              </button>
            </div>
            <div className="mx-auto flex w-full max-w-6xl flex-col justify-between gap-4 pt-5 sm:flex-row sm:items-center">
              <div>
                <p className="section-label">{item.category}</p>
                <p className="mt-2 font-display text-xl italic">
                  {item.title}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate(-1)}
                  className="inline-flex h-10 w-10 items-center justify-center border border-border text-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label="Previous portfolio image"
                >
                  <ChevronLeft size={19} />
                </button>
                <p
                  aria-live="polite"
                  className="min-w-14 text-center font-ui text-[0.625rem] font-semibold tracking-[0.14em] text-muted-foreground uppercase"
                >
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {String(total).padStart(2, "0")}
                </p>
                <button
                  type="button"
                  onClick={() => onNavigate(1)}
                  className="inline-flex h-10 w-10 items-center justify-center border border-border text-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label="Next portfolio image"
                >
                  <ChevronRight size={19} />
                </button>
              </div>
              <p className="text-xs font-light tracking-[0.12em] text-muted-foreground uppercase">
                Swipe or use arrow keys
              </p>
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}