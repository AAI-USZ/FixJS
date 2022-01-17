function(op) {
        this._closeExistingDialog();
        this._processesDialog = null;

        if (this._dialog) {
            this._dialog.close();
            this._dialog = null;
        }
    }