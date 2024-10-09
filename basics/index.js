const fs = require("fs");
const http = require("http");
const url = require("url");

/////////////////////////////////

//FILES

//reading files - blocking, synchronous way
const data1 = fs.readFileSync("./input.txt", "utf-8");
console.log(data1);

//writing files
const textOut = `This is what we know about the avocado: ${data}.\nCreated on ${Date.now()}`;
fs.writeFileSync("./output.txt", textOut);
console.log("File written!");

//non-blocking, async way of reading files

fs.readFile("./input.txt", "utf-8", (err, data) => {
  if (err) return console.log("Error! 💥");
  console.log(data);
});

// console.log("Reading file!");

//non-blocking, async way of writing files
fs.readFile("./input.txt", "utf-8", (err, data) => {
  fs.writeFile(
    "./output.txt",
    `This is what we know about the avocado: ${data}.\nCreated on ${Date.now()}`,
    "utf-8",
    (err) => {
      console.log("File written!");
    }
  );
});

/////////////////////////////////
// SERVER

const server1 = http.createServer((req, res) => {
  res.end("Hello from the server!");
});

server1.listen(8000, "127.0.0.1", () => {
  console.log("listening");
});

/////////////////////////////////
// ROUTING

const server2 = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === "/overview" || pathName === "/") {
    res.end("This is the OVERVIEW");
  } else if (pathName === "/product") {
    res.end("This is the PRODUCT");
  } else {
    res.end("Page not found!");
  }
});

server2.listen(8000, "127.0.0.1", () => {
  console.log("Server is running on port 8000");
});

/////////////////////////////////
// BUILDING A SIMPLE API

const data = fs.readFileSync(`${__dirname}/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === "/overview" || pathName === "/") {
    res.end("This is the OVERVIEW");
  } else if (pathName === "/product") {
    res.end("This is the PRODUCT");
  } else if (pathName === "/api") {
    res.writeHead(200, {
      "Conent-type": "application/json",
    });
    res.end(data);
  } else {
    res.end("Page not found!");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Server is running on port 8000");
});
