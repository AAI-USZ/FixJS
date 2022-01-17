function () {
        this._super();

        var s = cc.Director.sharedDirector().getWinSize();
        var layer1 = cc.LayerColor.create(cc.ccc4(255, 255, 0, 80), 100, 300);
        layer1.setPosition(cc.PointMake(s.width / 3, s.height / 2));
        layer1.setIsRelativeAnchorPoint(true);
        this.addChild(layer1, 1);

        var layer2 = cc.LayerColor.create(cc.ccc4(0, 0, 255, 255), 100, 300);
        layer2.setPosition(cc.PointMake((s.width / 3) * 2, s.height / 2));
        layer2.setIsRelativeAnchorPoint(true);
        this.addChild(layer2, 1);

        var actionTint = cc.TintBy.create(2, -255, -127, 0);
        var actionTintBack = actionTint.reverse();
        var seq1 = cc.Sequence.create(actionTint, actionTintBack, null);
        layer1.runAction(seq1);

        var actionFade = cc.FadeOut.create(2.0);
        var actionFadeBack = actionFade.reverse();
        var seq2 = cc.Sequence.create(actionFade, actionFadeBack, null);
        layer2.runAction(seq2);
    }