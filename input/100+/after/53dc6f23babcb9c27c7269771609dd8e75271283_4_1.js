function (tabs) {
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
    }