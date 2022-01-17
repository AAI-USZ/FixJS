function()
    {
        console.assert(this._contentLoaded);
        if (this.isDirty())
            return this._workingCopy;
        return this._content;
    }