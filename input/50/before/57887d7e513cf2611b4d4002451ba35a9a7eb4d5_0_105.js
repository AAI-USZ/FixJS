function(maxCallStackDepth, opt_callback) {
        var paramObject = {
             'maxCallStackDepth': maxCallStackDepth,
         };
        chrome.devtools.remoteDebug.sendCommand('Timeline.start', paramObject, opt_callback);
    }