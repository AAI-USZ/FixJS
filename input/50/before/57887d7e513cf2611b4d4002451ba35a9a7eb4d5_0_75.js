function(query, opt_callback/*(searchId,resultCount)*/) {
        var paramObject = {
             'query': query,
         };
        chrome.devtools.remoteDebug.sendCommand('DOM.performSearch', paramObject, opt_callback);
    }