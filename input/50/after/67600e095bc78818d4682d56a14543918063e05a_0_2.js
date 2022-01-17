function(event)
    {
        var uiSourceCode = /** @type {WebInspector.UISourceCode} */ event.data;
        this._postNotification(WebInspector.extensionAPI.Events.ResourceAdded, this._makeResource(uiSourceCode));
    }