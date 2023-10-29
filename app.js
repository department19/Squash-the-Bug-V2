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
    const bugTimeout = setTimeout(() => {
      randomHole.classList.remove("bug");
      randomHole.removeChild(bug);
      if (isGameRunning) {
        spawnBug();
      }
    }, (Math.random() * 10000) + 500 );
  }

  // function removeBug() {
  //   randomHole.classList.remove("bug");
  //   randomHole.removeChild(bug);
  // }

  function resetGame() {
    score = 0;
    time = 30;
    scoreDisplay.textContent = score;
    timerDisplay.textContent = time;
  }
});
