function(callback) {
      chrome.extension.sendRequest({command: 'timesummary'}, callback);
    }