function(port, details)
    {
        var resource = WebInspector.resourceForURL(details.url);
        if (!resource)
            return false;
        var lineNumber = details.lineNumber;
        if (typeof lineNumber === "number")
            lineNumber += 1;
        port.postMessage({
            command: "open-resource",
            resource: this._makeResource(resource),
            lineNumber: lineNumber
        });
        return true;
    }