
let timeRemaining = 60;

document.addEventListener("DOMContentLoaded", () => {

  // if (!localStorage.getItem('optionsClosed')) {
  //   // Show the pop-up if it has not been closed before
  //   document.getElementById('options_popup').style.display = 'block';
  // }

  // // Event listener for closing the pop-up
  // document.getElementById('closePopup').addEventListener('click', function() {
  //     // Hide the pop-up
  //     document.getElementById('options_popup').style.display = 'none';
      
  //     // Store in localStorage to prevent it from showing again
  //     localStorage.setItem('optionsClosed', 'true');
  // });
  
  if (!localStorage.getItem('timerOpen')) {
    // Show the pop-up if it has not been closed before
    document.getElementById('timer_popup').style.display = 'none';
  }

  // Event listener for opening the pop-up
  document.getElementById('openTimer').addEventListener('click', function() {
      // show the pop-up
      document.getElementById('timer_popup').style.display = 'block';
      
      // Store in localStorage to prevent it from hiding again
      localStorage.setItem('timerOpen', 'true');
  });

  document.getElementById("timer_popup").style.display = 'none';
  
  let timerActive = false; // Flag to track if a timer is active


  document.getElementById("startTimer").addEventListener("click", () => {
      startTimer();
      timerActive = true;
      const countdown = setInterval(start_count_down, 1000); // 1000ms = 1 second
      console.log("started time");
      // setTimeout(() => {
      //   window.location.reload(true);
      // }, 200);
  });

  function reddenPage() {
    document.body.style.backgroundColor = 'red';
  }


  function start_count_down() {
    timerDisplay.textContent = timeRemaining;
    timeRemaining--;

    if (timeRemaining % 20 === 0 && encouragementIndex < encouragementMessages.length) {
      // Append the current message to the encouragement section
      encouragementSection.textContent = encouragementMessages[encouragementIndex] + "\n";
    
      encouragementIndex++;
    }

    if (timeRemaining <= 0) {
      clearInterval(countdown);
      console.log("Take a break!");
      timerDisplay.textContent = "Take a break!";
      reddenPage();
      timerActive = false;
    }
  }


  function startTimer() {
    if (timerActive) {
      alert("A timer is already running!");
      return;
    }
    const timerDisplay = document.getElementById("timerDisplay");
    const encouragementSection = document.getElementById("encouragementSection");

    const encouragementMessages = [
      "youre so brave",
      "keep goinnn",
      " more than halfway there shawty",
      "Just a little more, you got this!"
    ];

    let encouragementIndex = 0;
  
  }
});