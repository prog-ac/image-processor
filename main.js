const sharp = require("sharp");
const src = sharp("./src.png");

async function drawImage(src, out, callback) {
  const buffer = await src.raw().toBuffer();
  const metadata = await src.metadata();
  callback(metadata, buffer);
  await sharp(buffer, {
    raw: {
      width: metadata.width,
      height: metadata.height,
      channels: metadata.channels,
    },
  }).toFile(out);
}

async function main() {
  await drawImage(src, "dst.png", (metadata, buffer) => {
    for (let y = 0; y < metadata.height; y++) {
      for (let x = 0; x < metadata.width; x++) {
        const index = (y * metadata.width + x) * metadata.channels;
        for (let c = 0; c < 3; c++) {
          // buffer[index + c] = 0xff;
        }
      }
    }
  });
}
main();
