function(rawSourceCode, uiSourceCode)
    {
        this._rawSourceCodeForUISourceCode.put(uiSourceCode, rawSourceCode);
        this.dispatchEventToListeners(WebInspector.UISourceCodeProvider.Events.UISourceCodeAdded, uiSourceCode);
    }