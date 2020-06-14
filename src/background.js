chrome.runtime.onInstalled.addListener(function() {
  chrome.tabs.onUpdated.removeListener(tabListener)
  chrome.tabs.onUpdated.addListener(tabListener)
});

function tabListener(tabId, changeInfo, tab) {
  console.log(changeInfo.status)
  if (!changeInfo.status && tab.url.match("collegescheduler.com")) {
    console.log(tab.url)
    browser.browserAction.enable(tabId);
  } else {
    browser.browserAction.disable(tabId);
  }
}

browser.browserAction.onClicked.addListener(function(tab) {
  console.log("clicked")
    browser.tabs.executeScript({
        file: 'src/main.js'
    });
});
