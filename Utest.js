#!/usr/bin/env node

const { processArguments } = require('./lib/argProcess');

function urlTester() {
  processArguments();
  console.log('test the module');
}

urlTester();
module.exports.urlTester = urlTester;
