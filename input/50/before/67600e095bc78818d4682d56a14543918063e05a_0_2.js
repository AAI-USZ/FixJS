function(event)
    {
        var resource = event.data;
        this._postNotification(WebInspector.extensionAPI.Events.ResourceAdded, this._makeResource(resource));
    }