function(direction, activeWorkspaceIndex) {
        this._redraw(direction, activeWorkspaceIndex);
        if (this._timeoutId != 0)
            Mainloop.source_remove(this._timeoutId);
        this._timeoutId = Mainloop.timeout_add(DISPLAY_TIMEOUT, Lang.bind(this, this._onTimeout));
        this._show();
    }