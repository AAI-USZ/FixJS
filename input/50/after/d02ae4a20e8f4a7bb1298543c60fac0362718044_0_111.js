function(opt_callback/*(result)*/) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Debugger.supportsNativeBreakpoints', paramObject, opt_callback);
    }