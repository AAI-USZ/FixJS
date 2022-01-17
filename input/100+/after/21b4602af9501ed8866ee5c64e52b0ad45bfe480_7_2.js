function () {
        cc.MenuItemFont.setFontName("Marker Felt");
        cc.MenuItemFont.setFontSize(28);

        var label = cc.LabelBMFont.create("Enable AtlasItem", "Resources/fonts/bitmapFontTest3.fnt");
        var item1 = cc.MenuItemLabel.create(label, this, this.menuCallback2);
        var item2 = cc.MenuItemFont.create("--- Go Back ---", this, this.menuCallback);

        var spriteNormal = cc.Sprite.create(s_menuItem, cc.RectMake(0, 23 * 2, 115, 23));
        var spriteSelected = cc.Sprite.create(s_menuItem, cc.RectMake(0, 23, 115, 23));
        var spriteDisabled = cc.Sprite.create(s_menuItem, cc.RectMake(0, 0, 115, 23));


        var item3 = cc.MenuItemSprite.create(spriteNormal, spriteSelected, spriteDisabled, this, this.menuCallback3);
        this._disabledItem = item3;
        this._disabledItem.setEnabled(false);

        var menu = cc.Menu.create(item1, item2, item3);
        menu.setPosition(cc.PointMake(0, 0));

        var s = cc.Director.sharedDirector().getWinSize();

        item1.setPosition(cc.PointMake(s.width / 2 - 150, s.height / 2));
        item2.setPosition(cc.PointMake(s.width / 2 - 200, s.height / 2));
        item3.setPosition(cc.PointMake(s.width / 2, s.height / 2 - 100));

        var jump = cc.JumpBy.create(3, cc.PointMake(400, 0), 50, 4);
        item2.runAction(cc.RepeatForever.create(
            (cc.Sequence.create(jump, jump.reverse()))
        )
        );
        var spin1 = cc.RotateBy.create(3, 360);
        var spin2 = spin1.copy();
        var spin3 = spin1.copy();

        item1.runAction(cc.RepeatForever.create(spin1));
        item2.runAction(cc.RepeatForever.create(spin2));
        item3.runAction(cc.RepeatForever.create(spin3));

        this.addChild(menu);
    }