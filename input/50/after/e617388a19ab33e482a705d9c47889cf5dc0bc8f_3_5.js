function(info, tab) {
      chrome.tabs.sendMessage(tab.id, {
        request: 'contextMenusImageCache',
        content: info
      });
    }