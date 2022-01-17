function(breakpointId, opt_callback) {
        var paramObject = {
             'breakpointId': breakpointId,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Debugger.removeBreakpoint', paramObject, opt_callback);
    }