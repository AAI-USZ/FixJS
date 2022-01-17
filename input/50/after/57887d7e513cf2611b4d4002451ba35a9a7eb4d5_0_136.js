function(opt_callback/*(result)*/) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Profiler.causesRecompilation', paramObject, opt_callback);
    }