function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('IndexedDB.enable', paramObject, opt_callback);
    }