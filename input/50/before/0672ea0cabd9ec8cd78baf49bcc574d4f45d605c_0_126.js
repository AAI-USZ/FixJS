function(functionId, opt_callback/*(details)*/) {
        var paramObject = {
             'functionId': functionId,
         };
        chrome.devtools.remoteDebug.sendCommand('Debugger.getFunctionDetails', paramObject, opt_callback);
    }