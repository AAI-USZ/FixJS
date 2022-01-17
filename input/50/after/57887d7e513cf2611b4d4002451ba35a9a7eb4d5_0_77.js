function(searchId, opt_callback) {
        var paramObject = {
             'searchId': searchId,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('DOM.discardSearchResults', paramObject, opt_callback);
    }