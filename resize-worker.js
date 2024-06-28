const { parentPort, workerData } = require("worker_threads");
const sharp = require("sharp");
console.log(workerData)

const { src, width, height } = workerData;
const [filename, ext] = src.split(".");

console.log(`Resizing ${src} to ${width}px wide`);

const resize = async () => {
  await sharp(src)
    .resize(width, height, { fit: "cover" })
    .toFile(`${src}-${width}.${ext}`);
};

resize();
