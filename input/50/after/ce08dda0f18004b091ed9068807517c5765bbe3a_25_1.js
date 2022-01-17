function () {
        this._super();
        this._ignoreAnchorPointForPosition = true;
        this.setAnchorPoint(cc.ccp(0.5, 0.5));

        this.setContentSize(cc.Director.sharedDirector().getWinSize());
    }