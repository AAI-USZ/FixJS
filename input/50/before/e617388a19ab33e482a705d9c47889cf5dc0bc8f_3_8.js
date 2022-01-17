function(info, tab) {
      chrome.tabs.sendRequest(tab.id, {
        request: 'contextMenusImage',
        content: info
      });
    }