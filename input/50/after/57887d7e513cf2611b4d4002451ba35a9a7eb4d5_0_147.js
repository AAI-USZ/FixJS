function(opt_callback) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Profiler.takeHeapSnapshot', paramObject, opt_callback);
    }