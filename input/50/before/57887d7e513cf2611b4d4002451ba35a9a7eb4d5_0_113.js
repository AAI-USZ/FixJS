function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Debugger.disable', paramObject, opt_callback);
    }