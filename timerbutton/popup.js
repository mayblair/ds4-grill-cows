
let timeRemaining = 60;
let timerActive = false; // Flag to track if a timer is active

document.addEventListener("DOMContentLoaded", () => {


  // close/open the options popup when options button is chosen
  document.getElementById('closePopup').addEventListener('click', () => {
      // Hide the pop-up
      document.getElementById('options_popup').style.display = 'none';
      // Store in localStorage to prevent it from showing again
      localStorage.setItem('optionsClosed', 'true');
  });
  if (!localStorage.getItem('optionsClosed')) {
    // Show the pop-up if it has not been closed before
    document.getElementById('options_popup').style.display = 'block';
  };

  // display timer progress bar when timer choice is chosen
  document.getElementById('openTimer').addEventListener('click', () => {
      document.getElementsByClassName('timer_popup')[0].style.display = 'block';
      // Store in localStorage to prevent it from hiding again
      localStorage.setItem('timerOpen', 'true');
  });
  if (!localStorage.getItem('timerOpen')) {
    // Show the pop-up if it has not been closed before
    document.getElementById('timer_popup').style.display = 'none';
  };

  // event listener for starting time with startTimer button
  document.getElementById("startTimer").addEventListener("click", () => {
      startTimer();
      timerActive = true;
      const countdown = setInterval(start_count_down, 1000); // 1000ms = 1 second
      console.log("started time");
  });

  function reddenPage() {
    document.body.style.backgroundColor = 'red';
  }

// functionality of timer
  function start_count_down() {
    timerDisplay.textContent = timeRemaining;
    timeRemaining--;

    if (timeRemaining % 20 === 0 && encouragementIndex < encouragementMessages.length) {
      // Append the current message to the encouragement section
      encouragementSection.textContent = encouragementMessages[encouragementIndex] + "\n";
    
      encouragementIndex++;
    };

    if (timeRemaining <= 0) {
      clearInterval(countdown);
      console.log("Take a break!");
      timerDisplay.textContent = "Take a break!";
      reddenPage();
      timerActive = false;
    };
  };

// initialize timer
  function startTimer() {
    if (timerActive) {
      alert("A timer is already running!");
      return;
    }
    const timerDisplay = document.getElementById("timerDisplay");
    const encouragementSection = document.getElementById("encouragementSection");
    let encouragementIndex = 0;
    const encouragementMessages = [
      "You're so brave",
      "Keep going!!!",
      "Halfway there, shawty",
      "Just a little more, you got this!"
    ];
  };
});