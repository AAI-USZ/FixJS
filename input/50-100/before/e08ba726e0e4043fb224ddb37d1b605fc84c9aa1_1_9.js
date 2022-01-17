function (normalSprite, selectedSprite, disabledSprite, target, selector) {
        cc.Assert(normalSprite != null, "");
        this.initWithTarget(target, selector);
        this.setNormalImage(normalSprite);
        this.setSelectedImage(selectedSprite);
        this.setDisabledImage(disabledSprite);

        this.setContentSize(this._normalImage.getContentSize());
        return true;
    }