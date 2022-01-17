function()
    {
        // Convert last marked range into a selection upon focus. This is needed to focus the search result.
        if (this._lastMarkedRange) {
            this.setSelection(this._lastMarkedRange);
            delete this._lastMarkedRange;
            return;
        }

        if (this._lastSelection) {
            // We do not restore selection after focus lost to avoid selection blinking. We restore only cursor position instead.
            // FIXME: consider adding selection decoration to blurred editor.
            var newSelection = WebInspector.TextRange.createFromLocation(this._lastSelection.endLine, this._lastSelection.endColumn);
            this.setSelection(newSelection);
        }
    }