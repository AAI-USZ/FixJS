function () {
        this._super();
        this.setIsTouchEnabled(true);

        var s = cc.Director.sharedDirector().getWinSize();
        this.addNewSpriteWithCoords(cc.ccp(s.width / 2, s.height / 2));
    }