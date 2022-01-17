function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('FileSystem.disable', paramObject, opt_callback);
    }