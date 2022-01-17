function(objectId, objectGroup, opt_callback/*(result)*/) {
        var paramObject = {
             'objectId': objectId,
             'objectGroup': objectGroup,
         };
        chrome.devtools.remoteDebug.sendCommand('Profiler.getObjectByHeapObjectId', paramObject, opt_callback);
    }