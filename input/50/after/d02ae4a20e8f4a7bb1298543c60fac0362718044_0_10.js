function(url, opt_callback) {
        var paramObject = {
             'url': url,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Page.navigate', paramObject, opt_callback);
    }