let gameSeq = [];
let userSeq = [];
let level = 0;
let started = false;

document.addEventListener("keydown", function () {
  if (!started) {
    console.log("Game started");
    started = true;
    levelUp();
  }
});

let btnColors = ["red", "blue", "green", "yellow"];

function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 200);
}

let head = document.querySelector("h3");

function levelUp() {
  userSeq = [];
  level++;
  head.innerText = `Level ${level}`;
  
  // Randomly pick a color and push it to game sequence
  let randNum = Math.floor(Math.random() * btnColors.length);
  let randColor = btnColors[randNum];
  let randBtn = document.querySelector(`#${randColor}`);
  gameSeq.push(randColor);
  
  console.log(gameSeq);
  btnFlash(randBtn);
}

let allbtns = document.querySelectorAll(".btn");

function userClick() {
  let clickedBtn = this;
  let userCol = clickedBtn.getAttribute("id"); // Fix the btn issue
  userSeq.push(userCol);
  console.log(userSeq);
  checkAns(userSeq.length - 1);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    // If correct, move to the next level after 1 second
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    head.innerHTML = `Game Over! Your Score was <b>${level}</b> <br> Press any key to restart`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);
    reset();
  }
}

for (let btn of allbtns) {
  btn.addEventListener("click", userClick);
}

function reset() {
  started = false;
  userSeq = [];
  gameSeq = [];
  level = 0;
}
