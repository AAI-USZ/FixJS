function(requestId, frameId, opt_callback) {
        var paramObject = {
             'requestId': requestId,
             'frameId': frameId,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('IndexedDB.requestDatabaseNamesForFrame', paramObject, opt_callback);
    }