function(type, uid, opt_callback) {
        var paramObject = {
             'type': type,
             'uid': uid,
         };
        chrome.devtools.remoteDebug.sendCommand('Profiler.removeProfile', paramObject, opt_callback);
    }