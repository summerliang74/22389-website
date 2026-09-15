const path = require('path');
const fs = require('fs');
const sharp = require('C:/Users/Summer/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');

const root = path.resolve(__dirname, '..');
const inputDir = path.join(root, 'assets', 'images', 'uniform');
const outputDir = path.join(inputDir, 'cutout');
fs.mkdirSync(outputDir, { recursive: true });

const images = [
  ['微信图片_20260906133157_23_1142.jpg', 'hoodie-white.png', 12],
  ['微信图片_20260906133153_20_1142.jpg', 'tee-race-white.png', 30],
  ['微信图片_20260906133155_21_1142.jpg', 'tee-race-grey.png', 46],
  ['微信图片_20260906133156_22_1142.jpg', 'tee-race-black.png', 46],
  ['微信图片_20260906133158_24_1142.jpg', 'tee-cad-white.png', 30],
  ['微信图片_20260906133200_25_1142.jpg', 'tee-cad-navy.png', 46],
  ['微信图片_20260906133202_26_1142.jpg', 'tee-cad-black.png', 46]
];

async function removeBackground(inputName, outputName, tolerance) {
  const { data, info } = await sharp(path.join(inputDir, inputName))
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const pixelCount = width * height;
  const removed = new Uint8Array(pixelCount);
  const queued = new Uint8Array(pixelCount);
  const queue = new Int32Array(pixelCount);
  let head = 0;
  let tail = 0;

  let bgR = 0;
  let bgG = 0;
  let bgB = 0;
  const sampleSize = 8;
  for (let y = 0; y < sampleSize; y++) {
    for (let x = 0; x < sampleSize; x++) {
      const offset = (y * width + x) * channels;
      bgR += data[offset];
      bgG += data[offset + 1];
      bgB += data[offset + 2];
    }
  }
  const samples = sampleSize * sampleSize;
  bgR /= samples;
  bgG /= samples;
  bgB /= samples;
  const colorLimit = tolerance * tolerance;

  const matchesBackground = pixel => {
    const offset = pixel * channels;
    const dr = data[offset] - bgR;
    const dg = data[offset + 1] - bgG;
    const db = data[offset + 2] - bgB;
    return dr * dr + dg * dg + db * db <= colorLimit;
  };
  const enqueue = pixel => {
    if (queued[pixel] || !matchesBackground(pixel)) return;
    queued[pixel] = 1;
    queue[tail++] = pixel;
  };

  for (let x = 0; x < width; x++) {
    enqueue(x);
    enqueue((height - 1) * width + x);
  }
  for (let y = 0; y < height; y++) {
    enqueue(y * width);
    enqueue(y * width + width - 1);
  }

  while (head < tail) {
    const pixel = queue[head++];
    removed[pixel] = 1;
    const x = pixel % width;
    const y = Math.floor(pixel / width);
    if (x > 0) enqueue(pixel - 1);
    if (x + 1 < width) enqueue(pixel + 1);
    if (y > 0) enqueue(pixel - width);
    if (y + 1 < height) enqueue(pixel + width);
  }

  for (let pixel = 0; pixel < pixelCount; pixel++) {
    if (removed[pixel]) data[pixel * channels + 3] = 0;
  }

  await sharp(data, { raw: info })
    .png({ compressionLevel: 9 })
    .toFile(path.join(outputDir, outputName));
}

(async () => {
  for (const image of images) await removeBackground(...image);
  console.log(`Created ${images.length} transparent uniform images in ${outputDir}`);
})().catch(error => {
  console.error(error);
  process.exit(1);
});
