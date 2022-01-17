function(info, tab) {
      chrome.tabs.sendRequest(tab.id, {
        request: 'contextMenusAudio',
        content: info
      });
    }