
const fetch = require("node-fetch");
const chalk = require("chalk");
const fs = require("fs");



let urlList;

const processFile =  (filename,json) => {

    // Create stream with the file
    let s = fs.createReadStream(filename);  

    return new Promise((resolve, reject) => {

      s.on("data", (buf) => {
        // Get all the URL links from the file
        urlList = buf
          .toString()
          .match(/(http|https)(:\/\/)([\w+\-&@`~#$%^*.=/?:]+)/gi);
          // console.log(`${filename} ${urlList}`)
      });
    
      s.on("end", async () => {
        var responseStatusByUrl = [];
        var statusResponseForUrl;
      
        //Iterate through the links and check their status
      
        await Promise.all(
          urlList.map(async (url) => {
            try {
              const urlTest = await fetch(url, { method: "head", timeout: 1500 });
              statusResponseForUrl = { url: `${url}`, status: `${urlTest.status}` };
              responseStatusByUrl.push(statusResponseForUrl);
            } catch (error) {
              statusResponseForUrl = { url: `${url}`, status: "UNKNOWN" };
              responseStatusByUrl.push(statusResponseForUrl);
            }
          })
        );
        if (json) {
          console.log(JSON.stringify(responseStatusByUrl));
        } else {
          printResponse(responseStatusByUrl);
        }
        
        process.exit(checkStatus(responseStatusByUrl));
        
      });

      s.on("error",error => reject(error));
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

module.exports = { processFile }