function(opt_callback) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('ApplicationCache.enable', paramObject, opt_callback);
    }