const execa = require('execa');

// Execute the purl command with the given options and arguments
async function run(...args) {
  try {
    const res = await execa.node('./Utest.js', args);
    return res;
  } catch (err) {
    return err;
  }
}

module.exports.run = run;
