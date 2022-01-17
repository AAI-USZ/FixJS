function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Profiler.clearProfiles', paramObject, opt_callback);
    }