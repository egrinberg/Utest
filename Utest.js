const { processArguments } = require('./lib/argProcess');

function main() {
  processArguments();
  console.log('test the module');
}

main();

module.exports.main = main;
