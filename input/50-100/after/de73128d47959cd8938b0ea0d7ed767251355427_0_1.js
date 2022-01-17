function(op) {
        if (!this._dialog && !this._source)
            return;

        if (this._dialog) {
            this._dialog.close(global.get_current_time());
            this._dialog = null;
        }

        if (this._source) {
            this._notificationShowing = false;
            this._source.destroy();
            this._source = null;
        }
    }