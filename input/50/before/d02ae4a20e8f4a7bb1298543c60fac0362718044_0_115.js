function(location, condition, opt_callback/*(breakpointId,actualLocation)*/) {
        var paramObject = {
             'location': location,
             'condition': condition,
         };
        chrome.devtools.remoteDebug.sendCommand('Debugger.setBreakpoint', paramObject, opt_callback);
    }