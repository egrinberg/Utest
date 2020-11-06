
const axios = require('axios');
const fs = require("fs");
const fileHandler = require("../utils/fileProcessing");
const fetch = require("node-fetch");



const listPosts = async () => {
    try {
        
        var postsURL = 'http://localhost:3000/posts';        
        
        const response = await fetch(postsURL);
        const data = await response.json();

        
        var ids = [];

        for(var item of data) {
          ids.push(item.id);
       }

       Promise.all(
        ids.map(async (id) => {
          try {
            var postUrl = postsURL.concat('/',id);
            await writePostToFile(postUrl,id);             
            
          } catch (error) {
            console.log(error);
          }
        })
      );
        
    } catch (err) {
        console.error(err);
    }
  };

  
  const writePostToFile = async (post,id) => {     
        
    fetch(post)
      .then(
        res =>
          new Promise((resolve, reject) => {
            const path = `./telescope/posts/${id}`;
            const dest = fs.createWriteStream(path);
            res.body.pipe(dest);
            res.body.on("end", () => resolve(path));
            dest.on("error", reject);
          })
      )
      .then(path => {
      console.log(path);
      let p = `${path}`;
      fileHandler.processFile(p); 
    });      
  }

  module.exports = {listPosts};
  