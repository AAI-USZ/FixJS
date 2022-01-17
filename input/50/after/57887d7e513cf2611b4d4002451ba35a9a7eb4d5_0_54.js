function(storageId, key, value, opt_callback/*(success)*/) {
        var paramObject = {
             'storageId': storageId,
             'key': key,
             'value': value,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('DOMStorage.setDOMStorageItem', paramObject, opt_callback);
    }