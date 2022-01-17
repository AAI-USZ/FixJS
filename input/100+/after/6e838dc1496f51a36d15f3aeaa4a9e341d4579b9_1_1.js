function () {
        this._super();
        this.centerSprites(3);

        //
        // Manual animation
        //
        var animation = cc.Animation.create();
        for (var i = 1; i < 15; i++) {
            var frameName = "grossini_dance_" + ((i < 10) ? ("0" + i) : i) + ".png";
            animation.addSpriteFrameWithFilename(frameName);
        }
        animation.setDelayPerUnit(2.8 / 14);
        animation.setRestoreOriginalFrame(true);

        var action = cc.Animate.create(animation);
        this._grossini.runAction(cc.Sequence.create(action, action.reverse()));

        //
        // File animation
        //
        // With 2 loops and reverse
        var animCache = cc.AnimationCache.getInstance();

        animCache.addAnimationsWithFile("animations/animations-2.plist");
        var animation2 = animCache.getAnimationByName("dance_1");

        var action2 = cc.Animate.create(animation2);
        this._tamara.runAction(cc.Sequence.create(action2, action2.reverse()));

        //
        // File animation
        //
        // with 4 loops
        var animation3 = animation2.copy();
        animation3.setLoops(4);

        var action3 = cc.Animate.create(animation3);
        this._kathia.runAction(action3);
    }