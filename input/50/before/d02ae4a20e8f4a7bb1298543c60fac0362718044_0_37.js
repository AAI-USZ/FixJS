function(requestId, opt_callback/*(body,base64Encoded)*/) {
        var paramObject = {
             'requestId': requestId,
         };
        chrome.devtools.remoteDebug.sendCommand('Network.getResponseBody', paramObject, opt_callback);
    }