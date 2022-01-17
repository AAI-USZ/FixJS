function(event)
    {
        if (this._javaScriptSource.isDirty() && !this._javaScriptSource.supportsEnabledBreakpointsWhileEditing())
            return;

        if (event.button != 0 || event.altKey || event.ctrlKey || event.metaKey)
            return;
        var target = event.target.enclosingNodeOrSelfWithClass("webkit-line-number");
        if (!target)
            return;
        var lineNumber = target.lineNumber;

        this._toggleBreakpoint(lineNumber, event.shiftKey);
        event.preventDefault();
    }