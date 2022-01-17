function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Debugger.stepOver', paramObject, opt_callback);
    }