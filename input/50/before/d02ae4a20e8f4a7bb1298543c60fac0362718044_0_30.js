function(enabled, opt_callback) {
        var paramObject = {
             'enabled': enabled,
         };
        chrome.devtools.remoteDebug.sendCommand('Console.setMonitoringXHREnabled', paramObject, opt_callback);
    }