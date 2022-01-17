function(info, tab) {
      chrome.tabs.sendMessage(tab.id, {
        request: 'contextMenusImage',
        content: info
      });
    }