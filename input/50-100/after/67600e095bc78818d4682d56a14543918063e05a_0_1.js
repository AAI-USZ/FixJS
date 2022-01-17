function(port, details)
    {
        var url = /** @type {String} */ details.url;
        var contentProvider = WebInspector.workspace.uiSourceCodeForURL(url) || WebInspector.resourceForURL(url);
        if (!contentProvider)
            return false;
            
        var lineNumber = details.lineNumber;
        if (typeof lineNumber === "number")
            lineNumber += 1;
        port.postMessage({
            command: "open-resource",
            resource: this._makeResource(contentProvider),
            lineNumber: lineNumber
        });
        return true;
    }