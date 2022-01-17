function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Timeline.stop', paramObject, opt_callback);
    }