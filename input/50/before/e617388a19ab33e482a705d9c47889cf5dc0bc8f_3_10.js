function(info, tab) {
      chrome.tabs.sendRequest(tab.id, {
        request: 'contextMenusSearchGoogleImage',
        content: info
      });
    }