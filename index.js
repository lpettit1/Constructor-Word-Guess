const Word = require("./word");
const inquirer = require("inquirer");

const wordBank = [
    "baldur", "bragi", "freyia", "freyr", "frigga",
    "loki", "thor", "odin", "heimdallr", "njord",
    "tyr", "vidar", "midgard", "asgard", "vanaheim",
    "jotunheim", "niflheim", "muspelheim", "alfheim",
    "savrtalfheim", "hel", "yggdrasill"
];

let guesses;
let pickedWords;
let word;
let pickedWord;

function init() {
    pickedWords = [];
    console.log("HELLO, AND WELCOME TO MY VIKING MYTHOLOGY WORD GUESS");
    console.log("\n--------------------\n");
    playGame();
}

function playGame() {
    pickedWord = "";
    guesses = 20;
    if (pickedWords.length < wordBank.length) {
        pickedWord = getWord();
    } else {
        //WIN CONDITION
        console.log("YOU HAVE MADE IT TO VALHALLA");
        console.log("\n--------------------\n");
        continuePrompt();
    }
    if (pickedWord) {
        word = new Word(pickedWord);
        word.makeLetters();
        makeGuess();
    }
}

function getWord() {
    let rand = Math.floor(Math.random() * wordBank.length);
    let randomWord = wordBank[rand];
    if (pickedWords.indexOf(randomWord) === -1) {
        pickedWords.push(randomWord);
        return randomWord;
    } else {
        return getWord();
    }
}

function makeGuess() {
    let checker = [];
    inquirer.prompt([
        {
            name: "guessedLetter",
            message: word.update() +
                "\nGuess a letter!" +
                "\nGuesses Left: " + guesses
        }

    ])

        .then(data => {
            word.letters.forEach(letter => {
                letter.checkLetter(data.guessedLetter);
                checker.push(letter.getCharacter());
                console.log(data.guessedLetter)
            });
            if (guesses > 0 && checker.indexOf("_") !== -1) {
                guesses--;
                if (guesses === 0) {
                    console.log("YOU HAVE BEEN DRAGGED DOWN TO HEL! GAME OVER");
                    console.log("\n--------------------\n");
                    continuePrompt();
                } else {
                    makeGuess();
                }
            } else {
                console.log("YOU HAVE GUESS THE WORD AND ARE FOUND TO BE WORTHY TO ENTER VALHALLA!");
                console.log("\n--------------------\na");
                console.log(word.update());
                playGame();
            }

        });

}

function continuePrompt() {
    inquirer.prompt([
        {
            name: "continue",
            type: "list",
            message: "Would you like to play again?",
            choices: ["YES", "NO"]
        }
    ])

        .then(data => {
            if (data.continue === "YES") {
                init();
            } else {
                console.log("Thanks for playing Viking Mythology Word Guess")
            }
        });
}

init();