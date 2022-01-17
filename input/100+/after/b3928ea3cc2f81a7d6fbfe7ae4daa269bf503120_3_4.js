function chromeAddToBlackList(info, tab) {
  var oldSettings = parseSettings();
  if(info.selectionText) {
    for(var v=0;v<oldSettings["listBlack"].length;v++){
      if(oldSettings.listBlack[v].toLowerCase()==info.selectionText.toLowerCase()) {
        alert("'"+info.selectionText+"' is already on your black list.");
        return;
      }
    }
    oldSettings.listBlack.push(info.selectionText.toLowerCase());
    localStorage["settings"] = JSON.stringify(oldSettings);
  }
  var chromeViews = chrome.extension.getViews();
  for(chromeView in chromeViews) {
    if(chromeViews[chromeView].location==chrome.extension.getURL("options.html")) {
      chromeViews[chromeView].location.reload();
    }
  }
/*  if (typeof chrome.tabs.sendMessage != "undefined") {
    chrome.tabs.sendMessage(tab.id, "refreshSettings");
  } else */ if (typeof chrome.tabs.sendRequest != "undefined") {
    chrome.tabs.sendRequest(tab.id, "refreshSettings");
  }
}