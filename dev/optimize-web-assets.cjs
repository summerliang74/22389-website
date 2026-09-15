const fs = require('fs');
const path = require('path');
let sharp;
try {
  sharp = require('sharp');
} catch {
  sharp = require('C:/Users/Summer/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
}

const root = path.resolve(__dirname, '..');
const imageRoot = path.join(root, 'assets', 'images');

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

const sourceFiles = walk(imageRoot).filter(file => /\.jpe?g$/i.test(file));
const results = [];

async function convert(source) {
  const relative = path.relative(imageRoot, source);
  const isPortrait = relative.startsWith(`members${path.sep}`);
  const maxDimension = isPortrait ? 900 : 2200;
  const destination = source.replace(/\.jpe?g$/i, '.webp');
  await sharp(source)
    .rotate()
    .resize({ width: maxDimension, height: maxDimension, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 78, effort: 5, smartSubsample: true })
    .toFile(destination);
  const before = fs.statSync(source).size;
  const after = fs.statSync(destination).size;
  results.push({ relative, before, after });
}

async function main() {
  const queue = [...sourceFiles];
  const workers = Array.from({ length: 4 }, async () => {
    while (queue.length) await convert(queue.shift());
  });
  await Promise.all(workers);
  const before = results.reduce((sum, item) => sum + item.before, 0);
  const after = results.reduce((sum, item) => sum + item.after, 0);
  console.log(`Converted ${results.length} JPEG files: ${(before / 1048576).toFixed(1)} MB -> ${(after / 1048576).toFixed(1)} MB`);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
