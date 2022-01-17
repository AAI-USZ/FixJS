function(op) {
        this._closeExistingDialog();
        this._processesDialog = null;

        if (this._dialog) {
            this._dialog.close(global.get_current_time());
            this._dialog = null;
        }
    }