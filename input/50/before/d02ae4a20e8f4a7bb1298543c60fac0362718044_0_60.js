function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('FileSystem.enable', paramObject, opt_callback);
    }