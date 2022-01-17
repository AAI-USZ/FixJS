function(lineNumber, condition, enabled, mutedWhileEditing)
    {
        var breakpoint = {
            condition: condition,
            enabled: enabled
        };
        this.textModel.setAttribute(lineNumber, "breakpoint", breakpoint);

        this.textViewer.beginUpdates();
        this.textViewer.addDecoration(lineNumber, "webkit-breakpoint");
        if (!enabled || (mutedWhileEditing && !this._javaScriptSource.supportsEnabledBreakpointsWhileEditing()))
            this.textViewer.addDecoration(lineNumber, "webkit-breakpoint-disabled");
        else
            this.textViewer.removeDecoration(lineNumber, "webkit-breakpoint-disabled");
        if (!!condition)
            this.textViewer.addDecoration(lineNumber, "webkit-breakpoint-conditional");
        else
            this.textViewer.removeDecoration(lineNumber, "webkit-breakpoint-conditional");
        this.textViewer.endUpdates();
    }