function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Debugger.pause', paramObject, opt_callback);
    }