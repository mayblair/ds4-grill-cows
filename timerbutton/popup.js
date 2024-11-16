document.addEventListener("DOMContentLoaded", () => {
  let timerActive = false; // Flag to track if a timer is active

  document.getElementById("startTimer").addEventListener("click", startTimer);

  function reddenPage() {
    document.body.style.backgroundColor = 'red';
  }

  function startTimer() {
    if (timerActive) {
      alert("A timer is already running!");
      return;
    }

    let timeRemaining = 60;

    timerActive = true;

    const timerDisplay = document.getElementById("timerDisplay");
    const encouragementSection = document.getElementById("encouragementSection");

    const encouragementMessages = [
      "youre so brave",
      "keep goinnn",
      " more than halfway there shawty",
      "Just a little more, you got this!"
    ];

    let encouragementIndex = 0;

    const countdown = setInterval(() => {
      timerDisplay.textContent = timeRemaining;
      timeRemaining--;

      if (timeRemaining % 20 === 0 && encouragementIndex < encouragementMessages.length) {
        // Append the current message to the encouragement section
        encouragementSection.textContent = encouragementMessages[encouragementIndex] + "\n";
      
        encouragementIndex++;
      }

      if (timeRemaining < 0) {
        clearInterval(countdown);
        console.log("Take a break!");
        timerDisplay.textContent = "Take a break!";
        reddenPage();
        timerActive = false;
      }
    }, 1000); // 1000ms = 1 second
  }
});