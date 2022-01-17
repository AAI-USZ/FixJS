function(enabled, opt_callback) {
        var paramObject = {
             'enabled': enabled,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Timeline.setIncludeMemoryDetails', paramObject, opt_callback);
    }