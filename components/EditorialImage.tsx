"use client";

/* Black + Beige design system: images arrive as calm, editorial frames with a restrained warm-beige loading wash and tactile photographic feedback. */
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { responsiveImageSources } from "@/components/responsive-image-sources";

type EditorialImageProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export function EditorialImage({ src, alt, className, priority = false, sizes = "(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 100vw" }: EditorialImageProps) {
  const [ready, setReady] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const responsiveSources = responsiveImageSources[src];

  useEffect(() => {
    if (imageRef.current?.complete) {
      setReady(true);
    }
  }, [src]);

  return (
    <>
      <span
        aria-hidden="true"
        className={cn("image-loading-wash", ready && "image-loading-wash--hidden")}
      />
      <picture>
        {responsiveSources && <source type="image/avif" srcSet={responsiveSources.avif} sizes={sizes} />}
        {responsiveSources && <source type="image/webp" srcSet={responsiveSources.webp} sizes={sizes} />}
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          sizes={sizes}
          onLoad={() => setReady(true)}
          onError={() => setReady(true)}
          className={cn("editorial-image", ready && "editorial-image--ready", className)}
        />
      </picture>
    </>
  );
}
