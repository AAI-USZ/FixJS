function(headers, opt_callback) {
        var paramObject = {
             'headers': headers,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Network.setExtraHTTPHeaders', paramObject, opt_callback);
    }