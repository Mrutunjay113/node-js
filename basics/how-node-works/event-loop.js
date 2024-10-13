const fs = require("fs");

setTimeout(() => {
  console.log("Timeout 1 finished");
}, 0);

setImmediate(() => {
  console.log("Immediate 1 finished");
});

fs.readFile("test-file.txt", () => {
  console.log("I/O finished");
});

console.log("hello from top-level code");
