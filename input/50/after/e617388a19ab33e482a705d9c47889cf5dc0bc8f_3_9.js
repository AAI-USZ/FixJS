function(info, tab) {
      chrome.tabs.sendMessage(tab.id, {
        request: 'contextMenusCapture',
        content: info
      });
    }