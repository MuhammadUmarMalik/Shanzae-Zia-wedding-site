/* Violet Aperture performance reminder: offer AVIF first, then WebP, while preserving the original managed JPEG as a reliable fallback. */

export type ResponsiveSourceSet = {
  avif: string;
  webp: string;
};

export const responsiveImageSources: Record<string, ResponsiveSourceSet> = {
  "/images/shanzae/originals/shanzae-faisal-mosque-wedding.jpeg": {
    avif: "/images/shanzae/responsive/shanzae-faisal-mosque-wedding-900w.avif 900w, /images/shanzae/responsive/shanzae-faisal-mosque-wedding-1089w.avif 1089w",
    webp: "/images/shanzae/responsive/shanzae-faisal-mosque-wedding-900w.webp 900w, /images/shanzae/responsive/shanzae-faisal-mosque-wedding-1089w.webp 1089w",
  },
  "/images/shanzae/originals/shanzae-profile.jpg": {
    avif: "/images/shanzae/responsive/shanzae-profile-900w.avif 900w, /images/shanzae/responsive/shanzae-profile-1080w.avif 1080w",
    webp: "/images/shanzae/responsive/shanzae-profile-900w.webp 900w, /images/shanzae/responsive/shanzae-profile-1080w.webp 1080w",
  },
  "/images/shanzae/originals/shanzae-portrait-story.jpeg": {
    avif: "/images/shanzae/responsive/shanzae-portrait-story-900w.avif 900w, /images/shanzae/responsive/shanzae-portrait-story-1080w.avif 1080w",
    webp: "/images/shanzae/responsive/shanzae-portrait-story-900w.webp 900w, /images/shanzae/responsive/shanzae-portrait-story-1080w.webp 1080w",
  },
  "/images/shanzae/originals/wedding-story-01.jpg": {
    avif: "/images/shanzae/responsive/wedding-story-01-900w.avif 900w, /images/shanzae/responsive/wedding-story-01-1080w.avif 1080w",
    webp: "/images/shanzae/responsive/wedding-story-01-900w.webp 900w, /images/shanzae/responsive/wedding-story-01-1080w.webp 1080w",
  },
  "/images/shanzae/originals/wedding-story-02.jpg": {
    avif: "/images/shanzae/responsive/wedding-story-02-900w.avif 900w, /images/shanzae/responsive/wedding-story-02-1366w.avif 1366w",
    webp: "/images/shanzae/responsive/wedding-story-02-900w.webp 900w, /images/shanzae/responsive/wedding-story-02-1366w.webp 1366w",
  },
  "/images/shanzae/originals/wedding-story-03.jpg": {
    avif: "/images/shanzae/responsive/wedding-story-03-900w.avif 900w, /images/shanzae/responsive/wedding-story-03-1600w.avif 1600w",
    webp: "/images/shanzae/responsive/wedding-story-03-900w.webp 900w, /images/shanzae/responsive/wedding-story-03-1600w.webp 1600w",
  },
  "/images/shanzae/originals/wedding-story-04.jpg": {
    avif: "/images/shanzae/responsive/wedding-story-04-900w.avif 900w, /images/shanzae/responsive/wedding-story-04-1600w.avif 1600w",
    webp: "/images/shanzae/responsive/wedding-story-04-900w.webp 900w, /images/shanzae/responsive/wedding-story-04-1600w.webp 1600w",
  },
  "/images/shanzae/originals/wedding-story-05.jpg": {
    avif: "/images/shanzae/responsive/wedding-story-05-900w.avif 900w, /images/shanzae/responsive/wedding-story-05-1080w.avif 1080w",
    webp: "/images/shanzae/responsive/wedding-story-05-900w.webp 900w, /images/shanzae/responsive/wedding-story-05-1080w.webp 1080w",
  },
  "/images/shanzae/originals/wedding-story-06.jpg": {
    avif: "/images/shanzae/responsive/wedding-story-06-900w.avif 900w, /images/shanzae/responsive/wedding-story-06-1080w.avif 1080w",
    webp: "/images/shanzae/responsive/wedding-story-06-900w.webp 900w, /images/shanzae/responsive/wedding-story-06-1080w.webp 1080w",
  },
  "/images/shanzae/originals/still-frame-story-01.jpg": {
    avif: "/images/shanzae/responsive/still-frame-story-01-900w.avif 900w, /images/shanzae/responsive/still-frame-story-01-1536w.avif 1536w",
    webp: "/images/shanzae/responsive/still-frame-story-01-900w.webp 900w, /images/shanzae/responsive/still-frame-story-01-1536w.webp 1536w",
  },
  "/images/shanzae/originals/still-frame-story-02.jpg": {
    avif: "/images/shanzae/responsive/still-frame-story-02-900w.avif 900w, /images/shanzae/responsive/still-frame-story-02-1600w.avif 1600w",
    webp: "/images/shanzae/responsive/still-frame-story-02-900w.webp 900w, /images/shanzae/responsive/still-frame-story-02-1600w.webp 1600w",
  },
  "/images/shanzae/originals/still-frame-studio-portrait.jpg": {
    avif: "/images/shanzae/responsive/still-frame-studio-portrait-900w.avif 900w, /images/shanzae/responsive/still-frame-studio-portrait-1600w.avif 1600w",
    webp: "/images/shanzae/responsive/still-frame-studio-portrait-900w.webp 900w, /images/shanzae/responsive/still-frame-studio-portrait-1600w.webp 1600w",
  },
};
