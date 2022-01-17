function(eventName, opt_callback) {
        var paramObject = {
             'eventName': eventName,
         };
        chrome.devtools.remoteDebug.sendCommand('DOMDebugger.setInstrumentationBreakpoint', paramObject, opt_callback);
    }