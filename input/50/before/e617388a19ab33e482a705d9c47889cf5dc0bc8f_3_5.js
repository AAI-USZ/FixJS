function(info, tab) {
      chrome.tabs.sendRequest(tab.id, {
        request: 'contextMenusImageCache',
        content: info
      });
    }