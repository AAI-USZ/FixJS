function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Inspector.disable', paramObject, opt_callback);
    }