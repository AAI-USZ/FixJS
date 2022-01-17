function()
    {
        this._sourceMapByURL = {};
        this._sourceMapForScriptId = {};
        this._scriptForSourceMap = new Map();
        this._sourceMapForUISourceCode = new Map();
        this._uiSourceCodeByURL = {};
    }