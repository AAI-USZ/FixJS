function(value, opt_callback) {
        var paramObject = {
             'value': value,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Worker.setAutoconnectToWorkers', paramObject, opt_callback);
    }