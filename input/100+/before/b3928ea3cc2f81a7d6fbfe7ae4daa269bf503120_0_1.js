function chromeAddToBlackList(info, tab) {
  var theword = info.selectionText;
  
  if (typeof theword != 'undefined') {
    var success = addToBlackList(theword);

    if (success) {
      var chromeViews = chrome.extension.getViews();
      for(chromeView in chromeViews) {
        if(chromeViews[chromeView].location==chrome.extension.getURL('options.html')) {
          chromeViews[chromeView].location.reload();
        }
      }
      if (typeof chrome.tabs.sendMessage != "undefined") {
        chrome.tabs.sendMessage(tab.id, "refreshSettings");
      } else if (typeof chrome.tabs.sendRequest != "undefined") {
        chrome.tabs.sendRequest(tab.id, "refreshSettings");
      }
    }
  }
}