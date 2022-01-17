function(info, tab) {
      chrome.tabs.sendRequest(tab.id, {
        request: 'contextMenusText',
        content: info
      });
    }