function()
    {
        if (!this._javaScriptSource.isDirty()) {
            // Disable all breakpoints in the model, store them as muted breakpoints.
            var breakpointLocations = this._breakpointManager.breakpointLocationsForUISourceCode(this._javaScriptSource);
            var lineNumbers = {};
            for (var i = 0; i < breakpointLocations.length; ++i) {
                var breakpoint = breakpointLocations[i].breakpoint;
                breakpointLocations[i].breakpoint.remove();
                // Re-adding decoration only.
                this._addBreakpointDecoration(breakpointLocations[i].uiLocation.lineNumber, breakpoint.condition(), breakpoint.enabled(), true);
            }
            this.clearExecutionLine();
        }

        WebInspector.SourceFrame.prototype.beforeTextChanged.call(this);
    }