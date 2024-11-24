document.addEventListener("DOMContentLoaded", () => {
  let total_time = 60; // Changed from 'const' to 'let' to allow reassignment
  let timeRemaining = 60;
  let timerActive = false; // Flag to track if a timer is active
  let encouragementIndex = 0;
  
  const timer_num = document.getElementById("timer_num");
  const timer_bar = document.getElementById("progress_bar");
  const encouragementSection = document.getElementById("encouragementSection");
  
  const encouragementMessages = [
    "You're so brave",
    "Keep going!!!",
    "Halfway there, shawty",
    "Just a little more, you got this!"
  ];

  // OPTIONS BUTTON
  document.getElementById('options_popup').style.display = 'block';
  localStorage.setItem('optionsOpen', 'true');
  
  // Close/open the options popup when options button is clicked
  document.getElementById('options_button').addEventListener('click', () => {
    switch(localStorage.getItem('optionsOpen')) {
      case 'true':
        document.getElementById('options_popup').style.display = 'none';
        localStorage.setItem('optionsOpen', 'false');
        break;
      case 'false':
        document.getElementById('options_popup').style.display = 'block';
        localStorage.setItem('optionsOpen', 'true');
        break;
    };
  });

  // DISPLAY POPUP TIMER BUTTON
  // Display timer progress bar when timer choice is chosen
  document.getElementById('openTimer').addEventListener('click', () => {
    document.getElementsByClassName('timer_popup')[0].style.display = 'block';
    // Store in localStorage to prevent it from hiding again
    localStorage.setItem('timerOpen', 'true');
  });
  
  if (!localStorage.getItem('timerOpen')) {
    // Show the pop-up if it has not been closed before
    document.getElementById('timer_popup').style.display = 'none';
  };

  // CLOSE BUTTON FUNCTIONALITY
  document.getElementById("close_button").addEventListener("click", () => {
    window.close();
  });

  // START TIMER BUTTON
  // Event listener for starting time with startTimer button
  document.getElementById("startTimer").addEventListener("click", () => {
    startTimer();
    console.log("started time");
  });

  function reddenPage() {
    document.body.style.backgroundColor = 'red';
  };

  // TIMER PROGRESS BAR 
  let countdown; // Declare countdown in the outer scope

  // Initialize timer
  function startTimer() {
    if (timerActive) {
      alert("A timer is already running!");
      return;
    } else {
      timerActive = true;
      countdown = setInterval(start_count_down, 1000); // 1000ms = 1 second
    };
  };

  // Conditional functionality of timer
  function start_count_down() {
    timer_num.textContent = timeRemaining;
    timer_bar.value = total_time - timeRemaining;
    timeRemaining--;

    if (timeRemaining % 20 === 0 && encouragementIndex < encouragementMessages.length) {
      // Append the current message to the encouragement section
      encouragementSection.textContent = encouragementMessages[encouragementIndex];
      encouragementIndex++;
    };

    if (timeRemaining <= 0) {
      clearInterval(countdown);
      console.log("Take a break!");
      timer_num.textContent = "Take a break!";
      reddenPage();
      timerActive = false;
    };
  };

  // SET DURATION BUTTON
  // Create the Set Duration Button
  const setDurationButton = document.createElement("button");
  setDurationButton.id = "setDurationButton";
  setDurationButton.className = "button"; 
  setDurationButton.textContent = "Set Duration";

  // Insert the Set Duration Button before the Close Button
  const closeButton = document.getElementById("close_button");
  if (closeButton && closeButton.parentNode) {
    closeButton.parentNode.insertBefore(setDurationButton, closeButton);
  } else {
    // If 'close_button' not found, append it to the body
    document.body.appendChild(setDurationButton);
    console.warn("Close button not found. Appended 'Set Duration' button to the body.");
  }

  // Add Event Listener for the Set Duration Button
  setDurationButton.addEventListener("click", () => {
    // Prompt the user to enter a new duration
    const userInput = prompt("Enter the timer duration in seconds:", total_time);
    const newDuration = parseInt(userInput, 10);

    // Validate user input
    if (isNaN(newDuration) || newDuration <= 0) {
      alert("Please enter a valid positive number for the duration.");
      return;
    }

    // Update timer variables
    total_time = newDuration;
    timeRemaining = total_time;
    timer_num.textContent = timeRemaining;
    timer_bar.max = total_time;
    timer_bar.value = 0; // Reset progress bar
    encouragementIndex = 0;
    encouragementSection.textContent = ""; // Reset encouragement messages

    // Restart the timer if it's active
    if (timerActive) {
      clearInterval(countdown); // Stop the current timer
      startTimer(); // Restart with the new duration
    }

    console.log(`Timer duration set to ${newDuration} seconds.`);
  });
});
