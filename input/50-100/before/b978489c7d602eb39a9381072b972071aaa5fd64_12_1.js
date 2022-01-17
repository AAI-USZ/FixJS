function () {
        this._super();
        this._ignoreAnchorPointForPosition = true;
        var director = cc.Director.sharedDirector();
        this.setAnchorPoint(cc.ccp(0.5, 0.5));
        this.setContentSize(director.getWinSize());
    }