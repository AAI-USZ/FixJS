function (bEnabled) {
        this._super(bEnabled);

        if (this._selectedImage) {
            this._selectedImage.setIsVisible(false);
        }

        if (bEnabled) {
            this._normalImage.setIsVisible(true);

            if (this._disabledImage) {
                this._disabledImage.setIsVisible(false);
            }
        }
        else {
            if (this._disabledImage) {
                this._disabledImage.setIsVisible(true);
                this._normalImage.setIsVisible(false);
            }
            else {
                this._normalImage.setIsVisible(true);
            }
        }
    }