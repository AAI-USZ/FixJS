function(info, tab) {
      chrome.tabs.sendRequest(tab.id, {
        request: 'contextMenusQuote',
        content: info
      });
    }