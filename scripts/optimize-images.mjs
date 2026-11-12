// Asset pipeline for Casa Esmeralda Ridge.
// 1. Converts every real listing photo in public/images/raw to .webp in public/images (same names, never upscaled).
// 2. Writes lib/photo-dims.json so every <Image> gets a true width and height.
// 3. Crops the Pura Vida Sloth Escapes badge (a 194px Instagram screenshot) to its inner circle.
// 4. Builds the favicon and Apple touch icon (badge on limestone).
// 5. Builds the hero poster and the 1200x630 Open Graph image.
// Run: npm run images  (fonts for the OG image are read from scripts/fonts)
import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const rawDir = path.join(root, "public/images/raw");
const outDir = path.join(root, "public/images");
const genDir = path.join(root, "public/media/generated");
const brandDir = path.join(root, "public/brand");
const appDir = path.join(root, "app");

const LIMESTONE = "#F5EFE4";
const INK = "#13291F";
const ACCENT = "#B5472F";
const LINE = "#E6DCCB";

async function photos() {
  const files = (await fs.readdir(rawDir)).filter((f) => /\.(jpe?g|png)$/i.test(f)).sort();
  const dims = {};
  for (const f of files) {
    const base = f.replace(/\.(jpe?g|png)$/i, "");
    const img = sharp(path.join(rawDir, f)).rotate();
    const meta = await img.metadata();
    await img.webp({ quality: 80, effort: 5 }).toFile(path.join(outDir, `${base}.webp`));
    dims[base] = { w: meta.width, h: meta.height };
  }
  await fs.writeFile(path.join(root, "lib/photo-dims.json"), JSON.stringify(dims, null, 2) + "\n");
  console.log(`photos: ${files.length} converted`);
}

// The badge's white disc is centred at (97, 98) with a radius of about 90px inside the Instagram ring.
async function badgeCircle(size) {
  const cx = 97, cy = 98, r = 88;
  const crop = await sharp(path.join(root, "scripts/brand/badge-source.png"))
    .extract({ left: cx - r, top: cy - r, width: r * 2, height: r * 2 })
    .resize(size, size, { kernel: "lanczos3" })
    .png()
    .toBuffer();
  const mask = Buffer.from(
    `<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="#fff"/></svg>`
  );
  return sharp(crop).composite([{ input: mask, blend: "dest-in" }]).png().toBuffer();
}

async function brand() {
  await fs.mkdir(brandDir, { recursive: true });
  // 112px covers the 56px footer badge at 2x. The source is only 176px across, so never larger.
  await fs.writeFile(path.join(brandDir, "sloth-badge.png"), await badgeCircle(112));
  // Icons: badge circle on a limestone square.
  for (const [name, size, pad] of [["icon.png", 192, 10], ["apple-icon.png", 180, 14]]) {
    const inner = size - pad * 2;
    await sharp({ create: { width: size, height: size, channels: 4, background: LIMESTONE } })
      .composite([{ input: await badgeCircle(inner), left: pad, top: pad }])
      .png()
      .toFile(path.join(appDir, name));
  }
  const fav = await sharp({ create: { width: 48, height: 48, channels: 4, background: LIMESTONE } })
    .composite([{ input: await badgeCircle(46), left: 1, top: 1 }])
    .png()
    .toBuffer();
  await fs.writeFile(path.join(root, "scripts/brand/favicon-48.png"), fav);
  console.log("brand: badge and icons written");
}

// AI-generated visual (Higgsfield), approved by Hunter. Swap for real footage when the owner supplies it.
async function poster() {
  await sharp(path.join(genDir, "gen-03-hero-pool-waterfall-upscaled.jpg"))
    .resize(1600)
    .webp({ quality: 78 })
    .toFile(path.join(genDir, "gen-03-hero-poster.webp"));
  console.log("poster: written");
}

// Renders one line of text with an explicit font file (fontconfig names are unreliable inside libvips).
async function textLayer(text, file, family, size, color, spacing = 0) {
  const esc = text.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  return sharp({
    text: {
      text: `<span foreground="${color}" letter_spacing="${spacing * 1024}">${esc}</span>`,
      font: `${family} ${size}`,
      fontfile: path.join(root, "scripts/fonts", file),
      rgba: true,
      dpi: 72,
    },
  }).png().toBuffer();
}

// AI-generated visual (Higgsfield), approved by Hunter. Swap for real footage when the owner supplies it.
async function ogImage() {
  const W = 1200, H = 630, panel = 520;
  // Crop the upscaled pool to the waterfall side (right half of the frame).
  const photo = await sharp(path.join(genDir, "gen-03-hero-pool-waterfall-upscaled.jpg"))
    .resize({ width: 1040, height: 780, fit: "cover" })
    .extract({ left: 300, top: 100, width: W - panel, height: H })
    .toBuffer();
  const shapes = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${panel}" height="${H}" fill="${LIMESTONE}"/>
    <line x1="${panel}" y1="0" x2="${panel}" y2="${H}" stroke="${LINE}" stroke-width="2"/>
    <rect x="64" y="350" width="56" height="3" fill="${ACCENT}"/>
  </svg>`;
  const F600 = ["Fraunces-SemiBold.ttf", "Fraunces 144pt SemiBold"];
  const F400 = ["Fraunces-Regular.ttf", "Fraunces 144pt"];
  const H600 = ["HankenGrotesk-SemiBold.ttf", "Hanken Grotesk SemiBold"];
  const H500 = ["HankenGrotesk-Medium.ttf", "Hanken Grotesk Medium"];
  await sharp({ create: { width: W, height: H, channels: 4, background: LIMESTONE } })
    .composite([
      { input: photo, left: panel, top: 0 },
      { input: Buffer.from(shapes), left: 0, top: 0 },
      { input: await textLayer("Casa Esmeralda", ...F600, 64, INK), left: 62, top: 206 },
      { input: await textLayer("RIDGE", ...H600, 19, INK, 6), left: 66, top: 296 },
      { input: await textLayer("Your own pool in", ...F400, 36, INK), left: 64, top: 384 },
      { input: await textLayer("Herradura, Costa Rica", ...F400, 36, INK), left: 64, top: 430 },
      { input: await badgeCircle(72), left: 64, top: 520 },
      { input: await textLayer("by Pura Vida Sloth Escapes", ...H500, 20, "#4F5E55"), left: 152, top: 545 },
    ])
    .png({ compressionLevel: 9, palette: true, quality: 90 })
    .toFile(path.join(root, "public/og-image.png"));
  console.log("og-image: written");
}

await photos();
await brand();
await poster();
await ogImage();
