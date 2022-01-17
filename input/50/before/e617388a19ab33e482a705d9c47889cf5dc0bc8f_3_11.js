function(info, tab) {
      chrome.tabs.sendRequest(tab.id, {
        request: 'contextMenusBGImage',
        content: info
      });
    }