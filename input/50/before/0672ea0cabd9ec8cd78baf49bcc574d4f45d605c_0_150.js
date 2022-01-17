function(objectId, opt_callback/*(heapSnapshotObjectId)*/) {
        var paramObject = {
             'objectId': objectId,
         };
        chrome.devtools.remoteDebug.sendCommand('Profiler.getHeapObjectId', paramObject, opt_callback);
    }