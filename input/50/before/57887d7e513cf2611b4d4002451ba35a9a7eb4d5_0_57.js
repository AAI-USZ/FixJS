function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('ApplicationCache.enable', paramObject, opt_callback);
    }