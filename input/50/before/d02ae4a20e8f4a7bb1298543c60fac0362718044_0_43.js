function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Database.enable', paramObject, opt_callback);
    }