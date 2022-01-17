function(heapObjectId, opt_callback) {
        var paramObject = {
             'heapObjectId': heapObjectId,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Console.addInspectedHeapObject', paramObject, opt_callback);
    }