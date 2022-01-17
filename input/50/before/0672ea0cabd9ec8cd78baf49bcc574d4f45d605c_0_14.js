function(frameId, url, opt_callback/*(content,base64Encoded)*/) {
        var paramObject = {
             'frameId': frameId,
             'url': url,
         };
        chrome.devtools.remoteDebug.sendCommand('Page.getResourceContent', paramObject, opt_callback);
    }