function(requestId, frameId, databaseName, opt_callback) {
        var paramObject = {
             'requestId': requestId,
             'frameId': frameId,
             'databaseName': databaseName,
         };
        chrome.devtools.remoteDebug.sendCommand('IndexedDB.requestDatabase', paramObject, opt_callback);
    }