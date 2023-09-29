/** Command-line tool to generate Markov text. */

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
    try {
        let resp = await axios.get(url);
        console.log(resp.status)
        console.log(resp.headers)
        console.log(typeof(resp.data))
        return resp.data;
    } catch(err) {
        console.error("GetURLText function failed:", err);
        process.exit(1);
    }
    
}

function getFileText(path) {
    fs.readFile(text, "utf8", (err, data) => {
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
    let mm = new MarkovMachine("./" + file, () => {
        console.log(`...generated text from file ${file}...`);
        //console.log(mm.numberOfWords);
        console.log(mm.makeText());
    });
}
else {
    let url = process.argv[3];
   // console.log(url);
    let response = getURLText(url);
    //console.log("Response type:", typeof(response))
    //console.log(response);
 

    
}