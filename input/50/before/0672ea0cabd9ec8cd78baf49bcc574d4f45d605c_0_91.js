function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('CSS.enable', paramObject, opt_callback);
    }