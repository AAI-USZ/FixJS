function(breakpointId, opt_callback) {
        var paramObject = {
             'breakpointId': breakpointId,
         };
        chrome.devtools.remoteDebug.sendCommand('Debugger.removeBreakpoint', paramObject, opt_callback);
    }