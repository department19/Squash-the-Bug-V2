document.addEventListener("DOMContentLoaded", function() {
  const holes = document.querySelectorAll(".hole");
  // will make an arraylike nodelist of the holes
  // will the const make it not update when i add more?

  const scoreDisplay = document.getElementById("score-value");
  const timerDisplay = document.getElementById("timer-value");
  const bug = document.createElement("img");
  bug.setAttribute("src", "");
  bug.id = "bug";

  let gameTimeout = 0;
  let score;
  let time;
  let isGameRunning = false;

  function spawnBug() {
    
  }

  function resetGame() {
    score = 0;
    time = 30;
    scoreDisplay.textContent = score;
    timerDisplay.textContent = time;
  }
});
