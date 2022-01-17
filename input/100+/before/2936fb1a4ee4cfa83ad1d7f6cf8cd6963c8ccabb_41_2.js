function (numberOfSprites) {
        var s = cc.Director.sharedDirector().getWinSize();

        if (numberOfSprites == 1) {
            this._tamara.setIsVisible(false);
            this._kathia.setIsVisible(false);
            this._grossini.setPosition(cc.PointMake(60, s.height / 2));
        }
        else if (numberOfSprites == 2) {
            this._kathia.setPosition(cc.PointMake(60, s.height / 3));
            this._tamara.setPosition(cc.PointMake(60, 2 * s.height / 3));
            this._grossini.setIsVisible(false);
        }
        else if (numberOfSprites == 3) {
            this._grossini.setPosition(cc.PointMake(60, s.height / 2));
            this._tamara.setPosition(cc.PointMake(60, 2 * s.height / 3));
            this._kathia.setPosition(cc.PointMake(60, s.height / 3));
        }
    }