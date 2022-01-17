function(opt_callback/*(profile)*/) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('CSS.stopSelectorProfiler', paramObject, opt_callback);
    }