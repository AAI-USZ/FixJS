function () {
        cc.MenuItemFont.setFontSize(30);
        cc.MenuItemFont.setFontName("Courier New");
        this.setTouchEnabled(true);
        // Font Item

        var spriteNormal = cc.Sprite.create(s_menuItem, cc.RectMake(0, 23 * 2, 115, 23));
        var spriteSelected = cc.Sprite.create(s_menuItem, cc.RectMake(0, 23, 115, 23));
        var spriteDisabled = cc.Sprite.create(s_menuItem, cc.RectMake(0, 0, 115, 23));

        var item1 = cc.MenuItemSprite.create(spriteNormal, spriteSelected, spriteDisabled, this, this.menuCallback);

        // Image Item
        var item2 = cc.MenuItemImage.create(s_sendScore, s_pressSendScore, this, this.menuCallback2);

        // Label Item (LabelAtlas)
        var labelAtlas = cc.LabelAtlas.create("0123456789", s_fpsImages, 16, 24, '.');
        var item3 = cc.MenuItemLabel.create(labelAtlas, this, this.menuCallbackDisabled);
        item3.setDisabledColor(cc.ccc3(32, 32, 64));
        item3.setColor(cc.ccc3(200, 200, 255));

        // Font Item
        var item4 = cc.MenuItemFont.create("I toggle enable items", this, this.menuCallbackEnabled);

        item4.setFontSizeObj(20);
        cc.MenuItemFont.setFontName("Marker Felt");

        // Label Item (CCLabelBMFont)
        var label = cc.LabelBMFont.create("configuration", s_bitmapFontTest3_fnt);
        var item5 = cc.MenuItemLabel.create(label, this, this.menuCallbackConfig);

        // Testing issue #500
        item5.setScale(0.8);

        // Font Item
        var item6 = cc.MenuItemFont.create("Quit", this, this.onQuit);

        var color_action = cc.TintBy.create(0.5, 0, -255, -255);
        var color_back = color_action.reverse();
        var seq = cc.Sequence.create(color_action, color_back, null);
        item6.runAction(cc.RepeatForever.create(seq));

        var menu = cc.Menu.create(item1, item2, item3, item4, item5, item6, null);
        menu.alignItemsVertically();

        // elastic effect
        var s = cc.Director.sharedDirector().getWinSize();

        var child;
        var array = menu.getChildren();
        for (var i = 0; i < array.length; i++) {
            if (array[i] == null)
                break;

            child = array[i];

            var dstPoint = child.getPosition();
            var offset = (s.width / 2 + 50);
            if (i % 2 == 0)
                offset = -offset;

            child.setPosition(cc.PointMake(dstPoint.x + offset, dstPoint.y));
            child.runAction(
                cc.EaseElasticOut.create(cc.MoveBy.create(2, cc.PointMake(dstPoint.x - offset, 0)), 0.35)
            );
        }
        this._disabledItem = item3;
        this._disabledItem.setEnabled(false);

        this.addChild(menu);
    }