function(eventName, opt_callback) {
        var paramObject = {
             'eventName': eventName,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('DOMDebugger.setInstrumentationBreakpoint', paramObject, opt_callback);
    }