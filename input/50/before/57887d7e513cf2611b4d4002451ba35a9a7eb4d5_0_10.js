function(url, opt_callback) {
        var paramObject = {
             'url': url,
         };
        chrome.devtools.remoteDebug.sendCommand('Page.navigate', paramObject, opt_callback);
    }