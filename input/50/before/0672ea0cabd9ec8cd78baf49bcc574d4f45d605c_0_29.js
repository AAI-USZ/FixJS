function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Console.clearMessages', paramObject, opt_callback);
    }