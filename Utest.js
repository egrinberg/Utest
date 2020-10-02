#!/usr/bin/env node

const chalk = require("chalk");
const boxen = require("boxen");
const yargs = require("yargs");
const fetch = require("node-fetch");
const fs = require("fs");
const v = require("./package.json").version;

//styling of the box for the tool name and version
const boxenOptions = {
  padding: 1,
  margin: 1,
  borderStyle: "round",
  borderColor: "green",
  backgroundColor: "#555555",
};

const vmessage = chalk.white.bold(`Utest version: ${v}`);
const msgBox = boxen(vmessage, boxenOptions);

const argv = yargs
  .usage("Usage: $0 [option]")
  .alias("f", "file")
  .nargs("f", 1)
  .describe("f", "Load a file")
  .demandOption(["f"])
  .help("h")
  .alias("h", "help")
  .alias("v", "version")
  .alias("V", "version")
  .version(`${msgBox}`)
  .describe("version", "show version information").argv;

// Create stream with the file
const s = fs.createReadStream(argv.file);

let urlList;
s.on("data", (buf) => {
  // Get all the URL links from the file
  urlList = buf
    .toString()
    .match(/(http|https)(:\/\/)([\w+\-&@`~#$%^*.=/?:]+)/gi);
});

function timeout(ms, promise) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      reject(new Error("timeout"))
    }, ms)
    promise.then(resolve, reject)
  })
}

s.on("end", () => {
  //Iterate through the links and check their status
  urlList.forEach(async (url) => {
    timeout(3000, fetch(url, { method: "head" })).then(function(res) {
      if (res.status == 200) {
        console.log(
          chalk.green.bold(`[GOOD] Status: [${res.status}] ${url}`)
        );
      } else if (res.status == 400 || res.status == 404){
        console.log(chalk.red.bold(`[BAD] Status: [${res.status}] ${url}`));
      }else{
        console.log(
          chalk.grey.bold(`[UNKNOWN] Status: [${res.status}] ${url}`)
        );
      }
    }).catch(function(err) {
      console.log(chalk.grey.bold(`[UNKNOWN] Status: [UNKNOWN] ${url}`));
    })   
  });
});
