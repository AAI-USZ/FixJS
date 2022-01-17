function()
    {
        return this._contentLoaded && typeof this._workingCopy !== "undefined" && this._workingCopy !== this._content;
    }