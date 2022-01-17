function (touches, event) {
        if (touches.length <= 0)
            return;

        var touch = touches[0];

        var location = touch.locationInView();
        //var convertedLocation = cc.Director.sharedDirector().convertToGL(location);

        var sprite = this.getChildByTag(TAG_SPRITE);
        sprite.stopAllActions();
        sprite.runAction(cc.MoveTo.create(1, cc.PointMake(location.x, location.y)));
        var o = location.x - sprite.getPositionX();
        var a = location.y - sprite.getPositionY();
        var at = cc.RADIANS_TO_DEGREES(Math.atan(o / a));

        if (a < 0) {
            if (o < 0)
                at = 180 + Math.abs(at);
            else
                at = 180 - Math.abs(at);
        }
        at = at % 360;

        sprite.runAction(cc.RotateTo.create(1, at));
    }