function(opt_callback) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Debugger.stepInto', paramObject, opt_callback);
    }