function(rawSourceCode, uiSourceCode)
    {
        if (!uiSourceCode.url)
            return;
        this._rawSourceCodeForUISourceCode.put(uiSourceCode, rawSourceCode);
        this.dispatchEventToListeners(WebInspector.UISourceCodeProvider.Events.UISourceCodeAdded, uiSourceCode);
    }