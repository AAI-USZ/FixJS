function(active, opt_callback) {
        var paramObject = {
             'active': active,
         };
        chrome.devtools.remoteDebug.sendCommand('Debugger.setBreakpointsActive', paramObject, opt_callback);
    }