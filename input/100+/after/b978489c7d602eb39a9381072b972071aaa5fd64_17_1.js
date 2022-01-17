function (bEnabled) {
        if (this._isEnabled == bEnabled) {
            this._super(bEnabled);
            this._updateImagesVisibility();
        }
    }