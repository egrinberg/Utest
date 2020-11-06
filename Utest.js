#!/usr/bin/env node

const chalk = require("chalk");
const boxen = require("boxen");
const yargs = require("yargs");
const version = require("./package.json").version;
const { boxenOptions } = require("./styling/style");
const posts = require("./telescope/posts");
const fileHandler = require("./utils/fileProcessing");

const vmessage = chalk.white.bold(`Utest version: ${version}`);
const msgBox = boxen(vmessage, boxenOptions);

const argv = yargs
  .usage("Usage: $0 [option]")
  .alias("f", "file")
  .nargs("f", 1)
  .describe("f", "Load a file")  
  .help("h")
  .alias("h", "help")
  .alias("v", "version")
  .alias("V", "version")
  .alias("j", "json")
  .alias("t", "telescope")
  .describe("telescope", "check urls in telescope last 10 posts")
  .describe("json", "print in JSON format")
  .version(`${msgBox}`)
  .describe("version", "show version information").argv;



if(argv.telescope)
{
  posts.listPosts();
}

if(argv.file)
{
  if(argv.json)
  {
    fileHandler.processFile(argv.file,true);
  }else{
    fileHandler.processFile(argv.file);
  }
 
}


process.on("exit", function (code) {
  return console.log(`About to exit with code ${code}`);
});
