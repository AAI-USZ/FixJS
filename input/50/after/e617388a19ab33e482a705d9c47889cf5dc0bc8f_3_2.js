function(info, tab) {
      chrome.tabs.sendMessage(tab.id, {
        request: 'contextMenusQuote',
        content: info
      });
    }