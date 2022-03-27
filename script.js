"use strict";

const alphabets = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const possibleWords = [
  "mikko",
  "kakka",
  "koulu",
  "joulu",
  "sauna",
  "laama",
  "naama",
  "sahti",
];

let currentBox = 0;
let currentRow = 0;
let wordToGuess =
  possibleWords[Math.trunc(Math.random() * possibleWords.length)];
let guessedWord = [];
let guessedLetters = { 0: "", 1: "", 2: "", 3: "", 4: "" };
let correctLetters = { 0: "", 1: "", 2: "", 3: "", 4: "" };
let wrongLetters = [];
let gameOver = false;

const init = function () {
  for (let i = 0; i <= 4; i++) {
    for (let y = 0; y <= 4; y++) {
      document.getElementById(`name--${i}--${y}`).textContent = "";
      document
        .querySelector(`.letter-box--${i}--${y}`)
        .classList.remove("player--active");
      document
        .querySelector(`.letter-box--${i}--${y}`)
        .classList.remove("player--correct");
      document
        .querySelector(`.letter-box--${i}--${y}`)
        .classList.remove("player--wrong--place");
      document
        .querySelector(`.letter-box--${i}--${y}`)
        .classList.remove("player--wrong");
    }
  }
  currentBox = 0;
  currentRow = 0;
  guessedWord = [];
  document
    .querySelector(`.letter-box--${currentRow}--${currentBox}`)
    .classList.add("player--active");
};

init();

document.addEventListener("keydown", function (e) {
  if (!gameOver) {
    if (alphabets.includes(e.key)) {
      if (currentBox < 5) {
        document.getElementById(
          `name--${currentRow}--${currentBox}`
        ).textContent = e.key;
        document
          .querySelector(`.letter-box--${currentRow}--${currentBox}`)
          .classList.remove("player--active");

        let guessedLettersArray = [...guessedLetters[currentBox]];
        if (guessedLettersArray.includes(e.key)) {
          document
            .querySelector(`.letter-box--${currentRow}--${currentBox}`)
            .classList.add("player--wrong--place");
        }
        if (wrongLetters.includes(e.key)) {
          document
            .querySelector(`.letter-box--${currentRow}--${currentBox}`)
            .classList.add("player--wrong");
        }
        if (correctLetters[currentBox] == e.key) {
          document
            .querySelector(`.letter-box--${currentRow}--${currentBox}`)
            .classList.add("player--correct");
        }
        currentBox += 1;

        if (currentBox <= 4) {
          document
            .querySelector(`.letter-box--${currentRow}--${currentBox}`)
            .classList.add("player--active");
        } /* else if (currentBox >= 5) {
        currentBox = 4;
      } */
        // console.log(`current box ${currentBox}`);
        guessedWord.push(e.key);
        // console.log(guessedWord);
      }
    } else if (e.key == "Enter") {
      // console.log("enter");

      if (guessedWord.length === 5) {
        let gWord = guessedWord.join("");
        // console.log(gWord);
        if (gWord == wordToGuess) {
          let wordArray = guessedWord;
          console.log("winner is you");
          for (let i = 0; i <= 4; i++) {
            let correctArray = [...wordToGuess];
            if (correctArray.includes(wordArray[i])) {
              // console.log(`This letter was in correct place ${wordArray[i]}`);
              document
                .querySelector(`.letter-box--${currentRow}--${i}`)
                .classList.add("player--correct");
            }
          }
          gameOver = true;
        } else {
          let wordArray = guessedWord;
          let correctArray = [...wordToGuess];
          for (let i = 0; i <= 4; i++) {
            let testArray = [...guessedLetters[i]];
            if (
              correctArray.includes(wordArray[i]) &&
              correctArray[i] !== wordArray[i]
            ) {
              // console.log(`This letter was found ${wordArray[i]}`);
              document
                .querySelector(`.letter-box--${currentRow}--${i}`)
                .classList.add("player--wrong--place");
              guessedLetters[i] += wordArray[i];
            } else if (!correctArray.includes(wordArray[i])) {
              document
                .querySelector(`.letter-box--${currentRow}--${i}`)
                .classList.add("player--wrong");
              wrongLetters.push(wordArray[i]);
            }
          }
          for (let i = 0; i <= 4; i++) {
            if (correctArray[i] == wordArray[i]) {
              // console.log(`This letter was in correct place ${wordArray[i]}`);
              document
                .querySelector(`.letter-box--${currentRow}--${i}`)
                .classList.add("player--correct");
              correctLetters[i] = wordArray[i];

              // console.log(correctLetters);
              // console.log("here");
            }
          }

          currentRow += 1;
          if (currentRow > 4) {
            gameOver = true;
            return;
          }
          currentBox = 0;
          guessedWord = [];
          document
            .querySelector(`.letter-box--${currentRow}--${currentBox}`)
            .classList.add("player--active");
        }
      }
    }
    if (e.key == "Backspace" && currentBox >= 0) {
      // console.log(currentBox);
      if (currentBox !== 0 && currentBox < 5) {
        document
          .querySelector(`.letter-box--${currentRow}--${currentBox}`)
          .classList.remove("player--active");
        document.getElementById(
          `name--${currentRow}--${currentBox}`
        ).textContent = "";
        currentBox--;
        document.getElementById(
          `name--${currentRow}--${currentBox}`
        ).textContent = "";
        guessedWord.pop();
        document
          .querySelector(`.letter-box--${currentRow}--${currentBox}`)
          .classList.add("player--active");
        document
          .querySelector(`.letter-box--${currentRow}--${currentBox}`)
          .classList.remove("player--correct");
        document
          .querySelector(`.letter-box--${currentRow}--${currentBox}`)
          .classList.remove("player--wrong--place");
        document
          .querySelector(`.letter-box--${currentRow}--${currentBox}`)
          .classList.remove("player--wrong");
      } else if (currentBox == 5) {
        // console.log(`AYAETA ${currentBox}`);
        currentBox = 4;
        document.getElementById(
          `name--${currentRow}--${currentBox}`
        ).textContent = "";
        guessedWord.pop();
        document
          .querySelector(`.letter-box--${currentRow}--${currentBox}`)
          .classList.add("player--active");
        document
          .querySelector(`.letter-box--${currentRow}--${currentBox}`)
          .classList.remove("player--correct");
        document
          .querySelector(`.letter-box--${currentRow}--${currentBox}`)
          .classList.remove("player--wrong--place");
        document
          .querySelector(`.letter-box--${currentRow}--${currentBox}`)
          .classList.remove("player--wrong");

        // console.log(`current box ${currentBox}`);
      }
    }
  }
});
