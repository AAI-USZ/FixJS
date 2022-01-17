function(opt_callback/*(result)*/) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Debugger.canSetScriptSource', paramObject, opt_callback);
    }