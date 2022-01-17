function(info, tab) {
      chrome.tabs.sendRequest(tab.id, {
        request: 'contextMenusVideo',
        content: info
      });
    }