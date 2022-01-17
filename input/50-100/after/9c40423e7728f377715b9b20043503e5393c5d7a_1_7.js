function (normalImage) {
        if (this._normalImage == normalImage) {
            return;
        }
        if (normalImage) {
            this.addChild(normalImage, 0, cc.NORMAL_TAG);
            normalImage.setAnchorPoint(cc.ccp(0, 0));
        }
        if (this._normalImage) {
            this.removeChild(this._normalImage, true);
        }

        this._normalImage = normalImage;
        this.setContentSize(this._normalImage.getContentSize());
        this._updateImagesVisibility();
    }