function(searchId, fromIndex, toIndex, opt_callback/*(nodeIds)*/) {
        var paramObject = {
             'searchId': searchId,
             'fromIndex': fromIndex,
             'toIndex': toIndex,
         };
        chrome.devtools.remoteDebug.sendCommand('DOM.getSearchResults', paramObject, opt_callback);
    }