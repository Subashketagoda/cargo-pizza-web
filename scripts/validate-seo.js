import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

function validate() {
  console.log('--- Validating SEO & Assets ---');

  // 1. Validate index.html JSON-LD
  const html = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');
  const schemaMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (!schemaMatch) {
    throw new Error('JSON-LD script tag missing in index.html');
  }

  const schema = JSON.parse(schemaMatch[1]);
  console.log('✓ JSON-LD is syntactically valid JSON');
  console.log(`✓ Graph entities count: ${schema['@graph'].length}`);

  const org = schema['@graph'].find((e) => e['@type'] === 'Organization');
  if (!org) throw new Error('Organization entity missing in schema');
  console.log('✓ Organization entity found:', org.name, 'Logo:', org.logo?.url || org.logo);

  const rest = schema['@graph'].find(
    (e) => Array.isArray(e['@type']) && e['@type'].includes('Restaurant')
  );
  if (!rest) throw new Error('Restaurant entity missing in schema');
  console.log('✓ Restaurant entity found with parentOrganization:', rest.parentOrganization);

  const website = schema['@graph'].find((e) => e['@type'] === 'WebSite');
  if (!website) throw new Error('WebSite entity missing in schema');
  console.log('✓ WebSite entity found with publisher:', website.publisher);

  // 2. Validate Favicon Tags in index.html
  const linkMatches = html.match(/<link[^>]+rel="[^"]*icon[^"]*"[^>]*>/gi) || [];
  console.log(`✓ Found ${linkMatches.length} favicon link tags in index.html`);
  linkMatches.forEach((l) => console.log('   ', l));

  // 3. Validate Public Assets
  const requiredPublicFiles = [
    'favicon.ico',
    'favicon-16x16.png',
    'favicon-32x32.png',
    'favicon-48x48.png',
    'favicon-96x96.png',
    'favicon-192x192.png',
    'favicon-512x512.png',
    'apple-touch-icon.png',
    'favicon.png',
    'logo.png',
    'logo-circle.png',
    'robots.txt',
    'sitemap.xml',
    'site.webmanifest'
  ];

  for (const file of requiredPublicFiles) {
    const p = path.join(rootDir, 'public', file);
    if (!fs.existsSync(p)) {
      throw new Error(`Missing required public asset: ${file}`);
    }
    const stat = fs.statSync(p);
    console.log(`✓ Asset public/${file} exists (${stat.size} bytes)`);
  }

  // 4. Check favicon.ico binary header
  const icoBuf = fs.readFileSync(path.join(rootDir, 'public', 'favicon.ico'));
  const reserved = icoBuf.readUInt16LE(0);
  const type = icoBuf.readUInt16LE(2);
  const count = icoBuf.readUInt16LE(4);
  if (reserved !== 0 || type !== 1 || count !== 3) {
    throw new Error(`Invalid favicon.ico header: reserved=${reserved}, type=${type}, count=${count}`);
  }
  console.log(`✓ favicon.ico is a valid ICO container with ${count} icon frames`);

  console.log('--- All SEO & Asset Checks Passed! ---');
}

try {
  validate();
} catch (e) {
  console.error('Validation failed:', e);
  process.exit(1);
}
