function () {
        var frameCache = cc.SpriteFrameCache.sharedSpriteFrameCache();
        frameCache.addSpriteFramesWithFile(s_grossiniPlist);
        frameCache.addSpriteFramesWithFile(s_grossini_grayPlist);
        frameCache.addSpriteFramesWithFile(s_grossini_bluePlist);

        //
        // create animation "dance"
        //
        var animFrames = [];
        var frame;
        var str = "";
        for (var i = 1; i < 15; i++) {
            str = "grossini_dance_" + (i < 10 ? ("0" + i) : i) + ".png";
            frame = frameCache.spriteFrameByName(str);
            animFrames.push(frame);
        }

        var animation = cc.Animation.createWithSpriteFrames(animFrames, 0.2);

        // Add an animation to the Cache
        cc.AnimationCache.sharedAnimationCache().addAnimation(animation, "dance");

        //
        // create animation "dance gray"
        //
        animFrames = [];
        for (i = 1; i < 15; i++) {
            str = "grossini_dance_gray_" + (i < 10 ? ("0" + i) : i) + ".png";
            frame = frameCache.spriteFrameByName(str);
            animFrames.push(frame);
        }

        animation = cc.Animation.createWithSpriteFrames(animFrames, 0.2);

        // Add an animation to the Cache
        cc.AnimationCache.sharedAnimationCache().addAnimation(animation, "dance_gray");

        //
        // create animation "dance blue"
        //
        animFrames = [];
        for (i = 1; i < 4; i++) {
            str = "grossini_blue_0" + i + ".png";
            frame = frameCache.spriteFrameByName(str);
            animFrames.push(frame);
        }

        animation = cc.Animation.createWithSpriteFrames(animFrames, 0.2);

        // Add an animation to the Cache
        cc.AnimationCache.sharedAnimationCache().addAnimation(animation, "dance_blue");

        var animCache = cc.AnimationCache.sharedAnimationCache();

        var normal = animCache.animationByName("dance");
        normal.setRestoreOriginalFrame(true);
        var dance_grey = animCache.animationByName("dance_gray");
        dance_grey.setRestoreOriginalFrame(true);
        var dance_blue = animCache.animationByName("dance_blue");
        dance_blue.setRestoreOriginalFrame(true);

        var animN = cc.Animate.create(normal);
        var animG = cc.Animate.create(dance_grey);
        var animB = cc.Animate.create(dance_blue);

        var seq = cc.Sequence.create(animN, animG, animB);

        // create an sprite without texture
        var grossini = new cc.Sprite();
        frame = frameCache.spriteFrameByName("grossini_dance_01.png");
        grossini.setDisplayFrame(frame);

        var winSize = cc.Director.sharedDirector().getWinSize();
        grossini.setPosition(cc.ccp(winSize.width / 2, winSize.height / 2));
        this.addChild(grossini);

        // run the animation
        grossini.runAction(seq);
    }