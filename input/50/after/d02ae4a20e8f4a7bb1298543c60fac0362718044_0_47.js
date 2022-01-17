function(opt_callback) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('IndexedDB.enable', paramObject, opt_callback);
    }