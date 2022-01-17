function(ruleId, selector, opt_callback/*(rule)*/) {
        var paramObject = {
             'ruleId': ruleId,
             'selector': selector,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('CSS.setRuleSelector', paramObject, opt_callback);
    }