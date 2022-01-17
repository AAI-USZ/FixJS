function(workerId, opt_callback) {
        var paramObject = {
             'workerId': workerId,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Worker.disconnectFromWorker', paramObject, opt_callback);
    }