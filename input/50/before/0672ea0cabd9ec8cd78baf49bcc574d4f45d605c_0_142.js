function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Profiler.stop', paramObject, opt_callback);
    }