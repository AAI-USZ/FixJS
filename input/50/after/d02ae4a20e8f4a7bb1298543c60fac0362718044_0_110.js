function(opt_callback/*(result)*/) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Debugger.causesRecompilation', paramObject, opt_callback);
    }