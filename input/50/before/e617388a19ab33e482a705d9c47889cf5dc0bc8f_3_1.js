function(info, tab) {
      chrome.tabs.sendRequest(tab.id, {
        request: 'contextMenus',
        content: info
      });
    }