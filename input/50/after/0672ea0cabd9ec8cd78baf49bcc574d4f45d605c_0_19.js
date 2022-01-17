function(opt_callback/*(result)*/) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Page.getScriptExecutionStatus', paramObject, opt_callback);
    }