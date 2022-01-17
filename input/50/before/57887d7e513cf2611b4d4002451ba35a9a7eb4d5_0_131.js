function(eventName, opt_callback) {
        var paramObject = {
             'eventName': eventName,
         };
        chrome.devtools.remoteDebug.sendCommand('DOMDebugger.removeEventListenerBreakpoint', paramObject, opt_callback);
    }