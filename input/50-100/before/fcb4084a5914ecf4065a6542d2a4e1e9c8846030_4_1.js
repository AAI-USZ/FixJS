function()
    {
        var removedUISourceCodes = this._releasedUISourceCodes();
        this._uiSourceCodeForScriptId = {};
        this._scriptForUISourceCode = new Map();
        for (var i = 0; i < removedUISourceCodes.length; ++i)
            this._snippetScriptMapping._fireUISourceCodeRemoved(removedUISourceCodes[i]);
    }