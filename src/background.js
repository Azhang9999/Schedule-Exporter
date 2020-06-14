chrome.runtime.onInstalled.addListener(function() {
  chrome.tabs.onUpdated.removeListener(tabListener)
  chrome.tabs.onUpdated.addListener(tabListener)
});

function tabListener(tabId, changeInfo, tab) {
  if (!changeInfo.status && tab.url.match("collegescheduler.com")) {
    browser.browserAction.enable(tabId);
  } else {
    browser.browserAction.disable(tabId);
  }
}

browser.browserAction.onClicked.addListener(function(tab) {
    browser.tabs.executeScript({
        file: 'src/main.js'
    });
});
