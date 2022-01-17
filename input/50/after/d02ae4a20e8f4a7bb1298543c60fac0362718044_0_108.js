function(opt_callback/*(result)*/) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Timeline.supportsFrameInstrumentation', paramObject, opt_callback);
    }