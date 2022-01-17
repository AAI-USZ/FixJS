function(requestId, frameId, databaseName, objectStoreName, indexName, skipCount, pageSize, keyRange, opt_callback) {
        var paramObject = {
             'requestId': requestId,
             'frameId': frameId,
             'databaseName': databaseName,
             'objectStoreName': objectStoreName,
             'indexName': indexName,
             'skipCount': skipCount,
             'pageSize': pageSize,
             'keyRange': keyRange,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('IndexedDB.requestData', paramObject, opt_callback);
    }