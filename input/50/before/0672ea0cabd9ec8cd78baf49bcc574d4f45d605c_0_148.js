function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Profiler.collectGarbage', paramObject, opt_callback);
    }