function()
    {
        if (this.isDirty())
            return this._workingCopy;
        return this._content;
    }