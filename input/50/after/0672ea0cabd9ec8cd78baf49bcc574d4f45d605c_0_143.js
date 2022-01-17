function(opt_callback/*(headers)*/) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Profiler.getProfileHeaders', paramObject, opt_callback);
    }