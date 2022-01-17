function(nodeId, opt_callback/*(inlineStyle,attributesStyle)*/) {
        var paramObject = {
             'nodeId': nodeId,
         };
        chrome.devtools.remoteDebug.sendCommand('CSS.getInlineStylesForNode', paramObject, opt_callback);
    }