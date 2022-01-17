function(event)
    {
        var uiSourceCode = /** @type {WebInspector.UISourceCode} */ event.data;
        this._removeSourceFrame(uiSourceCode);
    }