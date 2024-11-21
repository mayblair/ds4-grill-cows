document.addEventListener("DOMContentLoaded", () => {
  const total_time = 60;
  let timeRemaining = 60;
  let timerActive = false; // Flag to track if a timer is active
  let encouragementIndex = 0;
  let timer_num = document.getElementById("timer_num");
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
  // close/open the options popup when options button is clicked
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

  // START TIMER BUTTON
  // event listener for starting time with startTimer button
  document.getElementById("startTimer").addEventListener("click", () => {
      startTimer();
      console.log("started time");
  });

  function reddenPage() {
    document.body.style.backgroundColor = 'red';
  };

  // TIMER PROGRESS BAR 
  // initialize timer
  function startTimer() {
    if (timerActive) {
      alert("A timer is already running!");
      return;
    } else {
      timerActive = true;
      setInterval(start_count_down, 1000); // 1000ms = 1 second
    }
  };

  // conditional functionality of timer
  function start_count_down() {
    timer_num.textContent = timeRemaining;
    timer_bar.value = total_time - timeRemaining;
    timeRemaining--;

    if (timeRemaining % 20 === 0 && encouragementIndex < encouragementMessages.length) {
      // Append the current message to the encouragement section
      encouragementSection.textContent = encouragementMessages[encouragementIndex] + "\n";
    
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
});