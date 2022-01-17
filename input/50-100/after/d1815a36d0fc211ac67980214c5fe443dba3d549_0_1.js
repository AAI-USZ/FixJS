function(op) {
        if (!this._dialog)
            return;

        if (this._dialog) {
            this._dialog.close(global.get_current_time());
            this._dialog = null;
        }
    }