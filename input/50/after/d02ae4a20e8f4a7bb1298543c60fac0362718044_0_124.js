function(scriptId, scriptSource, preview, opt_callback/*(callFrames,result)*/) {
        var paramObject = {
             'scriptId': scriptId,
             'scriptSource': scriptSource,
             'preview': preview,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Debugger.setScriptSource', paramObject, opt_callback);
    }