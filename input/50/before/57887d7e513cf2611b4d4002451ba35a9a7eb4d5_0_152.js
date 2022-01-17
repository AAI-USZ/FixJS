function(workerId, message, opt_callback) {
        var paramObject = {
             'workerId': workerId,
             'message': message,
         };
        chrome.devtools.remoteDebug.sendCommand('Worker.sendMessageToWorker', paramObject, opt_callback);
    }