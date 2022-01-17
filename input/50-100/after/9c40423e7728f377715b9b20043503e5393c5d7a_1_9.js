function (normalSprite, selectedSprite, disabledSprite, target, selector) {
        this.initWithTarget(target, selector);
        this.setNormalImage(normalSprite);
        this.setSelectedImage(selectedSprite);
        this.setDisabledImage(disabledSprite);
        if (this._normalImage) {
            this.setContentSize(this._normalImage.getContentSize());
        }
        return true;
    }