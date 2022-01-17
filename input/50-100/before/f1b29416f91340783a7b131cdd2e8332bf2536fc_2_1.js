function(tabID) {
    chrome.tabs.insertCSS(tabID, {file: "frontend/tapedeck-inject-all.css"});
    chrome.tabs.executeScript(tabID, {file: "vendor/jquery-1.7.js"});
    chrome.tabs.executeScript(tabID, {file: "frontend/tapedeck-inject-all.js"});
  }