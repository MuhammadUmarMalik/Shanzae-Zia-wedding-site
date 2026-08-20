import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const root = "D:/shanzae-zia-portfolio-current/public/images/shanzae";
const brandDir = path.join(root, "brand");
const resDir = path.join(root, "responsive");

// 1. Logo: 1920x1920 PNG -> small AVIF/WebP
const logo = path.join(brandDir, "still-frame-mark.png");
const logoOut = async (ext, opts) => {
  const out = path.join(brandDir, `still-frame-mark.${ext}`);
  await sharp(logo).resize(128, 128).toFormat(ext, opts).toFile(out);
  const s = fs.statSync(out).size;
  console.log(`${out}  ${(s / 1024).toFixed(1)} KiB`);
};
await logoOut("webp", { quality: 85 });
await logoOut("avif", { quality: 60 });

// 2. Responsive sizes for all originals
const originals = fs.readdirSync(path.join(root, "originals")).filter(f => /\.(jpe?g)$/i.test(f));
const sizes = [320, 480, 640, 768];
const extMap = {
  avif: { quality: 60 },
  webp: { quality: 80 },
};

for (const orig of originals) {
  const base = path.basename(orig, path.extname(orig));
  const src = path.join(root, "originals", orig);
  const meta = await sharp(src).metadata();
  const srcW = meta.width;
  const wCandidates = sizes.filter(w => w < srcW).concat([srcW]);
  const unique = [...new Set(wCandidates)];
  for (const w of unique) {
    for (const [ext, opts] of Object.entries(extMap)) {
      const out = path.join(resDir, `${base}-${w}w.${ext}`);
      await sharp(src).resize({ width: w, withoutEnlargement: true }).toFormat(ext, opts).toFile(out);
      const s = fs.statSync(out).size;
      console.log(`${out}  ${(s / 1024).toFixed(1)} KiB`);
    }
  }
}
console.log("DONE");