function(headers, opt_callback) {
        var paramObject = {
             'headers': headers,
         };
        chrome.devtools.remoteDebug.sendCommand('Network.setExtraHTTPHeaders', paramObject, opt_callback);
    }