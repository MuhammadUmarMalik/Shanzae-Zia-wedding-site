/* Violet Aperture performance reminder: offer AVIF first, then WebP, while preserving the original managed JPEG as a reliable fallback. */

export type ResponsiveSourceSet = {
  avif: string;
  webp: string;
};

export const responsiveImageSources: Record<string, ResponsiveSourceSet> = {
  "/manus-storage/shanzae-faisal-mosque-wedding_5714f627.jpeg": {
    avif: "/manus-storage/shanzae-faisal-mosque-wedding-900w_426f91ee.avif 900w, /manus-storage/shanzae-faisal-mosque-wedding-1089w_d5139f32.avif 1089w",
    webp: "/manus-storage/shanzae-faisal-mosque-wedding-900w_626e1c99.webp 900w, /manus-storage/shanzae-faisal-mosque-wedding-1089w_81b629e7.webp 1089w",
  },
  "/manus-storage/shanzae-profile_b52c957d.jpg": {
    avif: "/manus-storage/shanzae-profile-900w_84e29822.avif 900w, /manus-storage/shanzae-profile-1080w_30b1f8c0.avif 1080w",
    webp: "/manus-storage/shanzae-profile-900w_483d19d8.webp 900w, /manus-storage/shanzae-profile-1080w_14784b15.webp 1080w",
  },
  "/manus-storage/shanzae-portrait-story_62b3977b.jpeg": {
    avif: "/manus-storage/shanzae-portrait-story-900w_c9e46ba4.avif 900w, /manus-storage/shanzae-portrait-story-1080w_43363c84.avif 1080w",
    webp: "/manus-storage/shanzae-portrait-story-900w_bfc7e82f.webp 900w, /manus-storage/shanzae-portrait-story-1080w_df21b1d1.webp 1080w",
  },
  "/manus-storage/wedding-story-01_df4cf4eb.jpg": {
    avif: "/manus-storage/wedding-story-01-900w_41d9123e.avif 900w, /manus-storage/wedding-story-01-1080w_c7685fb1.avif 1080w",
    webp: "/manus-storage/wedding-story-01-900w_5602fdcd.webp 900w, /manus-storage/wedding-story-01-1080w_45cb4922.webp 1080w",
  },
  "/manus-storage/wedding-story-02_70c2acb3.jpg": {
    avif: "/manus-storage/wedding-story-02-900w_08064d2c.avif 900w, /manus-storage/wedding-story-02-1366w_c318488a.avif 1366w",
    webp: "/manus-storage/wedding-story-02-900w_8a20543c.webp 900w, /manus-storage/wedding-story-02-1366w_7a3dfcb8.webp 1366w",
  },
  "/manus-storage/wedding-story-03_459bc393.jpg": {
    avif: "/manus-storage/wedding-story-03-900w_1f11b6dc.avif 900w, /manus-storage/wedding-story-03-1600w_5239eeef.avif 1600w",
    webp: "/manus-storage/wedding-story-03-900w_3f26bbb3.webp 900w, /manus-storage/wedding-story-03-1600w_46ff5944.webp 1600w",
  },
  "/manus-storage/wedding-story-04_353ae226.jpg": {
    avif: "/manus-storage/wedding-story-04-900w_3a35dfc0.avif 900w, /manus-storage/wedding-story-04-1600w_a02be2e6.avif 1600w",
    webp: "/manus-storage/wedding-story-04-900w_b8f19c0b.webp 900w, /manus-storage/wedding-story-04-1600w_b2459eca.webp 1600w",
  },
  "/manus-storage/wedding-story-05_f5daa8e2.jpg": {
    avif: "/manus-storage/wedding-story-05-900w_c62ac4bb.avif 900w, /manus-storage/wedding-story-05-1080w_a5318853.avif 1080w",
    webp: "/manus-storage/wedding-story-05-900w_2631d633.webp 900w, /manus-storage/wedding-story-05-1080w_048c71cf.webp 1080w",
  },
  "/manus-storage/wedding-story-06_15c3e367.jpg": {
    avif: "/manus-storage/wedding-story-06-900w_f252a457.avif 900w, /manus-storage/wedding-story-06-1080w_6cb0177e.avif 1080w",
    webp: "/manus-storage/wedding-story-06-900w_acf94cf5.webp 900w, /manus-storage/wedding-story-06-1080w_2c73f776.webp 1080w",
  },
  "/manus-storage/still-frame-story-01_987bbdce.jpg": {
    avif: "/manus-storage/still-frame-story-01-900w_85be24d6.avif 900w, /manus-storage/still-frame-story-01-1536w_9d445e7e.avif 1536w",
    webp: "/manus-storage/still-frame-story-01-900w_09b1b687.webp 900w, /manus-storage/still-frame-story-01-1536w_1543629c.webp 1536w",
  },
  "/manus-storage/still-frame-story-02_8b639835.jpg": {
    avif: "/manus-storage/still-frame-story-02-900w_e1eded71.avif 900w, /manus-storage/still-frame-story-02-1600w_4ec2d876.avif 1600w",
    webp: "/manus-storage/still-frame-story-02-900w_6ae7cb39.webp 900w, /manus-storage/still-frame-story-02-1600w_e2b65df5.webp 1600w",
  },
  "/manus-storage/still-frame-studio-portrait_85936cc9.jpg": {
    avif: "/manus-storage/still-frame-studio-portrait-900w_9218fe0d.avif 900w, /manus-storage/still-frame-studio-portrait-1600w_86f56806.avif 1600w",
    webp: "/manus-storage/still-frame-studio-portrait-900w_2a11a751.webp 900w, /manus-storage/still-frame-studio-portrait-1600w_a5a929e5.webp 1600w",
  },
};
