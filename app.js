document.addEventListener("DOMContentLoaded", function() {
  const holes = document.querySelectorAll(".hole");
  // will make an arraylike nodelist of the holes
  // will the const make it not update when i add more?
  // maybe need to make this a function to update on addition?

  const scoreDisplay = document.getElementById("score-value");
  const timerDisplay = document.getElementById("timer-value");
  const gameStartButton = document.getElementById("startGame");
  const gameStopButton = document.getElementById("stopGame");
  const bug = document.createElement("img");
  bug.setAttribute("src", "assets/green_bug.png");
  bug.id = "bug";

  const classObserver = new MutationObserver(bugClass);
  const config = {
    attributes: true,
    attributeFilter: ["class"],
  };

  // const spawnTimer = 1000;
  let score = 0;
  let time;
  let timer;
  let isGameRunning = false;
  let randomHole;
  let bugFleeTimer;

  function spawnBug() {
    if (isGameRunning) {
      randomHole = holes[Math.floor(Math.random() * holes.length)];
      randomHole.classList.add("bug");
      bugFleeTimer = setTimeout(() => {
        bugFlee(randomHole);
      }, 5000);
    }
  }

  function bugFlee(element) {
    if (element.classList.contains("bug")) {
      element.classList.remove("bug");
      setTimeout(() => {
        if (isGameRunning) {
          spawnBug();
        }
      }, 2000);
    }
  }

  function whackBug(element) {
    element.classList.remove("bug");
    clearTimeout(bugFleeTimer);
    score++;
    scoreDisplay.textContent = score;
    setTimeout(() => {
      if (isGameRunning) {
        spawnBug();
      }
    }, 1000);
  }

  function resetGame() {
    score = 0;
    time = 0;
    scoreDisplay.textContent = score;
    timerDisplay.textContent = time;
  }

  function startTimer() {
    time = 30;
    timerDisplay.textContent = time;
    timer = setInterval(() => {
      time--;
      timerDisplay.textContent = time;
      if (time < 0) {
        stopGame();
        clearInterval(timer);
      }
    }, 1000);
  }

  function stopGame() {
    isGameRunning = false;
    gameStopButton.classList.add("hidden");
    gameStartButton.classList.remove("hidden");
    clearInterval(timer);
    clearTimeout(bugFleeTimer);
    alert("game end");
    resetGame();
    timerDisplay.textContent = time;
    holes.forEach((hole) => {
      if (hole.contains(bug)) {
        hole.classList.remove("bug");
      }
    });
  }

  function startGame() {
    console.log("startgame");
    gameStartButton.classList.add("hidden");
    gameStopButton.classList.remove("hidden");
    isGameRunning = true;
    startTimer();
    spawnBug();
  }

  function bugClass(mutationList, observer) {
    for (const mutation of mutationList) {
      if (mutation.type === "attributes" && mutation.attributeName === "class") {
        if (mutation.target.classList.contains("bug")) {
          mutation.target.appendChild(bug);
        } else {
          mutation.target.removeChild(bug);
        }
      }
    }
  }

  holes.forEach((hole) => {
    hole.addEventListener("mousedown", function() {
      if (isGameRunning && hole.classList.contains("bug")) {
        whackBug(hole);
      }
    });
    classObserver.observe(hole, config);
  });

  gameStartButton.addEventListener("click", () => {
    startGame();
  });

  gameStopButton.addEventListener("click", () => {
    stopGame();
  });
});
