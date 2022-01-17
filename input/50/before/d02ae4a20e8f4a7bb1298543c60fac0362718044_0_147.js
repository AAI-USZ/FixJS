function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Profiler.takeHeapSnapshot', paramObject, opt_callback);
    }