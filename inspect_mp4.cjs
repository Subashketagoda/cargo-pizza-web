const fs = require('fs');

const files = ['hero-video.mp4', 'initial-promo-video.mp4', 'promo-video.mp4'];

for (const file of files) {
  const p = 'src/assets/' + file;
  if (!fs.existsSync(p)) {
    console.log(file, 'NOT FOUND');
    continue;
  }
  const buf = fs.readFileSync(p);
  console.log(`=== ${file} (${buf.length} bytes / ${(buf.length / 1024 / 1024).toFixed(2)} MB) ===`);
  const str = buf.toString('latin1');
  const ftypIdx = str.indexOf('ftyp');
  if (ftypIdx !== -1) {
    console.log('  ftyp brand:', buf.slice(ftypIdx + 4, ftypIdx + 8).toString('ascii'));
  }
  const moovIdx = str.indexOf('moov');
  const mdatIdx = str.indexOf('mdat');
  console.log(`  moov index: ${moovIdx} | mdat index: ${mdatIdx}`);
  if (moovIdx > mdatIdx) {
    console.log('  CRITICAL: moov atom is at the END of the file (NO faststart)! Browsers cannot stream or start playing until 100% of the 4.4MB is downloaded!');
  } else {
    console.log('  faststart OK (moov before mdat)');
  }
  const hasAvc1 = str.includes('avc1');
  const hasHvc1 = str.includes('hvc1') || str.includes('hev1');
  const hasVp9 = str.includes('vp09');
  const hasAv1 = str.includes('av01');
  console.log(`  Codecs: H.264 (avc1): ${hasAvc1} | H.265/HEVC (hvc1/hev1): ${hasHvc1} | VP9: ${hasVp9} | AV1: ${hasAv1}`);
}
