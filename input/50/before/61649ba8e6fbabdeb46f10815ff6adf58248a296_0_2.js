function(rawSourceCode, uiSourceCode)
    {
        this._rawSourceCodeForUISourceCode.remove(uiSourceCode);
        this.dispatchEventToListeners(WebInspector.UISourceCodeProvider.Events.UISourceCodeRemoved, uiSourceCode);
    }