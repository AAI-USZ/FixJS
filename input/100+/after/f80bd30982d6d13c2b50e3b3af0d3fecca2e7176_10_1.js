function () {
        this.setTouchEnabled(true);
        var s = cc.Director.sharedDirector().getWinSize();

        var rotate = cc.RotateBy.create(10, 360);
        var action = cc.RepeatForever.create(rotate);
        for (var i = 0; i < 3; i++) {
            var sprite = cc.Sprite.create(s_pathGrossini);
            sprite.setPosition(cc.ccp(s.width / 4 * (i + 1), s.height / 2));

            var point = cc.Sprite.create(s_pathR1);
            point.setScale(0.25);
            point.setPosition(sprite.getPosition());
            this.addChild(point, 10, 100 + i);

            switch (i) {
                case 0:
                    sprite.setAnchorPoint(cc.PointZero());
                    break;
                case 1:
                    sprite.setAnchorPoint(cc.ccp(0.5, 0.5));
                    break;
                case 2:
                    sprite.setAnchorPoint(cc.ccp(1, 1));
                    break;
            }

            point.setPosition(sprite.getPosition());

            var copy = action.copy();
            sprite.runAction(copy);
            this.addChild(sprite, i);
        }
    }