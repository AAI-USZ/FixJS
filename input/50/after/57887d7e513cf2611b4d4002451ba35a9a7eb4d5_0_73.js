function(nodeId, opt_callback/*(outerHTML)*/) {
        var paramObject = {
             'nodeId': nodeId,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('DOM.getOuterHTML', paramObject, opt_callback);
    }