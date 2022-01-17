function(nodeId, selector, opt_callback/*(nodeId)*/) {
        var paramObject = {
             'nodeId': nodeId,
             'selector': selector,
         };
        chrome.devtools.remoteDebug.sendCommand('DOM.querySelector', paramObject, opt_callback);
    }