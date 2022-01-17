function(info, tab) {
      chrome.tabs.sendMessage(tab.id, {
        request: 'contextMenus',
        content: info
      });
    }