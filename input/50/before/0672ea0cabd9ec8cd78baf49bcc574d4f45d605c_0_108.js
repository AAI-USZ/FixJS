function(opt_callback/*(result)*/) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Timeline.supportsFrameInstrumentation', paramObject, opt_callback);
    }