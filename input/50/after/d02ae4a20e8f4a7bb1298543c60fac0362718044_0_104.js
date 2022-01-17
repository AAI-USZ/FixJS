function(opt_callback/*(profile)*/) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('CSS.stopSelectorProfiler', paramObject, opt_callback);
    }