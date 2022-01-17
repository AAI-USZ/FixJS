function(opt_callback/*(result)*/) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Profiler.isSampling', paramObject, opt_callback);
    }