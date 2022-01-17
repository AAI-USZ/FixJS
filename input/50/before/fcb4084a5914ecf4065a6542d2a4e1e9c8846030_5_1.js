function()
    {
        var uiSourceCodes = this._uiSourceCodeProvider.uiSourceCodes();
        for (var i = 0; i < uiSourceCodes.length; ++i)
            this._uiSourceCodeAdded(uiSourceCodes[i]);
    }