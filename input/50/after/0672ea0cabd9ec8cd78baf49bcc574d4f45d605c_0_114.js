function(active, opt_callback) {
        var paramObject = {
             'active': active,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Debugger.setBreakpointsActive', paramObject, opt_callback);
    }