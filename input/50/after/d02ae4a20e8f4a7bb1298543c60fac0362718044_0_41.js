function(opt_callback) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Network.clearBrowserCookies', paramObject, opt_callback);
    }