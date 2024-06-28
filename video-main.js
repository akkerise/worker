const { StaticPool } = require("node-worker-threads-pool");

const pool = new StaticPool({
  size: 4,
  task: __dirname + "/video-worker.js"
});

const videoToResize = process.argv[2];
const videoTargetSize = process.argv[3];

const resize = async () => {
  await pool.exec({ file: videoToResize, size: videoTargetSize })
    .then(() => {
      if (msg?.type === "done") {
        console.log(`Saved ${videoToResize} to ${msg.output}`);
        console.log(`Finished at ${new Date().getTime()}`);
      }
    });
};

resize();
