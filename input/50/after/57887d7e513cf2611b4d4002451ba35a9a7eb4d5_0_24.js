function(opt_callback) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Runtime.run', paramObject, opt_callback);
    }