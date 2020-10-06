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
  var jsonResponse = [];
  var jsonU;

  //Iterate through the links and check their status

  await Promise.all(
    urlList.map(async (url) => {
      try {
        const urlTest = await fetch(url, { method: "head", timeout: 1500 });
        jsonU = { url: `${url}`, status: `${urlTest.status}` };
        jsonResponse.push(jsonU);
      } catch (error) {
        jsonU = { url: `${url}`, status: "UNKNOWN" };
        jsonResponse.push(jsonU);
      }
    })
  );
  if (argv.json) {
    console.log(JSON.stringify(jsonResponse));
  } else {
    printResponse(jsonResponse);
  }
  //var errCode=checkStatus(jsonResponse);
  //console.log(checkStatus(jsonResponse));
  process.exit(checkStatus(jsonResponse));
});
process.on("exit", function (code) {
  return console.log(`About to exit with code ${code}`);
});
