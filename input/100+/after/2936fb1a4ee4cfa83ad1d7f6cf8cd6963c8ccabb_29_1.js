function (bEnabled) {
        this._super(bEnabled);

        if (this._selectedImage) {
            this._selectedImage.setVisible(false);
        }

        if (bEnabled) {
            this._normalImage.setVisible(true);

            if (this._disabledImage) {
                this._disabledImage.setVisible(false);
            }
        }
        else {
            if (this._disabledImage) {
                this._disabledImage.setVisible(true);
                this._normalImage.setVisible(false);
            }
            else {
                this._normalImage.setVisible(true);
            }
        }
    }