function(workerId, opt_callback) {
        var paramObject = {
             'workerId': workerId,
         };
        chrome.devtools.remoteDebug.sendCommand('Worker.disconnectFromWorker', paramObject, opt_callback);
    }