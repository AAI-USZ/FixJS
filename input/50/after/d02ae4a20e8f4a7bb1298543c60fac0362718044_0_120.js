function(opt_callback) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Debugger.stepOut', paramObject, opt_callback);
    }