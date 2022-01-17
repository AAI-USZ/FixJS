function(oldRange, newRange)
    {
        this._javaScriptSource.setWorkingCopy(this.textModel.text);
        if (!this._javaScriptSource.isDirty())
            this._didEditContent(null);
    }