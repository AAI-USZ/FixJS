function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('CSS.disable', paramObject, opt_callback);
    }