function () {
        this._dir = 1;

        var s = cc.Director.sharedDirector().getWinSize();

        var step = s.width / 11;
        for (var i = 0; i < 5; i++) {
            var sprite = cc.Sprite.create(s_grossini_dance_atlas, cc.RectMake(85 * 0, 121 * 1, 85, 121));
            sprite.setPosition(cc.ccp((i + 1) * step, s.height / 2));
            this.addChild(sprite, i);
        }

        for (i = 5; i < 10; i++) {
            var sprite = cc.Sprite.create(s_grossini_dance_atlas, cc.RectMake(85 * 1, 121 * 0, 85, 121));
            sprite.setPosition(cc.ccp((i + 1) * step, s.height / 2));
            this.addChild(sprite, 14 - i);
        }

        var sprite = cc.Sprite.create(s_grossini_dance_atlas, cc.RectMake(85 * 3, 121 * 0, 85, 121));
        this.addChild(sprite, -1, TAG_SPRITE1);
        sprite.setPosition(cc.ccp(s.width / 2, s.height / 2 - 20));
        sprite.setScaleX(6);
        sprite.setColor(cc.RED());

        this.schedule(this.reorderSprite, 1);
    }