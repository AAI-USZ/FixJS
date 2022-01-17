function(opt_callback/*(distribution)*/) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Memory.getProcessMemoryDistribution', paramObject, opt_callback);
    }