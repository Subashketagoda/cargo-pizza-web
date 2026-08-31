import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function generate() {
  const size = 512;
  const radius = 248;
  const yellow = '#FFE600'; // Exact bright yellow from Cargo logo

  // 1. Create a 512x512 SVG yellow circle
  const circleSvg = `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${size/2}" cy="${size/2}" r="${radius}" fill="${yellow}" />
    </svg>
  `;

  const circleBuffer = await sharp(Buffer.from(circleSvg)).png().toBuffer();

  // 2. Read the source logo and trim any empty transparent margins
  const logoPath = path.resolve('src/assets/logo.png');
  const trimmedLogo = await sharp(logoPath)
    .trim()
    .resize({ width: 440, height: 260, fit: 'inside' })
    .toBuffer();

  // 3. Composite the trimmed logo directly onto the center of the yellow circle
  const badge512 = await sharp(circleBuffer)
    .composite([
      {
        input: trimmedLogo,
        gravity: 'center'
      }
    ])
    .png()
    .toBuffer();

  // Ensure public directory has all standard Google Favicon sizes
  const publicDir = path.resolve('public');
  const srcAssetsDir = path.resolve('src/assets');

  const outputs = [
    { dir: publicDir, name: 'favicon.png', size: 512 },
    { dir: publicDir, name: 'favicon-512x512.png', size: 512 },
    { dir: publicDir, name: 'favicon-192x192.png', size: 192 },
    { dir: publicDir, name: 'apple-touch-icon.png', size: 180 },
    { dir: publicDir, name: 'favicon-96x96.png', size: 96 },
    { dir: publicDir, name: 'favicon-48x48.png', size: 48 },
    { dir: publicDir, name: 'favicon-32x32.png', size: 32 },
    { dir: publicDir, name: 'favicon-16x16.png', size: 16 },
    { dir: publicDir, name: 'logo-circle.png', size: 512 },
    { dir: srcAssetsDir, name: 'logo-circle.png', size: 512 },
  ];

  for (const out of outputs) {
    const filePath = path.join(out.dir, out.name);
    await sharp(badge512)
      .resize(out.size, out.size)
      .png()
      .toFile(filePath);
    console.log(`Generated: ${out.name} (${out.size}x${out.size})`);
  }

  // Also generate standard favicon.ico
  const icoPath = path.join(publicDir, 'favicon.ico');
  await sharp(badge512)
    .resize(48, 48)
    .png()
    .toFile(icoPath);
  console.log('Generated: favicon.ico (48x48)');
}

generate().catch(err => {
  console.error(err);
  process.exit(1);
});
