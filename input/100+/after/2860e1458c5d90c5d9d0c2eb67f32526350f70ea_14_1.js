function (touch) {
        var touchLocation = touch.locationInView();
        touchLocation = cc.Director.sharedDirector().convertToGL(touchLocation);

        var s = cc.Director.sharedDirector().getWinSize();

        var newSize = cc.SizeMake(Math.abs(touchLocation.x - s.width / 2) * 2, Math.abs(touchLocation.y - s.height / 2) * 2);

        var l = this.getChildByTag(cc.TAG_LAYER);

        l.setContentSize(newSize);
    }