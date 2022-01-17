function(info, tab) {
      chrome.tabs.sendMessage(tab.id, {
        request: 'contextMenusText',
        content: info
      });
    }