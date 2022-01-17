function () {
        this._super();
        this.setTouchEnabled(true);

        var s = cc.Director.sharedDirector().getWinSize();
        this.addNewSpriteWithCoords(cc.ccp(s.width / 2, s.height / 2));
    }