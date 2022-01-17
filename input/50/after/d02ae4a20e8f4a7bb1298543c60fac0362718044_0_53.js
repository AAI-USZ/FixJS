function(storageId, opt_callback/*(entries)*/) {
        var paramObject = {
             'storageId': storageId,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('DOMStorage.getDOMStorageEntries', paramObject, opt_callback);
    }