// background.js

// Listen for changes in chrome.storage.local
chrome.storage.onChanged.addListener(function (changes, namespace) {
  if (changes.timerActive) {
    if (changes.timerActive.newValue === false) {
      // Timer has ended
      // Send a message to the content script to change the background color
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "changeColor" });
      });
    }
  }
});
