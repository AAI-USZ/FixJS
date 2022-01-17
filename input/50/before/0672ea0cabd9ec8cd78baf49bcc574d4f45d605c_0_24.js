function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Runtime.run', paramObject, opt_callback);
    }