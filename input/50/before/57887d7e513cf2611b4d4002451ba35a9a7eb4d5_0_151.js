function(value, opt_callback) {
        var paramObject = {
             'value': value,
         };
        chrome.devtools.remoteDebug.sendCommand('Worker.setWorkerInspectionEnabled', paramObject, opt_callback);
    }