// This listener will execute the content script when the extension icon is clicked
// Note: In Manifest V3 with a defined popup, this event won't fire because the popup opens instead
// This is kept for scenarios where the popup might be disabled
chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    files: ['contentScript.js']
  });
});
  