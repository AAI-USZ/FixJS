function (animations) {
        var frameCache = cc.SpriteFrameCache.getInstance();

        for (var key in animations) {
            var animationDict = animations[key];
            var frameNames = animationDict["frames"];
            var delay = parseFloat(animationDict["delay"]) || 0;
            var animation = null;
            if (!frameNames) {
                cc.Log("cocos2d: cc.AnimationCache: Animation '" + key + "' found in dictionary without any frames - cannot add to animation cache.");
                continue;
            }

            var frames = [];
            for (var i = 0; i < frameNames.length; i++) {
                var spriteFrame = frameCache.spriteFrameByName(frameNames[i]);
                if (!spriteFrame) {
                    cc.Log("cocos2d: cc.AnimationCache: Animation '" + key + "' refers to frame '" + frameNames[i]
                        + "' which is not currently in the cc.SpriteFrameCache. This frame will not be added to the animation.");
                    continue;
                }
                var animFrame = new cc.AnimationFrame();
                animFrame.initWithSpriteFrame(spriteFrame, 1, null);
                frames.push(animFrame);
            }

            if (frames.length == 0) {
                cc.Log("cocos2d: cc.AnimationCache: None of the frames for animation '" + key
                    + "' were found in the cc.SpriteFrameCache. Animation is not being added to the Animation Cache.");
                continue;
            } else if (frames.length != frameNames.length) {
                cc.Log("cocos2d: cc.AnimationCache: An animation in your dictionary refers to a frame which is not in the cc.SpriteFrameCache." +
                    " Some or all of the frames for the animation '" + key + "' may be missing.");
            }
            animation = cc.Animation.createWithAnimationFrames(frames, delay, 1);
            cc.AnimationCache.getInstance().addAnimation(animation,key);
        }
    }