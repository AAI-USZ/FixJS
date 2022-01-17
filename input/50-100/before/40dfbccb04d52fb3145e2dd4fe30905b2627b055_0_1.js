function (texture) {
        this._sprite = cc.Sprite.spriteWithTexture(texture);

        this._percentage = 0.0;
        this._vertexData = null;
        this._vertexDataCount = 0;
        this.setAnchorPoint(cc.ccp(0.5, 0.5));
        this.setContentSize(this._sprite.getContentSize());
        this._type = cc.CCPROGRESS_TIMER_RADIAL_CCW;

        return true;
    }