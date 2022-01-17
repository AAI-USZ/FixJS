function(opt_callback) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('FileSystem.enable', paramObject, opt_callback);
    }