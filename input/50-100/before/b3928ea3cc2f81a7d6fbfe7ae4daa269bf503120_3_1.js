function chromeNotifyTumblr(tabs) {
  for (tab in tabs) {
    if(checkurl(tabs[tab].url, ["http://*.tumblr.com/*"])) {
      if (typeof chrome.tabs.sendMessage != "undefined") {
        chrome.tabs.sendMessage(tabs[tab].id, "refreshSettings");
      } else if (typeof chrome.tabs.sendRequest != "undefined") {
        chrome.tabs.sendRequest(tabs[tab].id, "refreshSettings");
      }
    }
  }
}