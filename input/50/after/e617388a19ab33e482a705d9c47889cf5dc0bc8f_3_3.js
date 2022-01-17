function(info, tab) {
      chrome.tabs.sendMessage(tab.id, {
        request: 'contextMenusLink',
        content: info
      });
    }