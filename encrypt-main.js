const { Worker } = require("worker_threads");

// Perform some other tasks here

const fileToEncrypt = process.argv[2];

const worker = new Worker(
  __dirname + "/encrypt-worker.js",
  {
    workerData: {
      file: fileToEncrypt
    }
  }
);

worker.on("message", msg => {
  if (msg?.type === "done") {
    console.log(`File encrypted to ${msg.output}`);
    console.log(`The key is ${msg.key} - don't lose it!`);
  }
});

// Perform some other tasks that don't need to wait for the encryption here
