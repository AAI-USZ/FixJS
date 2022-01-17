function(direction, activeWorkspaceIndex) {
        this._direction = direction;
        this._activeWorkspaceIndex = activeWorkspaceIndex;

        this._redisplay();
        if (this._timeoutId != 0)
            Mainloop.source_remove(this._timeoutId);
        this._timeoutId = Mainloop.timeout_add(DISPLAY_TIMEOUT, Lang.bind(this, this._onTimeout));
        this._show();
    }