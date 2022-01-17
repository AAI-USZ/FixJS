function (NormalImage) {
        if (NormalImage) {
            this.addChild(NormalImage, 0, cc.NORMAL_TAG);
            NormalImage.setAnchorPoint(cc.ccp(0, 0));
            NormalImage.setIsVisible(true);
        }
        if (this._normalImage) {
            this.removeChild(this._normalImage, true);
        }

        this._normalImage = NormalImage;
    }