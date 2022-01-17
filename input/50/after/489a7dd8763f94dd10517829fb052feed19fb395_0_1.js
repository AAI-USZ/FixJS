function()
    {
        var removedUISourceCodes = this._releasedUISourceCodes();
        this._uiSourceCodeForScriptId = {};
        this._scriptForUISourceCode = new Map();
        this._loadSnippets();
    }