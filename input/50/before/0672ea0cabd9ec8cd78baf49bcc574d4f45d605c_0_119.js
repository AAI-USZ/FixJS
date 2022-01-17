function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Debugger.stepInto', paramObject, opt_callback);
    }