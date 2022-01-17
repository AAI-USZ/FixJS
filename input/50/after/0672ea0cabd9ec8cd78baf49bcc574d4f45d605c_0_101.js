function(contextNodeId, selector, opt_callback/*(rule)*/) {
        var paramObject = {
             'contextNodeId': contextNodeId,
             'selector': selector,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('CSS.addRule', paramObject, opt_callback);
    }