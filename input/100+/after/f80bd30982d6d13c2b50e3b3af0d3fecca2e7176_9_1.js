function () {
        // add menu items for tests
        this._itmeMenu = cc.Menu.create(null);
        var s = cc.Director.sharedDirector().getWinSize();
        for (var i = 0; i < DenshionTests.length; i++) {
            var label = cc.LabelTTF.create(DenshionTests[i].title, "Arial", 24);
            var menuItem = cc.MenuItemLabel.create(label, this, this.menuCallback);
            this._itmeMenu.addChild(menuItem, i + 10000);
            menuItem.setPosition(cc.PointMake(s.width / 2, (s.height - (i + 1) * LINE_SPACE)));
        }
        this._testCount = i;
        this._itmeMenu.setContentSize(cc.SizeMake(s.width, (this._testCount + 1) * LINE_SPACE));
        this._itmeMenu.setPosition(cc.PointZero());
        this.addChild(this._itmeMenu);

        this.setTouchEnabled(true);

        // set default volume
        cc.AudioManager.sharedEngine().setEffectsVolume(0.5);
        cc.AudioManager.sharedEngine().setBackgroundMusicVolume(0.5);
    }