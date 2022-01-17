function(anchor)
    {
        if (this._debuggerEnabled && anchor.uiSourceCode)
            return true;
        var uiSourceCodes = this._workspace.uiSourceCodes();
        for (var i = 0; i < uiSourceCodes.length; ++i) {
            if (uiSourceCodes[i].url === anchor.href) {
                anchor.uiSourceCode = uiSourceCodes[i];
                return true;
            }
        }
        return false;
    }