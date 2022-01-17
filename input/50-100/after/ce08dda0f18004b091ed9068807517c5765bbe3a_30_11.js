function () {
        this._super();

        if (this._normalImage) {
            this._normalImage.setVisible(true);

            if (this._selectedImage) {
                this._selectedImage.setVisible(false);
            }

            if (this._disabledImage) {
                this._disabledImage.setVisible(false);
            }
        }
    }