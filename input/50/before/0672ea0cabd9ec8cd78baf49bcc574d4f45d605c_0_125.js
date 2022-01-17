function(scriptId, opt_callback/*(scriptSource)*/) {
        var paramObject = {
             'scriptId': scriptId,
         };
        chrome.devtools.remoteDebug.sendCommand('Debugger.getScriptSource', paramObject, opt_callback);
    }