function(oldRange, newRange)
    {
        WebInspector.SourceFrame.prototype.afterTextChanged.call(this, oldRange, newRange);
        this._javaScriptSource.setWorkingCopy(this.textModel.text);
        this._restoreBreakpointsAfterEditing();
    }