function(enabled, opt_callback) {
        var paramObject = {
             'enabled': enabled,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Runtime.setReportExecutionContextCreation', paramObject, opt_callback);
    }