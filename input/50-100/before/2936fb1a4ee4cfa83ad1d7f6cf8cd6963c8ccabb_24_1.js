function () {
        this._super();
        this.setAnchorPoint(cc.ccp(0.5, 0.5));
        this._isRelativeAnchorPoint = false;
        //this.initLayer();
        var director = cc.Director.sharedDirector();
        if (!director) {
            return false;
        }
        this.setContentSize(director.getWinSize());
        this._isTouchEnabled = false;
        this._isAccelerometerEnabled = false;
    }