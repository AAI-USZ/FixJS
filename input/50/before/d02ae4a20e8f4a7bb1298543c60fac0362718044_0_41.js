function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Network.clearBrowserCookies', paramObject, opt_callback);
    }