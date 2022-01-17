function(eventName, opt_callback) {
        var paramObject = {
             'eventName': eventName,
         };
        chrome.devtools.remoteDebug.sendCommand('DOMDebugger.setEventListenerBreakpoint', paramObject, opt_callback);
    }