function (numberOfSprites) {
        var s = cc.Director.sharedDirector().getWinSize();

        if (numberOfSprites == 1) {
            this._tamara.setVisible(false);
            this._kathia.setIsVisible(false);
            this._grossini.setPosition(cc.PointMake(s.width / 2, s.height / 2));
        }
        else if (numberOfSprites == 2) {
            this._kathia.setPosition(cc.PointMake(s.width / 3, s.height / 2));
            this._tamara.setPosition(cc.PointMake(2 * s.width / 3, s.height / 2));
            this._grossini.setVisible(false);
        }
        else if (numberOfSprites == 3) {
            this._grossini.setPosition(cc.PointMake(s.width / 2, s.height / 2));
            this._tamara.setPosition(cc.PointMake(s.width / 4, s.height / 2));
            this._kathia.setPosition(cc.PointMake(3 * s.width / 4, s.height / 2));
        }
    }