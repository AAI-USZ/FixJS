function(opt_callback) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('CSS.enable', paramObject, opt_callback);
    }