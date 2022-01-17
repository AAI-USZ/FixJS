function(info, tab) {
      chrome.tabs.sendMessage(tab.id, {
        request: 'contextMenusSearchGoogleImage',
        content: info
      });
    }