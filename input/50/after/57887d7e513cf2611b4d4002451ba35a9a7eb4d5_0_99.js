function(styleId, propertyIndex, disable, opt_callback/*(style)*/) {
        var paramObject = {
             'styleId': styleId,
             'propertyIndex': propertyIndex,
             'disable': disable,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('CSS.toggleProperty', paramObject, opt_callback);
    }