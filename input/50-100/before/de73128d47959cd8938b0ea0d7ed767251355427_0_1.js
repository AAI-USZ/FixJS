function(op) {
        if (!this._dialog)
            return;

        this._dialog.close(global.get_current_time());
        this._dialog = null;
    }