function(info, tab) {
      chrome.tabs.sendRequest(tab.id, {
        request: 'contextMenusCapture',
        content: info
      });
    }