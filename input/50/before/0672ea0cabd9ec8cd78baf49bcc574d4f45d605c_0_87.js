function(enabled, opt_callback) {
        var paramObject = {
             'enabled': enabled,
         };
        chrome.devtools.remoteDebug.sendCommand('DOM.setTouchEmulationEnabled', paramObject, opt_callback);
    }