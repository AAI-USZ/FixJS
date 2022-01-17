function() {
        if (!this._existingDialog)
            return;

        this._existingDialog.close(global.get_current_time());
        this._existingDialog = null;
    }