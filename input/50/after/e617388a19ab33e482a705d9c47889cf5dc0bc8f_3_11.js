function(info, tab) {
      chrome.tabs.sendMessage(tab.id, {
        request: 'contextMenusBGImage',
        content: info
      });
    }