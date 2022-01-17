function () {
        this._super();
        if (this._disabledImage) {
            this._disabledImage.setVisible(false);
        }

        if (this._selectedImage) {
            this._normalImage.setVisible(false);
            this._selectedImage.setVisible(true);
        }
        else {
            this._normalImage.setVisible(true);
        }
    }