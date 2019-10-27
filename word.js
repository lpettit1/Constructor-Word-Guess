//pulling from and using letter.js
const Letter = require("./letter");
//* An array of `new` Letter objects representing the letters of the underlying word
function Word(word) {
    this.word = word;
    this.letters = [];
//* A function that returns a string representing the word. This should call 
//the function on each letter object (the first function defined in `Letter.js`) 
//that displays the character or an underscore and concatenate those together.
    this.makeLetters = function() {
        let wordArr = this.word.split("");
        for(let i = 0; i <wordArr.length; i++) {
            let newLetter = new Letter(wordArr[i]);
            this.letters.push(newLetter);
        }
    }
//* A function that takes a character as an argument and calls the guess function 
//on each letter object (the second function defined in `Letter.js`)

    this.makeGuess = function(guess) {
        this.letters.forEach(letter => {
            letter.checkLetter(guess);
        })
    }

    this.update = function() {
        let printedWord = "";
        this.letters.forEach(letter => {
            printedWord += letter.getCharacter() + " ";
        });
        return printedWord;
    }
}

module.exports = Word;

