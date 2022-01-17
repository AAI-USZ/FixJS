function() {
        if (!this._existingDialog)
            return;

        this._existingDialog.close();
        this._existingDialog = null;
    }