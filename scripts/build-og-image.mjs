/**
 * Letterbox og-share-banner.png into 1200×630 (#131313) for Open Graph / social previews.
 */
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const src = join(root, 'assets/branding/og-share-banner.png');
const out = join(root, 'assets/branding/og-share-1200x630.png');

const W = 1200;
const H = 630;
const bg = { r: 19, g: 19, b: 19, alpha: 1 };

await sharp(src)
  .resize(W, H, {
    fit: 'contain',
    position: 'center',
    background: bg,
  })
  .png({ compressionLevel: 9 })
  .toFile(out);

const meta = await sharp(out).metadata();
console.log('Wrote', out, `${meta.width}×${meta.height}`);
