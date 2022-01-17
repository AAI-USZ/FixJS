function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('IndexedDB.disable', paramObject, opt_callback);
    }