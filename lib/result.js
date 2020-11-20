const chalk = require('chalk');

//print responses colorized
module.exports.printResponse = function printResponse(data) {
  for (var item of data) {
    if (item.status == 200) {
      console.log(chalk.green.bold(`[GOOD] Status: [${item.status}] ${item.url}`));
    } else if (item.status == 400 || item.status == 404) {
      console.log(chalk.red.bold(`[BAD] Status: [${item.status}] ${item.url}`));
    } else {
      console.log(chalk.grey.bold(`[UNKNOWN] Status: [${item.status}] ${item.url}`));
    }
  }
};
