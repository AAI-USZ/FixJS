function () {
        this._super();

        this._normalImage.setIsVisible(true);

        if (this._selectedImage) {
            this._selectedImage.setIsVisible(false);
        }

        if (this._disabledImage) {
            this._disabledImage.setIsVisible(false);
        }
    }