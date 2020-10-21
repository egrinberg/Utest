#!/usr/bin/env node

const chalk = require("chalk");
const boxen = require("boxen");
const yargs = require("yargs");
const fetch = require("node-fetch");
const fs = require("fs");
const readline = require("readline");
const { boolean } = require("yargs");
const { resolve } = require("path");
//const { error } = require("console");
const v = require("./package.json").version;


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
  .alias("i","ignore")
  .nargs("i", 1)
  .describe("ignore","ignore URLs in this file")
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

function readIgnoreURL(){
  if(!argv.ignore)
    return Promise.resolve([]);

  return new Promise((resolve, reject) => {
    const urlToBeIgnored = [];
    const readInterface = readline.createInterface({
      input: fs.createReadStream(argv.ignore),
      console: false
    });
  
    readInterface
    .on('line', function(line) {
      if(!line.startsWith('#'))
        urlToBeIgnored.push(line);
    })
    .on('error', function(error) {
      reject(error)
    })
    .on('close', function() {
      resolve(urlToBeIgnored);
    }); 

  });
}

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
  
  readIgnoreURL().then((urlToBeIgnored) => {
    urlList = urlList.filter((url) => !urlToBeIgnored.includes(url));
    Promise.all(urlList.map((url) => {
      return fetch(url, { method: "head", timeout: 1500 }).then((response) => {
        return Promise.resolve({ url, status: `${response.status}` });
      }).catch((error) => {
        return Promise.resolve({ url, status: (error.response && error.response.status) || 'UNKNOWN' });
      });
    })).then((result) => {
      argv.json ? console.log(JSON.stringify(result)) : printResponse(result);
      process.exit(checkStatus(result));
    }).catch((error) => {
      console.log('Error occured while checking status', error);
    });
  })
  .catch(err => {
    console.log("Error occurred while reading file", err)
  });
});

process.on("exit", function (code) {
  return console.log(`About to exit with code ${code}`);
});
