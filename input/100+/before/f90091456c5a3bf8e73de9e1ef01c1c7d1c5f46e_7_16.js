function () {
        cc.SpriteFrameCache.sharedSpriteFrameCache().addSpriteFramesWithFile(s_grossiniPlist);
        cc.SpriteFrameCache.sharedSpriteFrameCache().addSpriteFramesWithFile(s_grossini_grayPlist);
        cc.SpriteFrameCache.sharedSpriteFrameCache().addSpriteFramesWithFile(s_grossini_bluePlist);

        //
        // create animation "dance"
        //
        var animFrames = [];
        var str = "";
        for (var i = 1; i < 15; i++) {
            str = "grossini_dance_" + (i < 10 ? ("0" + i) : i) + ".png";
            var frame = cc.SpriteFrameCache.sharedSpriteFrameCache().spriteFrameByName(str);
            animFrames.push(frame);
        }

        var animation = cc.Animation.create(animFrames, 0.2);

        // Add an animation to the Cache
        cc.AnimationCache.sharedAnimationCache().addAnimation(animation, "dance");

        //
        // create animation "dance gray"
        //
        animFrames = [];

        for (i = 1; i < 15; i++) {
            str = "grossini_dance_gray_" + (i < 10 ? ("0" + i) : i) + ".png";
            var frame = cc.SpriteFrameCache.sharedSpriteFrameCache().spriteFrameByName(str);
            animFrames.push(frame);
        }

        animation = cc.Animation.create(animFrames, 0.2);

        // Add an animation to the Cache
        cc.AnimationCache.sharedAnimationCache().addAnimation(animation, "dance_gray");

        //
        // create animation "dance blue"
        //
        animFrames = [];

        for (i = 1; i < 4; i++) {
            str = "grossini_blue_0" + i + ".png";
            var frame = cc.SpriteFrameCache.sharedSpriteFrameCache().spriteFrameByName(str);
            animFrames.push(frame);
        }

        animation = cc.Animation.create(animFrames, 0.2);

        // Add an animation to the Cache
        cc.AnimationCache.sharedAnimationCache().addAnimation(animation, "dance_blue");

        var animCache = cc.AnimationCache.sharedAnimationCache();

        var normal = animCache.animationByName("dance");
        var dance_grey = animCache.animationByName("dance_gray");
        var dance_blue = animCache.animationByName("dance_blue");

        var animN = cc.Animate.create(normal);
        var animG = cc.Animate.create(dance_grey);
        var animB = cc.Animate.create(dance_blue);

        var seq = cc.Sequence.create(animN, animG, animB);

        // create an sprite without texture
        var grossini = new cc.Sprite();
        grossini.init();

        var winSize = cc.Director.sharedDirector().getWinSize();
        grossini.setPosition(cc.ccp(winSize.width / 2, winSize.height / 2));
        this.addChild(grossini);

        // run the animation
        grossini.runAction(seq);
    }