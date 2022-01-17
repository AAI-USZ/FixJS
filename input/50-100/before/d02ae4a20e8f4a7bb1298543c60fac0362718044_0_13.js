function(nodeId, forcedPseudoClasses, includePseudo, includeInherited, opt_callback/*(matchedCSSRules,pseudoElements,inherited)*/) {
        var paramObject = {
             'nodeId': nodeId,
             'forcedPseudoClasses': forcedPseudoClasses,
             'includePseudo': includePseudo,
             'includeInherited': includeInherited,
         };
        chrome.devtools.remoteDebug.sendCommand('CSS.getMatchedStylesForNode', paramObject, opt_callback);
    }