// contentScript.js

// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "changeColor") {
    // Change the background color of the page to teal
    document.body.style.backgroundColor = 'teal';
  }
});
