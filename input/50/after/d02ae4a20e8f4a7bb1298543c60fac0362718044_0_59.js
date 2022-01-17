function(frameId, opt_callback/*(applicationCache)*/) {
        var paramObject = {
             'frameId': frameId,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('ApplicationCache.getApplicationCacheForFrame', paramObject, opt_callback);
    }