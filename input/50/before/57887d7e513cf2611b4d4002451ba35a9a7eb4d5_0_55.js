function(storageId, key, opt_callback/*(success)*/) {
        var paramObject = {
             'storageId': storageId,
             'key': key,
         };
        chrome.devtools.remoteDebug.sendCommand('DOMStorage.removeDOMStorageItem', paramObject, opt_callback);
    }