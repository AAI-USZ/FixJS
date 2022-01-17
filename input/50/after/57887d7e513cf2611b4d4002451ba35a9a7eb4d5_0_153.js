function(workerId, opt_callback) {
        var paramObject = {
             'workerId': workerId,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Worker.connectToWorker', paramObject, opt_callback);
    }