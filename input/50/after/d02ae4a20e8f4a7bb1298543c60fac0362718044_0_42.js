function(cacheDisabled, opt_callback) {
        var paramObject = {
             'cacheDisabled': cacheDisabled,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Network.setCacheDisabled', paramObject, opt_callback);
    }