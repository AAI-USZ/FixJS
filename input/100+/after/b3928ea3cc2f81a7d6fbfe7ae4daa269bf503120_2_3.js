function initializeTumblrSavior() {
  if (typeof chrome != 'undefined') {
/*  if (typeof chrome.extension.onMessage != "undefined") {
      chrome.extension.onMessage.addListener(
        function(request, sender, sendResponse) {
          if (request=="refreshSettings") {
            chrome.extension.sendMessage(null, 'getSettings', chromeHandleMessage);
          }
        });
      chrome.extension.sendMessage(null, 'getSettings', chromeHandleMessage);
    } else */ 
    if (typeof chrome.extension.onRequest != "undefined") {
      chrome.extension.onRequest.addListener(
        function(request, sender, sendResponse) {
          if (request=="refreshSettings") {
            chrome.extension.sendRequest('getSettings', chromeHandleMessage);
          }
        });
      chrome.extension.sendRequest('getSettings', chromeHandleMessage);
    }
  }
  if (typeof opera != 'undefined') {
    opera.extension.onmessage = operaHandleMessage;
    opera.extension.postMessage('getSettings');
  }
  if (typeof safari != 'undefined') {
    window.addEventListener("contextmenu", safariContextMenuHandler, false);
    safari.self.addEventListener('message', safariMessageHandler, false);
    safari.self.tab.dispatchMessage('getSettings');
  }
}