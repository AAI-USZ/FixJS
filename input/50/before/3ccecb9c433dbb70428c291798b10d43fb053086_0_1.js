function(request, sender, sendResponse) {
        if (request=="refreshSettings") {
          chrome.extension.sendRequest('getSettings', chromeHandleMessage);
        }
      }