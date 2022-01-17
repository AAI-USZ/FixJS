function (pZone) {
        var newFrame = new cc.AnimationFrame();
        newFrame.initWithSpriteFrame(this._spriteFrame,this._delayPerUnit,this._userInfo);
        return newFrame;
    }