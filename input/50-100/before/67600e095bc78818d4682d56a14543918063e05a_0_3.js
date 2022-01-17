function(message, port)
    {
        var resource = WebInspector.resourceTreeModel.resourceForURL(message.url);
        if (!resource)
            return this._status.E_NOTFOUND(message.url);
        this._getResourceContent(resource.uiSourceCode() || resource, message, port);
    }