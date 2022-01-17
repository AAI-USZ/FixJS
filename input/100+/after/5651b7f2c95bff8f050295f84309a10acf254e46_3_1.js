function () {
        var blockSize = cc.SizeMake(200, 160);
        var s = cc.Director.sharedDirector().getWinSize();

        if (this._label) {
            this._label.removeFromParentAndCleanup(true);
        }

        this._label = cc.LabelTTF.create(this.getCurrentAlignment(), blockSize, this._horizAlign, this._vertAlign, "Arial", 22);

        this._label.setAnchorPoint(cc.ccp(0, 0));
        this._label.setPosition(cc.ccp((s.width - blockSize.width) / 2, (s.height - blockSize.height) / 2));

        this.addChild(this._label);
    }