function(rawSourceCode, uiSourceCode)
    {
        if (!uiSourceCode.url)
            return;
        this._rawSourceCodeForUISourceCode.remove(uiSourceCode);
        this.dispatchEventToListeners(WebInspector.UISourceCodeProvider.Events.UISourceCodeRemoved, uiSourceCode);
    }