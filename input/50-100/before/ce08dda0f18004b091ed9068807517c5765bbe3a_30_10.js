function () {
        this._super();
        if (this._disabledImage) {
            this._disabledImage.setIsVisible(false);
        }

        if (this._selectedImage) {
            this._normalImage.setIsVisible(false);
            this._selectedImage.setIsVisible(true);
        }
        else {
            this._normalImage.setIsVisible(true);
        }
    }