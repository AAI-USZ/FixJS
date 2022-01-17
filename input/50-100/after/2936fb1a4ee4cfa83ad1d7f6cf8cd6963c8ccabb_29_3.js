function (DisabledImage) {
        if (DisabledImage) {
            this.addChild(DisabledImage, 0, cc.DISABLE_TAG);
            DisabledImage.setAnchorPoint(cc.ccp(0, 0));
            DisabledImage.setVisible(false);
        }

        if (this._disabledImage) {
            this.removeChild(this._disabledImage, true);
        }

        this._disabledImage = DisabledImage;
    }