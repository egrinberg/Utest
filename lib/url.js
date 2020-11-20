//function that testUrl
const fetch = require('node-fetch');

module.exports.testUrl = async function testUrl(url) {
  var statusResponseForUrl;

  try {
    const urlTest = await fetch(url, { method: 'head', timeout: 1500 });

    statusResponseForUrl = { url: `${url}`, status: `${urlTest.status}` };
  } catch (err) {
    statusResponseForUrl = { url: `${url}`, status: 'UNKNOWN' };
  }
  return statusResponseForUrl;
};
