function(value, opt_callback) {
        var paramObject = {
             'value': value,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Worker.setWorkerInspectionEnabled', paramObject, opt_callback);
    }