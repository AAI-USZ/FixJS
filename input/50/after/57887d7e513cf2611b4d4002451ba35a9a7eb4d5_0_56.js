function(opt_callback/*(frameIds)*/) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('ApplicationCache.getFramesWithManifests', paramObject, opt_callback);
    }