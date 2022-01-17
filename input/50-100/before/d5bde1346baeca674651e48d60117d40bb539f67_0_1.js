function(oldUISourceCode, uiSourceCode)
    {
        var added = false;
        var selected = false;
        if (this._scriptTreeElementsByUISourceCode.get(oldUISourceCode)) {
            added = true;

            if (this._lastSelectedUISourceCode === oldUISourceCode)
                selected = true;
            this._removeUISourceCode(oldUISourceCode);
        }

        if (!added)
            return;
        this.addUISourceCode(uiSourceCode);
        if (selected)
            this.revealUISourceCode(uiSourceCode);
    }