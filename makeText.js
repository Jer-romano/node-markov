/** Command-line tool to generate Markov text. */

const fs = require('fs');
const axios = require('axios');
const MarkovMachine = require('./markov');
//const MarkovMachine = markov.MarkovMachine;

let flag = process.argv[2];

function generateText(text) {
    let mm = new MarkovMachine(text);
    console.log(`...generated text...`);
    console.log(mm.makeText());
}

async function getURLText(url) {
    let resp;
    try {
        resp = await axios.get(url);
        generateText(resp.data);
    } catch(err) {
        console.error("GetURLText function failed:", err);
        process.exit(1);
    }
}

function getFileText(path) {
    fs.readFile(path, "utf8", (err, data) => {
        if(err) {
            console.log("Error reading", text, "\n", err);
            process.exit(1);
        }
        else {
            generateText(data);
        }
      })
}

if(flag == "file") {
    let file = process.argv[3];
    getFileText(file);
}
else {
    let url = process.argv[3];
   // console.log(url);
    let response = getURLText(url);
}