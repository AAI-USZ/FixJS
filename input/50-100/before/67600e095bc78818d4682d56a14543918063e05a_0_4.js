function(event)
    {
        this._postNotification(WebInspector.extensionAPI.Events.ResourceContentCommitted, this._makeResource(event.data.resource), event.data.content);
    }