const fs = require("fs");
const superagent = require("superagent");

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("I could not find that file");
      resolve(data);
    });
  });
};

writeFilePro = (file, data) => {
  return new Promise((resolve, reject) =>
    fs.writeFile(file, data, (err) => {
      if (err) reject("I could not write the file");
      resolve("success");
    })
  );
};

// Callback hell

fs.readFile(`${__dirname}/dog.txt`, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .end((err, res) => {
      if (err) return console.log(err.message);
      console.log(res.body.message);
      fs.writeFile("dog-img.txt", res.body.message, (err) => {
        if (err) return console.log(err.message);
        console.log("Random dog image saved to file!");
      });
    });
});

// Promises - then() method

readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`Breed: ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    return writeFilePro("dog-img.txt", res.body.message);
  })
  .then(() => {
    console.log("Random dog image saved to file!");
  })
  .catch((err) => {
    console.log(err.message);
  });

// Async-await - syntactic sugar for promises  - async function always returns a promise

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(res.body.message);
    await writeFilePro("dog-img.txt", res.body.message);
    console.log("Random dog image saved to file!");
  } catch (error) {
    console.log(error);
  }
};
getDogPic();
