function(value, opt_callback) {
        var paramObject = {
             'value': value,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Page.setScriptExecutionDisabled', paramObject, opt_callback);
    }