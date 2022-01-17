function(opt_callback) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Network.clearBrowserCache', paramObject, opt_callback);
    }