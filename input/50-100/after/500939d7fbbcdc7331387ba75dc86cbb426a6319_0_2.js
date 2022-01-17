function(url) {
      if (pg) {
        if (os === 'android') {
          if(url.search(/app.toura.com/) > -1) {
            cordova.exec(null, null, 'ChildBrowser', 'openExternal', [url, false]);
          } else {
            cordova.exec(null, null, 'ChildBrowser', 'showWebPage', [url, false]);
          }
        } else {
          window.plugins.childBrowser.showWebPage(url);
        }
        return;
      }

      window.location = url;
    }