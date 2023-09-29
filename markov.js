/** Textual markov chain generator */
const fs = require('fs');


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
      
      if (text.charAt(0) == ".") {
        fs.readFile(text, "utf8", (err, data) => {
          if(err) {
              console.log("Error reading", text, "\n", err);
              process.exit(1);
          }
          else {
            this.words = data.split(/[ \r\n]+/);
            this.setUp();
          }
        })
      }
      else {
        this.words = text.split(/[ \r\n]+/);
        this.setUp();
      }
  }

  setUp() {
    this.words = this.words.filter(c => c !== "");
    this.numberOfWords = this.words.length;
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]}
   *  I've included the code here from the solution and commented out my own 
   * code because I like the solution's code better (and it's more efficient). 
   *  */
  makeChains() {
      let chains = new Map();

      for (let i = 0; i < this.words.length; i += 1) {
        let word = this.words[i];
        let nextWord = this.words[i + 1] || null;
  
        if (chains.has(word)) chains.get(word).push(nextWord);
        else chains.set(word, [nextWord]);
      }
  
      this.chains = chains;
      // let chains = {};
      // for(let word of this.words) {
      //   if(chains[word] == undefined) {
      //     chains[word] = [];
      //   }
      // }

      // for(let i = 1; i < this.words.length; i++) {
      //   chains[this.words[i-1]].push(this.words[i]);
      // }
      // let numWords = this.words.length;
      // chains[this.words[numWords-1]].push(null); // add null to last word in text
      
      // return chains;
  }


  static chooseRandom(choices) {
    let index = Math.floor(Math.random() * choices.length);
    return choices[index];
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    let text = [];
    let startingWord = MarkovMachine.chooseRandom(this.words);
    text.push(startingWord);

    for(let i = 1; i < numWords; i++) {
      let choices = this.chains[text[i-1]];
      let nextWord = MarkovMachine.chooseRandom(choices);
      if(nextWord == null) {
        text.push(".");
        break;
      }
      else text.push(nextWord);
    }
    return text.join(' ');

  }
}

module.exports = MarkovMachine;
