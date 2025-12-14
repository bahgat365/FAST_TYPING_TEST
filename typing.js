const YourLevel = document.querySelector("#my_selector");
const StartBtn = document.querySelector(".start");
const secondsSpan = document.querySelector(".time");
const program_words = document.querySelector(".all_Words");
const input = document.querySelector("#Your_word");
const word = document.querySelector(".word");
const time_left = document.querySelector(".time_left");
const Your_score = document.querySelector(".Your_score");
const fail = document.querySelector(".fail");
const gen_score = document.querySelector(".gen_score");
const win = document.querySelector(".win");

let timer;
let wordsList = [];

const times = {
  easy: 5,
  normal: 4,
  hard: 3,
};

const allWords = {
  easy: [
    "cat","dog","sun","cup","red","blue","pen","book","apple","ball",
    "car","hat","map","egg","milk","tree","bird","fish","home","star"
  ],
  normal: [
    "apple","house","green","light","small","phone","music","child",
    "yellow","banana","window","planet","coffee","people","button"
  ],
  hard: [
    "computer","keyboard","programming","javascript","development",
    "algorithm","database","performance","application","technology"
  ],
};

/*Change Level */
YourLevel.addEventListener("change", () => {
  const level = YourLevel.value;
  if (!level) return;

  secondsSpan.textContent = times[level];
  time_left.textContent = times[level];
  gen_score.textContent = allWords[level].length;
  writeAllWords(level);
});

/*Start Game*/
StartBtn.addEventListener("click", () => {
  const level = YourLevel.value;

  if (!level) {
    Swal.fire("Choose Level First ❌");
    return;
  }

  StartBtn.style.display = "none";
  input.focus();
  Your_score.textContent = 0;
  fail.textContent = "";
  win.textContent = "";

  wordsList = [...allWords[level]];
  nextWord();
});

/*Write Words */
function writeAllWords(level) {
  program_words.innerHTML = "";
  allWords[level].forEach(w => {
    const div = document.createElement("div");
    div.className = "program_word";
    div.textContent = w;
    program_words.appendChild(div);
  });
}

/*Get Random Word*/
function nextWord() {
  clearInterval(timer);

  if (wordsList.length === 0) {
    win.textContent = "🎉 Congratulations!";
    return;
  }

  const index = Math.floor(Math.random() * wordsList.length);
  const currentWord = wordsList.splice(index, 1)[0];
  word.textContent = currentWord;
  input.value = "";

  startTimer();
}

/*Timer*/
function startTimer() {
  time_left.textContent = secondsSpan.textContent;

  timer = setInterval(() => {
    time_left.textContent--;

    if (time_left.textContent == 0) {
      clearInterval(timer);
      checkWord();
    }
  }, 1000);
}

/*Check Word*/
function checkWord() {
  if (input.value.toLowerCase() === word.textContent.toLowerCase()) {
    Your_score.textContent++;
    nextWord();
  } else {
    fail.textContent = "💥 Game Over";
    Swal.fire("Game Over 😢");
    StartBtn.style.display = "block";
  }
}

/* Prevent Paste */
input.addEventListener("paste", e => e.preventDefault());
