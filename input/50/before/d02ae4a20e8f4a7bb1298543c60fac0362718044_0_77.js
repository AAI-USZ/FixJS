function(searchId, opt_callback) {
        var paramObject = {
             'searchId': searchId,
         };
        chrome.devtools.remoteDebug.sendCommand('DOM.discardSearchResults', paramObject, opt_callback);
    }