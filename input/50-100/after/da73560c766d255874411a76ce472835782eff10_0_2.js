function countGamesInQuickStatus(quickStatusText) {  
  var count = 0;
  var pattern = "'G'"
  var regex = new RegExp(pattern,'gi');  
  
  while (regex.exec(quickStatusText)){    
    count++;
  }

  if (count > 0) {
    chrome.browserAction.setBadgeText({'text': count.toString()});
  }
  else {
    chrome.browserAction.setBadgeText({'text': ''});
  }
}