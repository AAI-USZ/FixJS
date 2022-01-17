function()
    {
        var uiSourceCodes = this._workspace.uiSourceCodes();
        for (var i = 0; i < uiSourceCodes.length; ++i)
            this._uiSourceCodeAdded(uiSourceCodes[i]);
    }