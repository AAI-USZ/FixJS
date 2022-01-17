function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Debugger.resume', paramObject, opt_callback);
    }