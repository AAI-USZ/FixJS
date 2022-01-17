function(eventName, opt_callback) {
        var paramObject = {
             'eventName': eventName,
         };
        chrome.devtools.remoteDebug.sendCommand('DOMDebugger.removeInstrumentationBreakpoint', paramObject, opt_callback);
    }