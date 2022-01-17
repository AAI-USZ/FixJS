function () {
        var s = cc.Director.sharedDirector().getWinSize();

        var sprite1 = cc.Sprite.create(s_grossini_dance_atlas, cc.RectMake(85, 121, 85, 121));
        sprite1.setPosition(cc.ccp(s.width / 2 - 100, s.height / 2));
        this.addChild(sprite1, 0, TAG_SPRITE1);

        var sprite2 = cc.Sprite.create(s_grossini_dance_atlas, cc.RectMake(85, 121, 85, 121));
        sprite2.setPosition(cc.ccp(s.width / 2 + 100, s.height / 2));
        this.addChild(sprite2, 0, TAG_SPRITE2);

        this.schedule(this.flipSprites, 1);
    }