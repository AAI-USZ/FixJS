function(opt_callback/*(distribution)*/) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Memory.getProcessMemoryDistribution', paramObject, opt_callback);
    }