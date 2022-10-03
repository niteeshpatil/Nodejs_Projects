// const fs = require("fs");

// //fs.writeFileSync("notes.txt", "The file was created by Node.js");

// fs.appendFileSync("notes.txt", "Hello I am Niteesh");

// const add = require("./utils");
// const name = "Niteesh";
// const sum = add(8, 4);
// console.log(sum);
// const validator = require("validator");
// const getNotes = require("./notes.js");
const chalk = require("chalk");
const yargs = require("yargs");
const notes = require("./notes");

// console.log(msg);
// console.log(validator.isEmail("hello@gmail.com"));
console.log(chalk.red.bold("Hello Niteesh"));

// console.log(process.argv[2]);
// const command = process.argv[2];

// if (command === "add") {
//   console.log("Adding notes!");
// } else if (command === "remove") {
//   console.log("removing note!");
// }

// console.log(process.argv);

yargs.version("1.1.0");

yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.addNote(argv.title, argv.body);
  },
});

yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.removeNote(argv.title);
  },
});

yargs.command({
  command: "list",
  describe: "listing notes",
  handler: () => {
    console.log("listing notes!");
  },
});

yargs.command({
  command: "read",
  describe: "reading a note",
  handler: () => {
    console.log("reading a note!");
  },
});

console.log(yargs.argv);
