function (touch, event) {
        var s = cc.Director.sharedDirector().getWinSize();
        var start = touch.locationInView();

        var diff = cc.ccpSub(cc.ccp(s.width / 2, s.height / 2), start);
        diff = cc.ccpNormalize(diff);

        var gradient = this.getChildByTag(1);
        gradient.setVector(diff);
    }