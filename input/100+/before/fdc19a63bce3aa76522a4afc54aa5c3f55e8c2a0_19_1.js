function () {
        this._super();
        this.setIsTouchEnabled(true);

        var s = cc.Director.sharedDirector().getWinSize();
        var layer = cc.LayerColor.create(cc.ccc4(255, 0, 0, 128), 200, 200);

        layer.setIsRelativeAnchorPoint(true);
        layer.setPosition(cc.PointMake(s.width / 2, s.height / 2));
        this.addChild(layer, 1, cc.TAG_LAYER);
    }