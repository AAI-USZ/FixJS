function(opt_callback/*(result)*/) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Profiler.hasHeapProfiler', paramObject, opt_callback);
    }