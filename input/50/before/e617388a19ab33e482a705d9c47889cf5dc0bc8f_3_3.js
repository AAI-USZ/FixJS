function(info, tab) {
      chrome.tabs.sendRequest(tab.id, {
        request: 'contextMenusLink',
        content: info
      });
    }