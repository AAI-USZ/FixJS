function (animationName, frameIndex) {
        cc.Assert(animationName, "");
        var a = cc.AnimationCache.sharedAnimationCache().animationByName(animationName);
        cc.Assert(a, "");
        var frame = a.getFrames()[frameIndex];
        cc.Assert(frame, "");
        this.setDisplayFrame(frame);
    }