function(opt_callback) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('CSS.startSelectorProfiler', paramObject, opt_callback);
    }