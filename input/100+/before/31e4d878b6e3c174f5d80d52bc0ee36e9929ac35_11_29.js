function () {
        var s = cc.Director.sharedDirector().getWinSize();

        // TEST: If no texture is given, then Opacity + Color should work.
        var sprite = new cc.Sprite();
        sprite.init();
        sprite.setTextureRect(cc.RectMake(0, 0, 300, 300));
        sprite.setColor(cc.RED());
        sprite.setOpacity(128);
        sprite.setPosition(cc.ccp(3 * s.width / 4, s.height / 2));
        this.addChild(sprite, 100);

        sprite = new cc.Sprite();
        sprite.init();
        sprite.setTextureRect(cc.RectMake(0, 0, 300, 300));
        sprite.setColor(cc.BLUE());
        sprite.setOpacity(128);
        sprite.setPosition(cc.ccp(1 * s.width / 4, s.height / 2));
        this.addChild(sprite, 100);
    }