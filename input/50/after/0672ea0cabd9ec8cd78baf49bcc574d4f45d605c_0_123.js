function(opt_callback/*(result)*/) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Debugger.canSetScriptSource', paramObject, opt_callback);
    }