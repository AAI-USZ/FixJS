function(callback) {
      chrome.extension.sendRequest({command: 'debug'}, callback);
    }