function(info, tab) {
      chrome.tabs.sendMessage(tab.id, {
        request: 'contextMenusVideo',
        content: info
      });
    }