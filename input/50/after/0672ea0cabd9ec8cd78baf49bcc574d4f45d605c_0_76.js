function(searchId, fromIndex, toIndex, opt_callback/*(nodeIds)*/) {
        var paramObject = {
             'searchId': searchId,
             'fromIndex': fromIndex,
             'toIndex': toIndex,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('DOM.getSearchResults', paramObject, opt_callback);
    }