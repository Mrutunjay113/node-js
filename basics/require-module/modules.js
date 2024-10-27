// console.log(arguments);
// console.log(require("module").wrapper);

// Exporting and Importing Modules in Node.js

const Calculator = require("./test-mod1");
console.log(Calculator);
const calc = new Calculator();
console.log(calc.add(2, 3));

// exports and module.exports

// const calc2 = require("./test-mod2");
const { add, multiply, divide } = require("./test-mod2");
console.log(add(2, 3));

// Caching
require("./test-mod3")();
require("./test-mod3")();
require("./test-mod3")();
