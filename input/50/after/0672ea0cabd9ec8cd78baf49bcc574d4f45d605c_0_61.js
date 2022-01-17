function(opt_callback) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('FileSystem.disable', paramObject, opt_callback);
    }