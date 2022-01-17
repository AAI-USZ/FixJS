function(opt_callback) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('CSS.disable', paramObject, opt_callback);
    }