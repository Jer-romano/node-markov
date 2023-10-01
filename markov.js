/** Textual markov chain generator */
class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
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
 }
      // let chains = {};
      // for(let word of this.words) {
      //   if(chains[word] == undefined) {
      //     chains[word] = [];
      //   }
      // }

      // for(let i = 1; i < this.words.length; i++) {
      //   chains[this.words[i-1]].push(this.words[i]);
      // }
      // chains[this.words[numWords-1]].push(null); // add null to last word in text
      
      // return chains;
  //}

  static chooseRandom(choices) {
    let index = Math.floor(Math.random() * choices.length);
    return choices[index];
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    let text = [];
    let startingWord = MarkovMachine.chooseRandom(this.words);
    text.push(startingWord);
   // console.log("HHHH")

    for(let i = 1; i < numWords; i++) {
      let choices = this.chains.get(text[i-1]);
     //console.log(choices);
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
