function(nodeId, forcedPseudoClasses, opt_callback/*(computedStyle)*/) {
        var paramObject = {
             'nodeId': nodeId,
             'forcedPseudoClasses': forcedPseudoClasses,
         };
        chrome.devtools.remoteDebug.sendCommand('CSS.getComputedStyleForNode', paramObject, opt_callback);
    }