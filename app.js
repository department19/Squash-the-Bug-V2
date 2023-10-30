document.addEventListener("DOMContentLoaded", function() {
  const holes = document.querySelectorAll(".hole");
  // will make an arraylike nodelist of the holes
  // will the const make it not update when i add more?
  //   maybe need to make this a function to update on addition?

  const scoreDisplay = document.getElementById("score-value");
  const timerDisplay = document.getElementById("timer-value");
  const gameStartButton = document.getElementById("startGame");
  const gameStopButton = document.getElementById("stopGame");
  const bug = document.createElement("img");
  bug.setAttribute("src", "assets/green_bug.png");
  bug.id = "bug";

  let bugTimeout;
  let score;
  let time;
  let timer;
  let isGameRunning = false;

  function spawnBug() {
    const randomHole = holes[Math.floor(Math.random() * holes.length)];
    randomHole.classList.add("bug");
    randomHole.appendChild(bug);
    const spawnTimer = ((Math.random() * 5000) + 500);
    bugTimeout = setTimeout(() => {
      randomHole.classList.remove("bug");
      randomHole.removeChild(bug);
    }, spawnTimer);
    if (isGameRunning) {
      console.log("tick");
      setTimeout(() => {
        clearTimeout(bugTimeout);
        spawnBug();
      }, (spawnTimer + 500));
    }
  }

  function whackBug(target) {
    target.classList.remove("bug");
    target.removeChild(bug);
    score++;
    scoreDisplay.textContent = score;
    clearTimeout(bugTimeout);
    setTimeout(() => {
      spawnBug();
    }, (Math.random() * 1000));
  }

  function resetGame() {
    score = 0;
    time = 30;
    scoreDisplay.textContent = score;
    timerDisplay.textContent = time;
  }

  function startTimer() {
    time = 30;
    timer = setInterval(() => {
      time--;
      timerDisplay.textContent = time;
      if (time <= 0) {
        stopGame();
        clearInterval(timer);
      }
    }, 1000);
  }

  function stopGame() {
    gameStopButton.classList.add("hidden");
    gameStartButton.classList.remove("hidden");
    isGameRunning = false;
    clearInterval(timer);
    alert("game end");
    time = 0;
    timerDisplay.textContent = time;
    holes.forEach((hole) => {
      if (hole.contains(bug)) {
        hole.classList.remove("bug");
        hole.removeChild(bug);
      }
    });
    clearTimeout(bugTimeout);
  }

  function startGame() {
    console.log("startgame");
    gameStartButton.classList.add("hidden");
    gameStopButton.classList.remove("hidden");
    resetGame();
    if (isGameRunning == false) {
      isGameRunning = true;
    }
    holes.forEach((hole) => {
      hole.addEventListener("mousedown", () => {
        if (hole.contains(bug)) {
          whackBug(hole);
        }
      });
    });
    startTimer();
    spawnBug();
  }

  gameStartButton.addEventListener("click", () => {
    startGame();
  });

  gameStopButton.addEventListener("click", () => {
    stopGame();
  });
});
