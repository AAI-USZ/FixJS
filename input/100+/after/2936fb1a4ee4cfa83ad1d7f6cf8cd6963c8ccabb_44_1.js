function () {
        this._super();
        this.initWithColor(cc.ccc4(127, 127, 127, 255));

        this._emitter = null;

        this.setIsTouchEnabled(true);

        var s = cc.Director.sharedDirector().getWinSize();
        var label = cc.LabelTTF.create(this.title(), "Arial", 28);
        this.addChild(label, 100, 1000);
        label.setPosition(cc.PointMake(s.width / 2, s.height - 50));

        var tapScreen = cc.LabelTTF.create("(Tap the Screen)", "Arial", 20);
        tapScreen.setPosition(cc.PointMake(s.width / 2, s.height - 80));
        this.addChild(tapScreen, 100);
        var selfPoint = this;
        var item1 = cc.MenuItemImage.create(s_pathB1, s_pathB2, this, this.backCallback);
        var item2 = cc.MenuItemImage.create(s_pathR1, s_pathR2, this, function () {
            selfPoint._emitter.resetSystem();
        });
        var item3 = cc.MenuItemImage.create(s_pathF1, s_pathF2, this, this.nextCallback);

        var freeBtnNormal = cc.Sprite.create(s_MovementMenuItem, cc.RectMake(0, 23 * 2, 123, 23));
        var freeBtnSelected = cc.Sprite.create(s_MovementMenuItem, cc.RectMake(0, 23, 123, 23));
        var freeBtnDisabled = cc.Sprite.create(s_MovementMenuItem, cc.RectMake(0, 0, 123, 23));

        var relativeBtnNormal = cc.Sprite.create(s_MovementMenuItem, cc.RectMake(123, 23 * 2, 138, 23));
        var relativeBtnSelected = cc.Sprite.create(s_MovementMenuItem, cc.RectMake(123, 23, 138, 23));
        var relativeBtnDisabled = cc.Sprite.create(s_MovementMenuItem, cc.RectMake(123, 0, 138, 23));

        var groupBtnNormal = cc.Sprite.create(s_MovementMenuItem, cc.RectMake(261, 23 * 2, 136, 23));
        var groupBtnSelected = cc.Sprite.create(s_MovementMenuItem, cc.RectMake(261, 23, 136, 23));
        var groupBtnDisabled = cc.Sprite.create(s_MovementMenuItem, cc.RectMake(261, 0, 136, 23));

        this._freeMovementButton = cc.MenuItemSprite.create(freeBtnNormal, freeBtnSelected, freeBtnDisabled, this,
            function () {
                selfPoint._emitter.setPositionType(cc.CCPARTICLE_TYPE_RELATIVE);
                selfPoint._relativeMovementButton.setVisible(true);
                selfPoint._freeMovementButton.setVisible(false);
                selfPoint._groupMovementButton.setVisible(false);
            });
        this._freeMovementButton.setPosition(new cc.Point(10, 150));
        this._freeMovementButton.setAnchorPoint(cc.PointMake(0, 0));

        this._relativeMovementButton = cc.MenuItemSprite.create(relativeBtnNormal, relativeBtnSelected, relativeBtnDisabled, this,
            function () {
                selfPoint._emitter.setPositionType(cc.CCPARTICLE_TYPE_GROUPED);
                selfPoint._relativeMovementButton.setVisible(false);
                selfPoint._freeMovementButton.setVisible(false);
                selfPoint._groupMovementButton.setVisible(true);
            });
        this._relativeMovementButton.setVisible(false);
        this._relativeMovementButton.setPosition(new cc.Point(10, 150));
        this._relativeMovementButton.setAnchorPoint(cc.PointMake(0, 0));

        this._groupMovementButton = cc.MenuItemSprite.create(groupBtnNormal, groupBtnSelected, groupBtnDisabled, this,
            function () {
                selfPoint._emitter.setPositionType(cc.CCPARTICLE_TYPE_FREE);
                selfPoint._relativeMovementButton.setVisible(false);
                selfPoint._freeMovementButton.setVisible(true);
                selfPoint._groupMovementButton.setVisible(false);
            });
        this._groupMovementButton.setVisible(false);
        this._groupMovementButton.setPosition(new cc.Point(10, 150));
        this._groupMovementButton.setAnchorPoint(cc.PointMake(0, 0));

        var spriteNormal = cc.Sprite.create(s_shapeModeMenuItem, cc.RectMake(0, 23 * 2, 115, 23));
        var spriteSelected = cc.Sprite.create(s_shapeModeMenuItem, cc.RectMake(0, 23, 115, 23));
        var spriteDisabled = cc.Sprite.create(s_shapeModeMenuItem, cc.RectMake(0, 0, 115, 23));

        this._shapeModeButton = cc.MenuItemSprite.create(spriteNormal, spriteSelected, spriteDisabled, this,
            function () {
                selfPoint._emitter.setDrawMode(cc.PARTICLE_TEXTURE_MODE);
                selfPoint._textureModeButton.setVisible(true);
                selfPoint._shapeModeButton.setVisible(false);
            });
        this._shapeModeButton.setPosition(new cc.Point(10, 100));
        this._shapeModeButton.setAnchorPoint(cc.PointMake(0, 0));

        var spriteNormal_t = cc.Sprite.create(s_textureModeMenuItem, cc.RectMake(0, 23 * 2, 115, 23));
        var spriteSelected_t = cc.Sprite.create(s_textureModeMenuItem, cc.RectMake(0, 23, 115, 23));
        var spriteDisabled_t = cc.Sprite.create(s_textureModeMenuItem, cc.RectMake(0, 0, 115, 23));

        this._textureModeButton = cc.MenuItemSprite.create(spriteNormal_t, spriteSelected_t, spriteDisabled_t, this,
            function () {
                selfPoint._emitter.setDrawMode(cc.PARTICLE_SHAPE_MODE);
                selfPoint._textureModeButton.setVisible(false);
                selfPoint._shapeModeButton.setVisible(true);
            });
        this._textureModeButton.setVisible(false);
        this._textureModeButton.setPosition(new cc.Point(10, 100));
        this._textureModeButton.setAnchorPoint(cc.PointMake(0, 0));

        var menu = cc.Menu.create(item1, item2, item3, this._shapeModeButton, this._textureModeButton,
            this._freeMovementButton, this._relativeMovementButton, this._groupMovementButton);

        menu.setPosition(cc.PointZero());
        item1.setPosition(cc.PointMake(s.width / 2 - 100, 30));
        item2.setPosition(cc.PointMake(s.width / 2, 30));
        item3.setPosition(cc.PointMake(s.width / 2 + 100, 30));

        this.addChild(menu, 100);
        //TODO
        var labelAtlas = cc.LabelTTF.create("0000", "Arial", 24);
        this.addChild(labelAtlas, 100, TAG_LABEL_ATLAS);
        labelAtlas.setPosition(cc.PointMake(s.width - 66, 50));

        // moving background
        this._background = cc.Sprite.create(s_back3);
        this.addChild(this._background, 5);
        this._background.setPosition(cc.PointMake(s.width / 2, s.height - 180));

        var move = cc.MoveBy.create(4, cc.PointMake(300, 0));
        var move_back = move.reverse();
        var seq = cc.Sequence.create(move, move_back, null);
        this._background.runAction(cc.RepeatForever.create(seq));

        this.schedule(this.step);
    }