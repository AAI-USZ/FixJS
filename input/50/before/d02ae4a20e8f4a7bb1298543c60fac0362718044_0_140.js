function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Profiler.disable', paramObject, opt_callback);
    }