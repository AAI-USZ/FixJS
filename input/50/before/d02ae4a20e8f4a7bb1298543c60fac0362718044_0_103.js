function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('CSS.startSelectorProfiler', paramObject, opt_callback);
    }