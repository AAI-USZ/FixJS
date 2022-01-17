function(eventName, opt_callback) {
        var paramObject = {
             'eventName': eventName,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('DOMDebugger.removeInstrumentationBreakpoint', paramObject, opt_callback);
    }