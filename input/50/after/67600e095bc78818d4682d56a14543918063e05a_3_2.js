function()
    {
        return typeof this._workingCopy !== "undefined" && this._workingCopy !== this._content;
    }