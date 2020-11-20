const fs = require('fs');
const { printResponse } = require('./result');
const { checkStatus } = require('./statusChecker');
const { testUrl } = require('./url');

let urlList;

const processFile = (filename, json) => {
  // Create stream with the file
  let s = fs.createReadStream(filename);

  s.on('data', (buf) => {
    // Get all the URL links from the file
    urlList = buf.toString().match(/(http|https)(:\/\/)([\w+\-&@`~#$%^*.=/?:]+)/gi);
  });

  s.on('end', async () => {
    var responseStatusByUrl = [];

    await Promise.all(urlList.map(async (url) => responseStatusByUrl.push(await testUrl(url))));
    if (json) {
      console.log(JSON.stringify(responseStatusByUrl));
    } else {
      printResponse(responseStatusByUrl);
    }

    process.exit(checkStatus(responseStatusByUrl));
  });
};

module.exports.processFile = processFile;
