function(opt_callback/*(frameIds)*/) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('ApplicationCache.getFramesWithManifests', paramObject, opt_callback);
    }