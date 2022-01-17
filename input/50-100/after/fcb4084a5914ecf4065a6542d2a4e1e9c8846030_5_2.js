function()
    {
        this._toggleFormatSourceButton.toggled = !this._toggleFormatSourceButton.toggled;
        var uiSourceCodes = this._workspace.uiSourceCodes();
        for (var i = 0; i < uiSourceCodes.length; ++i)
            uiSourceCodes[i].setFormatted(this._toggleFormatSourceButton.toggled);
    }