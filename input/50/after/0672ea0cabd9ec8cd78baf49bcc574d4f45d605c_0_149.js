function(objectId, objectGroup, opt_callback/*(result)*/) {
        var paramObject = {
             'objectId': objectId,
             'objectGroup': objectGroup,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Profiler.getObjectByHeapObjectId', paramObject, opt_callback);
    }