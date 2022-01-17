function(event)
    {
        var resource = /** @type {WebInspector.Resource} */ event.data.resource;
        var contentProvider = resource.uiSourceCode() || resource;
        this._postNotification(WebInspector.extensionAPI.Events.ResourceContentCommitted, this._makeResource(contentProvider), event.data.content);
    }