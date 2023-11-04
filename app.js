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

  let score = 0;
  let time;
  let timer;
  let isGameRunning = false;
  let randomHole;
  let bugFleeTimer;
  let level = 0;
  let spawnTimer = 2000;
  let fleeTimer = 5000;
  let whackTimer = 1000;

  // game functionality

  function spawnBug() {
    if (isGameRunning) {
      randomHole = holes[Math.floor(Math.random() * holes.length)];
      randomHole.classList.add("bug");
      bugFleeTimer = setTimeout(() => {
        bugFlee(randomHole);
      }, fleeTimer);
    }
  }

  function bugFlee(element) {
    if (element.classList.contains("bug")) {
      element.classList.remove("bug");
      setTimeout(() => {
        if (isGameRunning) {
          spawnBug();
        }
      }, spawnTimer);
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
    }, whackTimer);
  }

  // level functionality

  function levelAdjustment() {
    if (level < 1) {
      level = 1;
      console.log("set level 1");
    }
    switch (level) {
      case 1:
        spawnTimer = 2000;
        fleeTimer = 5000;
        whackTimer = 1000;
        break;
      case 2:
        spawnTimer = 2000;
        fleeTimer = 4000;
        whackTimer = 1000;
        break;
      case 3:
        spawnTimer = 2000;
        fleeTimer = 3000;
        whackTimer = 1000;
        break;
      case 4:
        spawnTimer = 2000;
        fleeTimer = 2000;
        whackTimer = 1000;
        break;
    };
  }

  function levelProgress() {
    console.log("level up?");
    switch (level) {
      case 1:
        if (score >= 20) {
          level++;
          console.log("level up to 2");
        } else {
          console.log("fail");
        }
        break;
      case 2:
        if (score >= 40) {
          level++;
        } else {
          console.log("fail");
        }
        break;
      case 3:
        if (score >= 60) {
          level++;
        } else {
          console.log("fail");
        }
        break;
      case 4:
        break;
    };
    console.log(level);
  }

  // Timer and start trigger

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
    levelProgress();
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
    levelAdjustment();
    console.log(fleeTimer);
    startTimer();
    spawnBug();
  }

  // tracking

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

  // UI functionality

  gameStartButton.addEventListener("click", () => {
    startGame();
  });

  gameStopButton.addEventListener("click", () => {
    stopGame();
  });
});
