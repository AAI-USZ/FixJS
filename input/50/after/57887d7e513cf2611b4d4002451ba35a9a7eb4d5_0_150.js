function(objectId, opt_callback/*(heapSnapshotObjectId)*/) {
        var paramObject = {
             'objectId': objectId,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Profiler.getHeapObjectId', paramObject, opt_callback);
    }