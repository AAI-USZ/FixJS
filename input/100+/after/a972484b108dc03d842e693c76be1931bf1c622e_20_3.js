function (animations) {
        var frameCache = cc.SpriteFrameCache.getInstance();

        for (var key in animations) {
            var animationDict = animations[key];
            var loops = parseInt(animationDict["loops"])||0;
            var restoreOriginalFrame = (animationDict["restoreOriginalFrame"] && animationDict["restoreOriginalFrame"] == true) ? true : false;
            var frameArray = animationDict["frames"];

            if (!frameArray) {
                cc.log("cocos2d: CCAnimationCache: Animation '" + key + "' found in dictionary without any frames - cannot add to animation cache.");
                continue;
            }

            //Array of AnimationFrames
            var arr = [];
            for(var i = 0; i<frameArray.length; i++){
                var entry = frameArray[i];
                var spriteFrameName = entry["spriteframe"];
                var spriteFrame = frameCache.spriteFrameByName(spriteFrameName);
                if(!spriteFrame){
                    cc.log("cocos2d: cc.AnimationCache: Animation '" + key + "' refers to frame '" + spriteFrameName
                        + "' which is not currently in the cc.SpriteFrameCache. This frame will not be added to the animation.");
                    continue;
                }

                var delayUnits = parseFloat(entry["delayUnits"])||0;
                var userInfo = entry["notification"];
                var animFrame = new cc.AnimationFrame();
                animFrame.initWithSpriteFrame(spriteFrame,delayUnits,userInfo);
                arr.push(animFrame);
            }

            var delayPerUnit = parseFloat(animationDict["delayPerUnit"]) ||0;
            var animation = new cc.Animation();
            animation.initWithAnimationFrames(arr,delayPerUnit,loops);
            animation.setRestoreOriginalFrame(restoreOriginalFrame);
            cc.AnimationCache.getInstance().addAnimation(animation,key);
        }
    }