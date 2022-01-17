function(x, y, width, height, color, outlineColor, opt_callback) {
        var paramObject = {
             'x': x,
             'y': y,
             'width': width,
             'height': height,
             'color': color,
             'outlineColor': outlineColor,
         };
        chrome.devtools.remoteDebug.sendCommand('DOM.highlightRect', paramObject, opt_callback);
    }