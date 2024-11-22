document.addEventListener("DOMContentLoaded", () => {
  let total_time = document.getElementById('work').value * 60;
  let time_remaining = total_time;
  // user input break every ... seconds
  let break_num = document.getElementById('break').value * 60;
  // add user input minutes and seconds to capture break length in seconds
  let break_len = document.getElementById('btimemin').value * 60 + document.getElementById('btimesec').value;
  let countdown = undefined;
  let timerActive = false; // Flag to track if a timer is active
  let encouragementIndex = 0;
  let timer_num = document.getElementById("timer_num");
  const timer_bar = document.getElementById("progress_bar");
  const bottom_text = document.getElementById("bottom_text");
  const start_break_messages = [
    "Well done! Take a break :)",
    "Wow, you're doing great. Grab some water if you need it!",
    "AWESOME!! Take a break :)\n Maybe get some snacks or water.",
    "You're doing awesome!! Take a break and then keep up the great work",
    "Great job :) Take a break and relax!"
  ];
  const end_break_messages = [
    "Well done! Keep up the good work!!",
    "Keep going!! You're doing great.",
    "Go shawty! GO GO Go shawty!!",
    "You've got this!!!",
    "I believe in you! You can do it."
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
        bottom_text.textContent = "";
        break;
      };
  });


  // DISPLAY BUTTONS
  document.getElementById('timer_popup').style.display = 'block';

  document.getElementById("close_button").addEventListener("click", () => {
    window.close();
  });

  // event listener for starting time with startTimer button
  document.getElementById("startTimer").addEventListener("click", () => {
      startTimer();
  });

  // TIMER PROGRESS BAR 
  // initialize timer
  function startTimer() {
    if (localStorage.getItem('optionsOpen') == 'true') {
      timerActive = true;
      clearInterval(countdown);
      total_time = document.getElementById('work').value * 60;
      time_remaining = total_time
      countdown = setInterval(start_count_down, 1000); // 1000ms = 1 second
      console.log("started time");
    } else if (timerActive & localStorage.getItem('optionsOpen') == 'false') {
      bottom_text.textContent = "A timer is already running!\nOpen options to start a new timer";
    } else {
      console.log("confused");
    };
  };

  // conditional functionality of timer
  function start_count_down() {
    timer_num.textContent = (Math.floor(time_remaining / 60)).toString() + " minutes " +  (time_remaining % 60).toString() + " seconds";
    timer_bar.value = (total_time - time_remaining) / total_time;
    time_remaining--;

    if (timer_bar.value % break_num == 0 && encouragementIndex < encouragementMessages.length) {
      // Append the current message to the encouragement section
      bottom_text.textContent = start_break_messages[encouragementIndex];
      encouragementIndex++;

    } else if (encouragementIndex < encouragementMessages.length) {
      encouragementIndex = 0
    };

    if (time_remaining <= 0) {
      bottom_text.textContent = "YOU DID IT!!!! WELL DONE :)";
      clearInterval(countdown);
      console.log("Take a break!");
      timer_num.textContent = "Take a break!";
      colorPage();
      timerActive = false;
    };
  };

});

function colorPage() {
  document.body.style.backgroundColor = "#c5bbdf";
};