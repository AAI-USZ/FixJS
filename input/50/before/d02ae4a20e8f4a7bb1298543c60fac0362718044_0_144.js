function(type, uid, opt_callback/*(profile)*/) {
        var paramObject = {
             'type': type,
             'uid': uid,
         };
        chrome.devtools.remoteDebug.sendCommand('Profiler.getProfile', paramObject, opt_callback);
    }