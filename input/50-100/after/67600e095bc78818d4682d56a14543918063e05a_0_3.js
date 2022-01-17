function(message, port)
    {
        var url = /** @type {String} */ message.url;
        var contentProvider = WebInspector.workspace.uiSourceCodeForURL(url) || WebInspector.resourceForURL(url);
        if (!contentProvider)
            return this._status.E_NOTFOUND(url);
        this._getResourceContent(contentProvider, message, port);
    }