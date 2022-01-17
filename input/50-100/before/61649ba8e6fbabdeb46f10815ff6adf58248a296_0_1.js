function(rawSourceCode, oldUISourceCode, uiSourceCode)
    {
        this._rawSourceCodeForUISourceCode.remove(oldUISourceCode);
        this._rawSourceCodeForUISourceCode.put(uiSourceCode, rawSourceCode);

        for (var i = 0; i < rawSourceCode._scripts.length; ++i)
            rawSourceCode._scripts[i].setSourceMapping(this);

        var data = { oldUISourceCode: oldUISourceCode, uiSourceCode: uiSourceCode };
        this.dispatchEventToListeners(WebInspector.UISourceCodeProvider.Events.UISourceCodeReplaced, data);
    }