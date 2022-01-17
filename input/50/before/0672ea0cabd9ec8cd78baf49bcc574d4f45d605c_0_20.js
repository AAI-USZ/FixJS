function(value, opt_callback) {
        var paramObject = {
             'value': value,
         };
        chrome.devtools.remoteDebug.sendCommand('Page.setScriptExecutionDisabled', paramObject, opt_callback);
    }