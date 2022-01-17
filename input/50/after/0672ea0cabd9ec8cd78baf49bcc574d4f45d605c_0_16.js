function(frameId, html, opt_callback) {
        var paramObject = {
             'frameId': frameId,
             'html': html,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Page.setDocumentContent', paramObject, opt_callback);
    }