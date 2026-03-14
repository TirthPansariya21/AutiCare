/**
 * Generate the AutiCare puzzle-cross logo as a 1024x1024 PNG.
 * Uses jimp (already in deps) to draw 5 rounded-rect pieces in a cross.
 *
 * Run from project root:  node scripts/gen_logo.js
 */

const Jimp = require("jimp");
const path = require("path");

const SIZE = 1024;
const PIECE = 280;
const GAP = 12;
const RADIUS = 70;

const MINT   = 0xE0F2F1FF;
const BLUE   = 0xA2D2FFFF;
const PURPLE = 0xCDB4DBFF;
const WHITE  = 0xFFFFFFFF;
const SHADOW = 0x00000018;

const cx = SIZE / 2;
const cy = SIZE / 2;
const offset = PIECE + GAP;

const pieces = [
  { x: cx,          y: cy,          color: MINT },
  { x: cx,          y: cy - offset, color: BLUE },
  { x: cx,          y: cy + offset, color: BLUE },
  { x: cx - offset, y: cy,          color: PURPLE },
  { x: cx + offset, y: cy,          color: PURPLE },
];

function drawRoundedRect(image, cx, cy, w, h, r, color) {
  const left   = Math.round(cx - w / 2);
  const top    = Math.round(cy - h / 2);
  const right  = left + w;
  const bottom = top + h;

  for (let y = top; y < bottom; y++) {
    for (let x = left; x < right; x++) {
      const dx = Math.max(left + r - x, 0, x - (right - r - 1));
      const dy = Math.max(top + r - y, 0, y - (bottom - r - 1));
      if (dx * dx + dy * dy <= r * r) {
        if (x >= 0 && x < SIZE && y >= 0 && y < SIZE) {
          image.setPixelColor(color, x, y);
        }
      }
    }
  }
}

async function main() {
  console.log("Generating logo...");
  const img = new Jimp(SIZE, SIZE, WHITE);

  // Shadows
  for (const p of pieces) {
    drawRoundedRect(img, p.x + 4, p.y + 6, PIECE, PIECE, RADIUS, SHADOW);
  }
  // Pieces
  for (const p of pieces) {
    drawRoundedRect(img, p.x, p.y, PIECE, PIECE, RADIUS, p.color);
  }

  const outDir = path.join(__dirname, "..", "assets", "images");

  await img.writeAsync(path.join(outDir, "icon.png"));
  console.log("icon.png saved");

  // Splash icon (smaller)
  const splash = new Jimp(SIZE, SIZE, WHITE);
  const scale = 0.6;
  const sPIECE = Math.round(PIECE * scale);
  const sGAP = Math.round(GAP * scale);
  const sRADIUS = Math.round(RADIUS * scale);
  const sOffset = sPIECE + sGAP;

  const sp = [
    { x: cx, y: cy, color: MINT },
    { x: cx, y: cy - sOffset, color: BLUE },
    { x: cx, y: cy + sOffset, color: BLUE },
    { x: cx - sOffset, y: cy, color: PURPLE },
    { x: cx + sOffset, y: cy, color: PURPLE },
  ];
  for (const p of sp) drawRoundedRect(splash, p.x+3, p.y+4, sPIECE, sPIECE, sRADIUS, SHADOW);
  for (const p of sp) drawRoundedRect(splash, p.x, p.y, sPIECE, sPIECE, sRADIUS, p.color);
  await splash.writeAsync(path.join(outDir, "splash-icon.png"));
  console.log("splash-icon.png saved");

  // Favicon
  const fav = img.clone().resize(48, 48);
  await fav.writeAsync(path.join(outDir, "favicon.png"));
  console.log("favicon.png saved");

  console.log("Done!");
}

main().catch(console.error);
