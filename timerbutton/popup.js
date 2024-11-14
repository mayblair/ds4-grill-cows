document.getElementById("startTimer").addEventListener("click", startTimer);
function reddenPage() {
    document.body.style.backgroundColor = 'red';
  }
function startTimer() {
  let timeRemaining = 20;
  const timerDisplay = document.getElementById("timerDisplay");

  const countdown = setInterval(() => {
    timerDisplay.textContent = timeRemaining;
    timeRemaining--;

    if (timeRemaining < 0) {
      clearInterval(countdown);
      console.log("Take a break!");
      reddenPage();
      timerDisplay.textContent = "Take a break!";
    }
  }, 1000); // 1000ms = 1 second
}

console.log('This is a popup!');