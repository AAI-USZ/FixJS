function (numberOfSprites) {
        var winSize = cc.Director.sharedDirector().getWinSize();

        if (numberOfSprites == 0) {
            this._tamara.setVisible(false);
            this._kathia.setVisible(false);
            this._grossini.setVisible(false);
        } else if (numberOfSprites == 1) {
            this._tamara.setVisible(false);
            this._kathia.setVisible(false);
            this._grossini.setPosition(cc.PointMake(winSize.width / 2, winSize.height / 2));
        }
        else if (numberOfSprites == 2) {
            this._kathia.setPosition(cc.PointMake(winSize.width / 3, winSize.height / 2));
            this._tamara.setPosition(cc.PointMake(2 * winSize.width / 3, winSize.height / 2));
            this._grossini.setVisible(false);
        }
        else if (numberOfSprites == 3) {
            this._grossini.setPosition(cc.PointMake(winSize.width / 2, winSize.height / 2));
            this._tamara.setPosition(cc.PointMake(winSize.width / 4, winSize.height / 2));
            this._kathia.setPosition(cc.PointMake(3 * winSize.width / 4, winSize.height / 2));
        }
    }