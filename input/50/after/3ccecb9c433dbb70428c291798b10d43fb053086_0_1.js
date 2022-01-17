function(request, sender, sendResponse) {
        if (request=="refreshSettings") {
          chrome.extension.sendMessage(null, 'getSettings', chromeHandleMessage);
        }
      }