function(scriptSource, opt_callback/*(identifier)*/) {
        var paramObject = {
             'scriptSource': scriptSource,
         };
        chrome.devtools.remoteDebug.sendCommand('Page.addScriptToEvaluateOnLoad', paramObject, opt_callback);
    }