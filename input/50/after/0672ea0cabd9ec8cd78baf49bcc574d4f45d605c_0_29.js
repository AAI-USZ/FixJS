function(opt_callback) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Console.clearMessages', paramObject, opt_callback);
    }