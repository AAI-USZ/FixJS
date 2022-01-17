function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Profiler.start', paramObject, opt_callback);
    }