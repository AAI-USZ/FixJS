function(tabID) {
    var runAt = "document_start";
    chrome.tabs.insertCSS(tabID, { file: "frontend/tapedeck-inject-all.css",
                                   runAt: runAt });
    chrome.tabs.executeScript(tabID, { file: "vendor/jquery-1.7.js",
                                       runAt: runAt });
    chrome.tabs.executeScript(tabID, { file: "frontend/tapedeck-inject-all.js",
                                       runAt: runAt });
  }