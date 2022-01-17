function(frameId, opt_callback/*(manifestURL)*/) {
        var paramObject = {
             'frameId': frameId,
         };
        chrome.devtools.remoteDebug.sendCommand('ApplicationCache.getManifestForFrame', paramObject, opt_callback);
    }