import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');

const sourceLogoCircle = path.join(rootDir, 'src', 'assets', 'logo-circle.png');
const sourceLogo = path.join(rootDir, 'src', 'assets', 'logo.png');

async function buildIco(pngBuffers, outPath) {
  const count = pngBuffers.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  let currentOffset = headerSize + dirEntrySize * count;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // ICO format
  header.writeUInt16LE(count, 4); // count of images

  const dirEntries = [];
  for (const item of pngBuffers) {
    const entry = Buffer.alloc(dirEntrySize);
    entry.writeUInt8(item.size === 256 ? 0 : item.size, 0); // width
    entry.writeUInt8(item.size === 256 ? 0 : item.size, 1); // height
    entry.writeUInt8(0, 2); // color palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bpp
    entry.writeUInt32LE(item.data.length, 8); // size in bytes
    entry.writeUInt32LE(currentOffset, 12); // offset
    dirEntries.push(entry);
    currentOffset += item.data.length;
  }

  const totalFile = Buffer.concat([header, ...dirEntries, ...pngBuffers.map((p) => p.data)]);
  fs.writeFileSync(outPath, totalFile);
}

async function generateAll() {
  console.log('Generating Google-compliant favicons and brand logos...');

  if (!fs.existsSync(sourceLogoCircle)) {
    throw new Error(`Source circle logo not found at: ${sourceLogoCircle}`);
  }

  const baseImage = sharp(sourceLogoCircle);

  // 1. Generate PNG favicon variants
  const pngSizes = [16, 32, 48, 96, 192, 512];
  const icoBuffers = [];

  for (const size of pngSizes) {
    const outName = `favicon-${size}x${size}.png`;
    const buf = await baseImage
      .clone()
      .resize(size, size, { kernel: 'lanczos3' })
      .png({ compressionLevel: 9 })
      .toBuffer();

    fs.writeFileSync(path.join(publicDir, outName), buf);
    console.log(`✓ Generated ${outName} (${size}x${size})`);

    // Sizes for the multi-res .ico file (16, 32, 48)
    if ([16, 32, 48].includes(size)) {
      icoBuffers.push({ size, data: buf });
    }
  }

  // 2. Generate Apple Touch Icon (180x180)
  const appleTouchBuf = await baseImage
    .clone()
    .resize(180, 180, { kernel: 'lanczos3' })
    .png({ compressionLevel: 9 })
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), appleTouchBuf);
  console.log('✓ Generated apple-touch-icon.png (180x180)');

  // 3. Generate standard 512x512 favicon.png (square) in public and root
  const favicon512Buf = await baseImage
    .clone()
    .resize(512, 512, { kernel: 'lanczos3' })
    .png({ compressionLevel: 9 })
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'favicon.png'), favicon512Buf);
  fs.writeFileSync(path.join(rootDir, 'favicon.png'), favicon512Buf);
  console.log('✓ Generated favicon.png (512x512)');

  // 4. Generate valid binary multi-resolution favicon.ico in public and root
  const publicIcoPath = path.join(publicDir, 'favicon.ico');
  const rootIcoPath = path.join(rootDir, 'favicon.ico');
  await buildIco(icoBuffers, publicIcoPath);
  fs.copyFileSync(publicIcoPath, rootIcoPath);
  console.log('✓ Generated valid binary multi-resolution favicon.ico (16px, 32px, 48px)');

  // 5. Ensure logo-circle.png (512x512) is in public and root
  fs.writeFileSync(path.join(publicDir, 'logo-circle.png'), favicon512Buf);
  fs.writeFileSync(path.join(rootDir, 'logo-circle.png'), favicon512Buf);
  console.log('✓ Synced logo-circle.png (512x512)');

  // 6. Ensure horizontal brand logo.png is in public and root
  if (fs.existsSync(sourceLogo)) {
    fs.copyFileSync(sourceLogo, path.join(publicDir, 'logo.png'));
    fs.copyFileSync(sourceLogo, path.join(rootDir, 'logo.png'));
    console.log('✓ Synced horizontal brand logo.png');
  }

  console.log('All favicon and brand assets generated successfully!');
}

generateAll().catch((err) => {
  console.error('Error generating assets:', err);
  process.exit(1);
});
