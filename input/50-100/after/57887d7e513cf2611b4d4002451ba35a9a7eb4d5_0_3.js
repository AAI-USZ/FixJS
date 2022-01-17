function(width, height, fontScaleFactor, fitWindow, opt_callback) {
        var paramObject = {
             'width': width,
             'height': height,
             'fontScaleFactor': fontScaleFactor,
             'fitWindow': fitWindow,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Page.setDeviceMetricsOverride', paramObject, opt_callback);
    }