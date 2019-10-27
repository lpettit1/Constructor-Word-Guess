//A string value to store the underlying character for the letter
//A boolean value that stores whether that letter has been guessed yet
//A function that returns the underlying character if the letter has been guessed, 
//or a placeholder (like an underscore) if the letter has not been guessed
function Letter(letter) {
    this.letter = letter;
    this.isGuessed = false;

    this.getCharacter = function() {
        if(!this.isGuessed) {
            return "_";
        } else {
            return this.letter;
        }
    }
}

//A function that takes a character as an argument and checks it against the underlying character,
// updating the stored boolean value to true if it was guessed correctly
this.checkLetter = function(guess) {
    if(guess === this.letter) {
        this.isGuessed = true;
    }
}

module.exports = Letter;