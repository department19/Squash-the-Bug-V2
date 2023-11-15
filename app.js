document.addEventListener("DOMContentLoaded", function() {
  // UI interaction
  const headerButton = document.getElementById("header-button");
  const header = document.querySelector("header");

  headerButton.addEventListener("click", () => {
    header.classList.add("active");
  });

  // Game Parts

  let holes = document.querySelectorAll(".hole");
  const scoreDisplay = document.getElementById("score-value");
  const timerDisplay = document.getElementById("timer-value");
  const levelDisplay = document.getElementById("level-value");
  const gameStartButton = document.getElementById("startGame");
  const gameStopButton = document.getElementById("stopGame");
  const bug = document.createElement("img");
  bug.setAttribute("src", "assets/green_bug.png");
  bug.id = "bug";
  const gameArea = document.getElementById("game-area");
  const hole = document.createElement("div");
  hole.setAttribute("class", "hole");
  const addHoleButton = document.getElementById("addHole");

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
  let spawnTimer;
  let fleeTimer;
  // let whackTimer = 1000;
  const holesToAdd = 3;

  // game functionality

  function spawnBug() {
    if (isGameRunning) {
      const randomNumber = Math.floor(Math.random() * holes.length);
      console.log(randomNumber);
      randomHole = holes[randomNumber];
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
    }, spawnTimer);
  }

  // level functionality

  function addHoles(n) {
    if (n == undefined) {
      n = 1;
    }
    for (let i = 0; i < n; i++) {
      gameArea.appendChild(hole.cloneNode(true));
    }
    holes = document.querySelectorAll(".hole");
    console.log(holes);
  }

  addHoleButton.addEventListener("click", () => {
    addHoles();
  });

  function levelAdjustment() {
    if (level < 1) {
      level = 1;
      console.log("set level 1");
    }
    switch (level) {
      case 1:
        spawnTimer = 1000;
        fleeTimer = 2000;
        console.log("difficulty adjusted");
        break;
      case 2:
        spawnTimer = 1000;
        fleeTimer = 1500;
        console.log("difficulty adjusted");
        break;
      case 3:
        spawnTimer = 900;
        fleeTimer = 1000;
        console.log("difficulty adjusted");
        break;
      case 4:
        spawnTimer = 600;
        fleeTimer = 750;
        console.log("difficulty adjusted");
        break;
      case 5:
        spawnTimer = 500;
        fleeTimer = 500;
        console.log("difficulty adjusted");
        break;
      case 6:
        spawnTimer = 200;
        fleeTimer = 200;
        console.log("difficulty adjusted");
        level = "impossible";
        break;
    };
    levelDisplay.textContent = level;
  }

  function levelProgress() {
    console.log("level up?");
    switch (level) {
      case 1:
        if (score >= 10) {
          level++;
          addHoles(holesToAdd);
          console.log("level up");
          alert("level up!");
        } else {
          console.log("fail");
          alert("failed");
        }
        break;
      case 2:
        if (score >= 15) {
          level++;
          addHoles(holesToAdd);
          console.log("level up");
          alert("level up!");
        } else {
          console.log("fail");
          alert("failed");
        }
        break;
      case 3:
        if (score >= 20) {
          level++;
          addHoles(holesToAdd);
          console.log("level up");
          alert("level up!");
        } else {
          console.log("fail");
          alert("failed");
        }
        break;
      case 4:
        if (score >= 25) {
          level++;
          addHoles(holesToAdd);
          console.log("level up");
          alert("level up!");
        } else {
          console.log("fail");
          alert("failed");
        }
        break;
      case 5:
        if (score >= 25) {
          level++;
          console.log("level up");
          alert("level up!");
        } else {
          console.log("fail");
          alert("failed");
        }
        break;
      case 6:
        console.log("last level complete");
        alert("this is the last level");
        break;
    };
    levelDisplay.textContent = level;
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
    applyTracking();
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

  function applyTracking() {
    holes.forEach((hole) => {
      if (!hole.hasEventListener) {
        hole.addEventListener("mousedown", function() {
          if (isGameRunning && hole.classList.contains("bug")) {
            whackBug(hole);
          }
        });
        hole.hasEventListener = true;
      }
      if (!hole.hasMutationObserver) {
        classObserver.observe(hole, config);
        hole.hasMutationObserver = true;
      }
    });
  }

  // UI functionality

  gameStartButton.addEventListener("click", () => {
    startGame();
  });

  gameStopButton.addEventListener("click", () => {
    stopGame();
  });
  // level = 6;
});
