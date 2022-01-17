function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Network.clearBrowserCache', paramObject, opt_callback);
    }