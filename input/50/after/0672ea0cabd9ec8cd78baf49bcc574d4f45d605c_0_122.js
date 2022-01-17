function(opt_callback) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Debugger.resume', paramObject, opt_callback);
    }