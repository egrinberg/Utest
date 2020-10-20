#!/usr/bin/env node

const chalk = require("chalk");
const boxen = require("boxen");
const yargs = require("yargs");
const fetch = require("node-fetch");
const fs = require("fs");
const version = require("./package.json").version;
const { boxenOptions } = require("./styling/style");


const vmessage = chalk.white.bold(`Utest version: ${version}`);
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
  .alias("j", "json")
  .describe("json", "print in JSON format")
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

//print responses colorized
function printResponse(data) {
  for (var item of data) {
    if (item.status == 200) {
      console.log(
        chalk.green.bold(`[GOOD] Status: [${item.status}] ${item.url}`)
      );
    } else if (item.status == 400 || item.status == 404) {
      console.log(chalk.red.bold(`[BAD] Status: [${item.status}] ${item.url}`));
    } else {
      console.log(
        chalk.grey.bold(`[UNKNOWN] Status: [${item.status}] ${item.url}`)
      );
    }
  }
}

function checkStatus(data) {
  for (var item of data) {
    if (item.status == 400 || item.status == 404 || item.status == "UNKNOWN") {
      return 1;
    }
  }
  return 0;
}

s.on("end", async () => {
  var responseStatusByUrl = [];
  var statusResponseForUrl;

  //Iterate through the links and check their status

  await Promise.all(
    urlList.map(async (url) => {
      try {
        const urlTest = await fetch(url, { method: "head", timeout: 1500 });
        statusResponseForUrl = { url: `${url}`, status: `${urlTest.status}` };
        responseStatusByUrl.push(statusResponseForUrl);
      } catch (error) {
        statusResponseForUrl = { url: `${url}`, status: "UNKNOWN" };
        responseStatusByUrl.push(statusResponseForUrl);
      }
    })
  );
  if (argv.json) {
    console.log(JSON.stringify(responseStatusByUrl));
  } else {
    printResponse(responseStatusByUrl);
  }
  
  process.exit(checkStatus(responseStatusByUrl));
});
process.on("exit", function (code) {
  return console.log(`About to exit with code ${code}`);
});
