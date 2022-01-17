function(info, tab) {
      chrome.tabs.sendMessage(tab.id, {
        request: 'contextMenusAudio',
        content: info
      });
    }