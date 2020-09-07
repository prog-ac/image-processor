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
    for (let h = 0; h < metadata.height; h++) {
      for (let w = 0; w < metadata.width; w++) {
        const index = (h * metadata.width + w) * metadata.channels;
        for (let c = 0; c < 3; c++) {
          // buffer[index + c] = 0xff;
        }
      }
    }
  });
}
main();
