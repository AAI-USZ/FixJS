function () {
        this._isRelativeAnchorPoint = false;
        var director = cc.Director.sharedDirector();
        this.setAnchorPoint(cc.ccp(0.5, 0.5));
        this.setContentSize(director.getWinSize());
    }