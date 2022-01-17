function(opt_callback/*(result)*/) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Debugger.causesRecompilation', paramObject, opt_callback);
    }