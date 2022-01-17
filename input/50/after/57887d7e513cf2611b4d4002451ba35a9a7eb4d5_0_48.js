function(opt_callback) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('IndexedDB.disable', paramObject, opt_callback);
    }