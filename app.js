document.addEventListener("DOMContentLoaded", function() {
  const holes = document.querySelectorAll(".hole");
  // will make an arraylike nodelist of the holes
  // will the const make it not update when i add more?
  //   maybe need to make this a function to update on addition?

  const scoreDisplay = document.getElementById("score-value");
  const timerDisplay = document.getElementById("timer-value");
  const bug = document.createElement("img");
  bug.setAttribute("src", "");
  bug.id = "bug";

  const gameTimeout = 0;
  let score;
  let time;
  const isGameRunning = false;

  function spawnBug() {
    const randomHole = holes[Math.floor(Math.random() * holes.length)];
    randomHole.classList.add("bug");
    randomHole.appendChild(bug);
  }

  function resetGame() {
    score = 0;
    time = 30;
    scoreDisplay.textContent = score;
    timerDisplay.textContent = time;
  }
});
