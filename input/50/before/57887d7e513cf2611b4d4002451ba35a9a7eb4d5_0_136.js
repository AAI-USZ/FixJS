function(opt_callback/*(result)*/) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Profiler.causesRecompilation', paramObject, opt_callback);
    }