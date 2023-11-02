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

  const classObserver = new MutationObserver(bugClass);
  const config = {
    attributes: true,
    attributeFilter: ["class"],
  };

  const spawnTimer = 2000;
  // let bugTimeout;
  let score;
  let time;
  let timer;
  let isGameRunning = false;
  let randomHole;

  function spawnBug() {
    if (isGameRunning) {
      console.log("spawn");
      randomHole = holes[Math.floor(Math.random() * holes.length)];
      randomHole.classList.add("bug");
      // randomHole.appendChild(bug);
    }
    bugFlee(randomHole);
  }

  function bugFlee(element) {
    if (element.contains(bug)) {
      setTimeout(() => {
        console.log("flee");
        element.classList.remove("bug");
        // element.removeChild(bug);
      }, 5000);
      if (isGameRunning) {
        setTimeout(() => {
          spawnBug();
        }, spawnTimer);
      }
    }
  }

  function whackBug(element) {
    console.log("whack");
    element.classList.remove("bug");
    // element.removeChild(bug);
    score++;
    scoreDisplay.textContent = score;
    clearTimeout(bugTimeout);
    if (isGameRunning) {
      setTimeout(() => {
        spawnBug();
      }, spawnTimer);
    }
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
    isGameRunning = false;
    gameStopButton.classList.add("hidden");
    gameStartButton.classList.remove("hidden");
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
    isGameRunning = true;
    startTimer();
    spawnBug();
  }

  function bugClass(mutationList, observer) {
    for (const mutation of mutationList) {
      if (mutation.type === "attributes" && mutation.attributeName === "class") {
        if (mutation.classList.contains("bug")) {
          mutation.appendChild(bug);
        } else {
          mutation.removeChild(bug);
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
    classObserver.observe(holes, config);
  });

  gameStartButton.addEventListener("click", () => {
    startGame();
  });

  gameStopButton.addEventListener("click", () => {
    stopGame();
  });
});
