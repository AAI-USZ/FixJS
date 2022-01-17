function()
    {
        var uiSourceCodes = this.uiSourceCodes();
        for (var i = 0; i < uiSourceCodes.length; ++i)
            this.dispatchEventToListeners(WebInspector.UISourceCodeProvider.Events.UISourceCodeRemoved, uiSourceCodes[i]);

        this._sourceMapByURL = {};
        this._sourceMapForScriptId = {};
        this._scriptForSourceMap = new Map();
        this._sourceMapForUISourceCode = new Map();
        this._uiSourceCodeByURL = {};
    }