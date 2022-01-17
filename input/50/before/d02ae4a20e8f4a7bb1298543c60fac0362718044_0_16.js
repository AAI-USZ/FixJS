function(frameId, html, opt_callback) {
        var paramObject = {
             'frameId': frameId,
             'html': html,
         };
        chrome.devtools.remoteDebug.sendCommand('Page.setDocumentContent', paramObject, opt_callback);
    }