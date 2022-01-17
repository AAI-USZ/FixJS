function(cacheDisabled, opt_callback) {
        var paramObject = {
             'cacheDisabled': cacheDisabled,
         };
        chrome.devtools.remoteDebug.sendCommand('Network.setCacheDisabled', paramObject, opt_callback);
    }