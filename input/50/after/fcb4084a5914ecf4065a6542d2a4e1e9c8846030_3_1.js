function(rawSourceCode, uiSourceCode)
    {
        if (!uiSourceCode.url)
            return;
        this._rawSourceCodeForUISourceCode.remove(uiSourceCode);
    }