function(storageId, opt_callback/*(entries)*/) {
        var paramObject = {
             'storageId': storageId,
         };
        chrome.devtools.remoteDebug.sendCommand('DOMStorage.getDOMStorageEntries', paramObject, opt_callback);
    }