function(scriptSource, opt_callback/*(identifier)*/) {
        var paramObject = {
             'scriptSource': scriptSource,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Page.addScriptToEvaluateOnLoad', paramObject, opt_callback);
    }