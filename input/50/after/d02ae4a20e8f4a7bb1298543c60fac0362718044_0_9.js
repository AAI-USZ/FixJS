function(ignoreCache, scriptToEvaluateOnLoad, opt_callback) {
        var paramObject = {
             'ignoreCache': ignoreCache,
             'scriptToEvaluateOnLoad': scriptToEvaluateOnLoad,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Page.reload', paramObject, opt_callback);
    }