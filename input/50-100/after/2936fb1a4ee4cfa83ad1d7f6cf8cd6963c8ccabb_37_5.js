function (animationName, frameIndex) {
        cc.Assert(animationName, "cc.Sprite#setDisplayFrameWithAnimationName. animationName must not be null");
        var cache = cc.AnimationCache.sharedAnimationCache().animationByName(animationName);
        cc.Assert(cache, "cc.Sprite#setDisplayFrameWithAnimationName: Frame not found");
        var animFrame = cache.getFrames()[frameIndex];
        cc.Assert(animFrame, "cc.Sprite#setDisplayFrame. Invalid frame");
        this.setDisplayFrame(animFrame.getSpriteFrame());
    }