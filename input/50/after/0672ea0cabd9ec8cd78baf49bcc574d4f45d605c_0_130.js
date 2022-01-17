function(eventName, opt_callback) {
        var paramObject = {
             'eventName': eventName,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('DOMDebugger.setEventListenerBreakpoint', paramObject, opt_callback);
    }