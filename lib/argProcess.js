#!/usr/bin/env node
const chalk = require('chalk');
const boxen = require('boxen');
const yargs = require('yargs');
const version = require('../package.json').version;
const { boxenOptions } = require('../styling/style');
const fileHandler = require('./fileProcessing');

const vmessage = chalk.white.bold(`Utest version: ${version}`);
const msgBox = boxen(vmessage, boxenOptions);

const processArguments = () => {
  const argv = yargs
    .usage('Usage: $0 [option]')
    .alias('f', 'file')
    .nargs('f', 1)
    .describe('f', 'Load a file')
    .demandOption(['f'])
    .help('h')
    .alias('h', 'help')
    .alias('v', 'version')
    .alias('V', 'version')
    .alias('j', 'json')
    .describe('json', 'print in JSON format')
    .version(`${msgBox}`)
    .describe('version', 'show version information').argv;

  if (argv.file) {
    if (argv.json) {
      fileHandler.processFile(argv.file, true);
    } else {
      fileHandler.processFile(argv.file);
    }
  }
  process.on('exit', function (code) {
    return console.log(`About to exit with code ${code}`);
  });
};

module.exports.processArguments = processArguments;
