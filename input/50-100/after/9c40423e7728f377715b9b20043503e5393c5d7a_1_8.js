function (disabledImage) {
        if (this._disabledImage == disabledImage)
            return;

        if (disabledImage) {
            this.addChild(disabledImage, 0, cc.DISABLE_TAG);
            disabledImage.setAnchorPoint(cc.ccp(0, 0));
        }

        if (this._disabledImage) {
            this.removeChild(this._disabledImage, true);
        }

        this._disabledImage = disabledImage;
        this._updateImagesVisibility();
    }