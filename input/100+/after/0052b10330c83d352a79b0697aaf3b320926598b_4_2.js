function getPs(query) {
  var d = new Deferred();
  if (query.quick) {
    // if quick post form, not call getCurrent
    var id = query['id'];
    var data = background.TBRL.Popup.data[id];
    var tab = data['tab'];
    var ps = data['ps'];
    delete background.TBRL.Popup.data[id];
    setTimeout(function() { d.callback(ps); }, 0);
  } else {
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function (tabs) {
      var tab = tabs[0];
      if (background.TBRL.Service.isEnableSite(tab.url)) {
        if (background.TBRL.Popup.contents[tab.url]) {
          d.callback(background.TBRL.Popup.contents[tab.url]);
        } else {
          chrome.tabs.sendRequest(tab.id, {
            request: 'popup',
            content: {
              title: tab.title,
              url  : tab.url
            }
          }, function(ps){
            d.callback(ps);
          });
        }
      } else {
        window.close();
      }
    });
  }
  return d;
}