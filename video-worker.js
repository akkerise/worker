const { parentPort } = require("worker_threads");
const ffmpeg = require("fluent-ffmpeg");

const resizeVideo = (src, size) => {
  const [filename, ext] = src.split(".");
  const output = `${__dirname}/${filename}-${size}.${ext}`;
  ffmpeg(`${__dirname}/${src}`)
    .size(size)
    .on("end", () => parentPort.postMessage({ output, input: src, type: "done" }))
    .save(output);
};

parentPort.on("message", msg => {
  console.log(`Start at ${new Date().getTime()}`);
  const { file, size } = msg;
  const [filename, ext] = file.split(".")[0];
  resizeVideo(file, size);
});
