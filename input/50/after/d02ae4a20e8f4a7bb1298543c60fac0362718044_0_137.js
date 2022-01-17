function(opt_callback/*(result)*/) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Profiler.isSampling', paramObject, opt_callback);
    }