function(frameId, opt_callback/*(applicationCache)*/) {
        var paramObject = {
             'frameId': frameId,
         };
        chrome.devtools.remoteDebug.sendCommand('ApplicationCache.getApplicationCacheForFrame', paramObject, opt_callback);
    }