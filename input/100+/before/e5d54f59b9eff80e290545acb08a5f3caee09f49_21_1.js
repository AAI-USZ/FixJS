function () {
        // add close menu
        if (!s_pathClose) {
            s_pathClose = cc.TextureCache.sharedTextureCache().textureForKey("Resources/CloseNormal.png");
        }
        var closeItem = cc.MenuItemImage.create(s_pathClose, s_pathClose, this, this.closeCallback);
        var menu = cc.Menu.create(closeItem, null);//pmenu is just a holder for the close button
        var s = cc.Director.sharedDirector().getWinSize();
        menu.setPosition(cc.PointZero());
        closeItem.setPosition(cc.PointMake(s.width - 30, s.height - 30));

        // add menu items for tests
        this._itemMenu = cc.Menu.create(null);//item menu is where all the label goes, and the one gets scrolled

        for (var i = 0, len = testNames.length; i < len; i++) {
            var label = cc.LabelTTF.create(testNames[i].title, "Arial", 24);
            var menuItem = cc.MenuItemLabel.create(label, this, this.menuCallback);
            this._itemMenu.addChild(menuItem, i + 10000);
            menuItem.setPosition(cc.PointMake(s.width / 2, (s.height - (i + 1) * LINE_SPACE)));
        }

        this._itemMenu.setContentSize(cc.SizeMake(s.width, (testNames.length + 1) * LINE_SPACE));
        this._itemMenu.setPosition(curPos);
        this.setIsTouchEnabled(true);
        this.addChild(this._itemMenu);
        this.addChild(menu, 1);
    }