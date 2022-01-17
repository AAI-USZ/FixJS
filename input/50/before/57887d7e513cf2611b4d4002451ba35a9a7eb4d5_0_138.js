function(opt_callback/*(result)*/) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Profiler.hasHeapProfiler', paramObject, opt_callback);
    }