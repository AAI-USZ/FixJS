function(state, opt_callback) {
        var paramObject = {
             'state': state,
         };
        chrome.devtools.remoteDebug.sendCommand('Debugger.setPauseOnExceptions', paramObject, opt_callback);
    }