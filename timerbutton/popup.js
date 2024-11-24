document.addEventListener("DOMContentLoaded", () => {
  // user input work for ... minutes + seconds
  let work_min = document.getElementById('wtimemin').value * 60;
  let total_time = work_min + parseInt(document.getElementById('wtimesec').value);
  let time_remaining = total_time;
  // user input break every ... minutes + seconds
  let break_min = document.getElementById('btimemin').value * 60;
  let break_total = break_min + parseInt(document.getElementById('btimesec').value);
  let break_so_far = 0;
  let countdown = undefined;
  let breaktime = undefined;
  let timerActive = false; // Flag to track if a timer is active
  let breakActive = false; // Flag to track if a break is active
  let message_index = 0;
  let timer_num = document.getElementById("timer_num");
  const timer_bar = document.getElementById("progress_bar");
  const bottom_text = document.getElementById("bottom_text");
  const break_text = document.getElementById("break_text");
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
  document.getElementById('options_button').classList.toggle('active');

  // close/open the options popup when options button is clicked
  document.getElementById('options_button').addEventListener('click', () => {
    switch(localStorage.getItem('optionsOpen')) {
      case 'true':
        document.getElementById('options_button').classList.toggle('active');
        document.getElementById('options_popup').style.display = 'none';
        localStorage.setItem('optionsOpen', 'false');
        break;
      case 'false':
        document.getElementById('options_button').classList.toggle('active');
        document.getElementById('options_popup').style.display = 'block';
        // document.getElementById('options_button').style.backgroundColor = "553170 !important";
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
  document.getElementById("restart_timer").textContent = "Begin Work";
  document.getElementById("restart_timer").addEventListener("click", () => {
    document.getElementById("restart_timer").textContent = "Restart Timer";
    document.getElementById("restart_timer").style.display = 'inline';
    document.getElementById("start_work").style.display = 'none';
    startTimer();
  });


  document.getElementById("start_work").style.display = 'none';
  // event listener for starting time with startTimer button
  document.getElementById("start_work").addEventListener("click", () => {
    resumeTimer();
  });

  document.getElementById("start_break").style.display = 'none';
  // event listener for starting time with startTimer button
  document.getElementById("start_break").addEventListener("click", () => {
    startBreak();
  });

  function resumeTimer() {
    if (breakActive) {
      document.getElementById("start_work").style.display = 'none';
      document.getElementById("start_break").style.display = 'inline';
      breakActive = false;
      timerActive = true;
      bottom_text.textContent = end_break_messages[message_index];
      break_text.textContent = "";
      colorPage("white");
      message_index++;
    } else {
      console.log("break not active")
    };
  };

  // TIMER PROGRESS BAR 
  // initialize timer
  function startTimer() {
    if (localStorage.getItem('optionsOpen') == 'true') {
      document.getElementById("start_break").style.display = 'inline';
      timerActive = true;
      colorPage("white");
      // reset progress/timer to reflect new input options
      clearInterval(countdown);
      clearInterval(breaktime);
      break_text.textContent = "";
      timer_bar.value = 0;
      work_min = document.getElementById('wtimemin').value * 60;
      total_time = work_min + parseInt(document.getElementById('wtimesec').value);
      break_min = document.getElementById('btimemin').value * 60;
      break_total = break_min + parseInt(document.getElementById('btimesec').value);
      break_so_far = 0;
      time_remaining = total_time;
      if (total_time <= break_total) {
        bottom_text.textContent = "Total time must be longer than break intervals";
      } else {
        timerActive = true;
        bottom_text.textContent = "";
        countdown = setInterval(start_count_down, 1000); // 1000ms = 1 second
        console.log("started time");
      };
    } else if (localStorage.getItem('optionsOpen') == 'false') {
      bottom_text.textContent = "A timer is already running!\nOpen options to start a new timer";
    } else {
      console.log("confused");
    };
  };

  // conditional functionality of timer
  function start_count_down() {
    if (timerActive) {
      timer_num.textContent = (Math.floor(time_remaining / 60)).toString() + " minutes " +
            (time_remaining % 60).toString() + " seconds";
      timer_bar.value = (total_time - time_remaining) / total_time * 100;
      // not the beginning of the timer and time for a break
      console.log((total_time - time_remaining) % break_total);
      if (timer_bar.value != 0 && (total_time - time_remaining) % break_total == 0 && 
        message_index < start_break_messages.length) {
        startBreak();
      // last message 
      };
      time_remaining--;
      if (message_index > start_break_messages.length) {
        message_index = 0
      };
      // end of timer/progress bar!
      if (time_remaining < 0) {
        bottom_text.textContent = "YOU DID IT!!!! WELL DONE :)\n Take a walk, eat, drink water, and come back to your computer in a while!";
        clearInterval(countdown);
        console.log("Finished!");
        document.getElementById("start_work").style.display = 'none';
        document.getElementById("start_break").style.display = 'none';
        colorPage("purple");
        timerActive = false;
        breakActive = false;
      };
    } else if (breakActive){
      break_text.textContent = "Break so far: " + (Math.floor(break_so_far / 60)).toString() + " minutes " +
        (break_so_far % 60).toString() + " seconds";
      break_so_far++;
    };
  };

  function startBreak() {
    document.getElementById("start_break").style.display = 'none';
    // display take a break message
    bottom_text.textContent = start_break_messages[message_index];
    breakActive = true;
    timerActive = false;
    break_so_far = 0;
    print()
    document.getElementById("start_work").style.display = 'inline';
    colorPage("purple");
    console.log("started break");
    };

});

  function colorPage(color) {
    if (color == "purple") {
      document.body.style.backgroundColor = "#c5bbdf";
    } else if (color == "white") {
      document.body.style.backgroundColor = "#eae8ec";
    };
  };