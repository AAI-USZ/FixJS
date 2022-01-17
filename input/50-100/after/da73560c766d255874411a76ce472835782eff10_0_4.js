function openDGSTab(dgsTab) {
  if (dgsTab == null) {
   chrome.tabs.create({'url': statusUrl}); 
 } else {
   chrome.tabs.update(dgsTab.id, {'selected' : true, 'url' : statusUrl}, function(){})
 }
}