function(url) {
      if (pg) {
        if (os === 'android') {
          url = url.indexOf("?") > -1 ? url+"&mby=1" : url+"?mby=1";
          cordova.exec(null, null, 'ChildBrowser', 'showWebPage', [url, false]);
        } else {
          window.plugins.childBrowser.showWebPage(url);
        }
        return;
      }

      window.location = url;
    }