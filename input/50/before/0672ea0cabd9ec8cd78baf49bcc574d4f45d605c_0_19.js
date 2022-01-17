function(opt_callback/*(result)*/) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Page.getScriptExecutionStatus', paramObject, opt_callback);
    }