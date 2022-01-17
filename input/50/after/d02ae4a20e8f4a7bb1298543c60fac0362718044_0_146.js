function(opt_callback) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Profiler.clearProfiles', paramObject, opt_callback);
    }