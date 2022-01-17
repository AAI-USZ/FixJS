function(opt_callback/*(headers)*/) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Profiler.getProfileHeaders', paramObject, opt_callback);
    }