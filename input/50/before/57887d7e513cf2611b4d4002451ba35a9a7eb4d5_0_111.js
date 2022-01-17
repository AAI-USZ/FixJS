function(opt_callback/*(result)*/) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Debugger.supportsNativeBreakpoints', paramObject, opt_callback);
    }