const fs = require("fs");

//reading files - blocking, synchronous way
const data = fs.readFileSync("./input.txt", "utf-8");
console.log(data);

//writing files
const textOut = `This is what we know about the avocado: ${data}.\nCreated on ${Date.now()}`;
fs.writeFileSync("./output.txt", textOut);
console.log("File written!");

//non-blocking, async way of reading files

fs.readFile("./input.txt", "utf-8", (err, data) => {
  if (err) return console.log("Error! 💥");
  console.log(data);
});

console.log("Reading file!");
