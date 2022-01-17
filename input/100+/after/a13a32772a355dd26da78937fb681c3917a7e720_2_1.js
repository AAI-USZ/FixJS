function()
    {
        WebInspector.SourceFrame.prototype.beforeTextChanged.call(this);
        this._removeBreakpointsBeforeEditing();
    }