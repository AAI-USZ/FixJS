function () {
        this._super();

        this._normalImage.setVisible(true);

        if (this._selectedImage) {
            this._selectedImage.setVisible(false);
        }

        if (this._disabledImage) {
            this._disabledImage.setVisible(false);
        }
    }