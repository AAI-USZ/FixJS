function(enabled, highlightConfig, opt_callback) {
        var paramObject = {
             'enabled': enabled,
             'highlightConfig': highlightConfig,
         };
        chrome.devtools.remoteDebug.sendCommand('DOM.setInspectModeEnabled', paramObject, opt_callback);
    }