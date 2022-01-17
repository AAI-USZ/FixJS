function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Inspector.enable', paramObject, opt_callback);
    }